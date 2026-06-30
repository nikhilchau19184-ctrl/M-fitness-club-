import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, MoreHorizontal, MessageCircle, Mail, Scale, X, Save, ArrowUpRight, Snowflake, UserPlus, RefreshCw, Smartphone, ChevronRight, ChevronLeft, Upload, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getMembers, addMember, updateMember } from '../lib/db';
import { secondaryAuth } from '../lib/firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import * as XLSX from 'xlsx';

export function Members({ isSuperAdmin }: { isSuperAdmin?: boolean }) {
  const [members, setMembers] = useState<any[]>([]);
  const [showAssessment, setShowAssessment] = useState<string | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [showAddMember, setShowAddMember] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [showNotification, setShowNotification] = useState<{name: string, phone: string, username: string} | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (members.length === 0) {
      alert("No members to export.");
      return;
    }
    
    // We export a subset of fields, including the generated username (password is not stored for security, 
    // but in a real system we might have sent them SMS during creation. Here we'll just export what we have)
    const exportData = members.map(m => ({
      'Member ID': m.memberId,
      'Full Name': m.fullName || m.name,
      'Email': m.email,
      'Phone': m.phone,
      'Username': m.username,
      'Password': m._tempPassword || 'Unknown (Check SMS or Reset)',
      'Status': m.status,
      'Plan': m.plan,
      'Total Fee': m.fee,
      'Amount Paid': m.amountPaid
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Members');
    XLSX.writeFile(workbook, 'members_credentials.xlsx');
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data: any[] = XLSX.utils.sheet_to_json(ws);
      
      let successCount = 0;
      
      for (const row of data) {
        try {
          const name = row['Name'] || row['Full Name'] || 'Unknown';
          const email = row['Email'] || '';
          const phone = row['Phone'] || row['Mobile'] || '';
          
          const baseUsername = name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
          const username = `${baseUsername}${Math.floor(100 + Math.random() * 900)}`;
          const password = `${baseUsername}@${Math.floor(1000 + Math.random() * 9000)}`;

          let userId = null;
          try {
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, `${username}@mfitness.club`, password);
            userId = userCredential.user.uid;
            await signOut(secondaryAuth);
          } catch (error: any) {
            console.error("Auth error for " + name, error);
            continue; // Skip if auth creation fails
          }
          
          const newMember = {
            userId,
            memberId: `MF-${Math.floor(1000 + Math.random() * 9000)}`,
            name,
            email,
            phone,
            whatsapp: phone,
            gender: row['Gender'] || 'Not Specified',
            dateOfBirth: row['DOB'] || '',
            address: row['Address'] || '',
            emergencyContact: '',
            emergencyPhone: '',
            weight: row['Weight'] || '70',
            height: row['Height'] || '170',
            fitnessGoal: row['Goal'] || 'Fitness',
            medicalConditions: '',
            username,
            plan: row['Plan'] || 'Standard',
            fee: Number(row['Fee'] || 0),
            amountPaid: Number(row['Paid'] || 0),
            status: row['Status'] || 'Active',
            avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=f4f4f5&color=18181b`,
            bmi: (Number(row['Weight'] || 70) / Math.pow(Number(row['Height'] || 170) / 100, 2)).toFixed(1),
            // We store the generated password temporarily so we can export it later if needed, 
            // though normally we shouldn't store plain text passwords. 
            // The prompt requested credentials to be extracted, so we save it.
            _tempPassword: password 
          };

          await addMember(newMember);
          successCount++;
        } catch (err) {
          console.error("Failed to import row", row, err);
        }
      }
      
      alert(`Successfully imported ${successCount} members. System SMS simulated for all imported credentials.`);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      loadMembers();
    };
    reader.readAsBinaryString(file);
  };

  const selectedMember = members.find(m => m.id === showAssessment);

  const handleAddMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStep < 3) {
      setFormStep(formStep + 1);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    
    let userId = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, `${username}@mfitness.club`, password);
      userId = userCredential.user.uid;
      await signOut(secondaryAuth);
    } catch (error: any) {
      alert("Failed to create member credentials: " + error.message);
      return;
    }
    
    const newMember = {
      userId,
      memberId: `MF-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone,
      whatsapp: formData.get('whatsapp') as string,
      gender: formData.get('gender') as string,
      dateOfBirth: formData.get('dob') as string,
      address: formData.get('address') as string,
      emergencyContact: formData.get('emergencyName') as string,
      emergencyPhone: formData.get('emergencyPhone') as string,
      weight: formData.get('weight') as string,
      height: formData.get('height') as string,
      fitnessGoal: formData.get('goal') as string,
      medicalConditions: formData.get('medical') as string,
      username,
      plan: formData.get('plan') as string,
      fee: Number(formData.get('fee')),
      amountPaid: Number(formData.get('amountPaid')),
      status: formData.get('status') as string || 'Active',
      avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=f4f4f5&color=18181b`,
      bmi: (Number(formData.get('weight')) / Math.pow(Number(formData.get('height')) / 100, 2)).toFixed(1)
    };

    try {
      await addMember(newMember);
      await loadMembers();
      
      setShowAddMember(false);
      setFormStep(1);
      
      // Simulate SMS notification
      setShowNotification({ name, phone, username });
      setTimeout(() => setShowNotification(null), 8000);
    } catch (err) {
      console.error("Error saving member:", err);
      alert("Failed to add member.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-5 h-full relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Members</h1>
          <p className="text-sm text-zinc-400">Manage club members, physical assessments, and communications.</p>
        </div>
        <button onClick={() => setShowAddMember(true)} className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>
      
      <div className="bg-[#141414] rounded-3xl border border-[#1f1f1f] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input type="text" placeholder="Search members..." className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg pl-9 pr-4 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-red-500 text-white" />
          </div>
          <div className="flex gap-2">
            <input 
              type="file" 
              accept=".xlsx, .xls" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImport}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 border border-[#2a2a2a] bg-[#1a1a1a] text-zinc-300 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#2a2a2a] flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> Import Excel
            </button>
            <button 
              onClick={handleExport}
              className="px-4 py-2 border border-[#2a2a2a] bg-[#1a1a1a] text-zinc-300 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#2a2a2a] flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export Credentials
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-[#2a2a2a] text-xs font-bold text-zinc-500 uppercase tracking-wider">
                <th className="pb-3 px-2">Member</th>
                <th className="pb-3 px-2">Contact</th>
                <th className="pb-3 px-2">Plan</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2">Physical Details</th>
                <th className="pb-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id} className="border-b border-[#1f1f1f] last:border-0 hover:bg-[#1a1a1a] transition-colors group">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full border border-[#2a2a2a]" />
                      <div>
                        <p className="text-sm font-bold text-white">{member.name}</p>
                        <p className="text-[10px] text-zinc-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-zinc-400">{member.phone}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 text-green-500 hover:bg-green-500/10 rounded" title="WhatsApp Message">
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 text-blue-500 hover:bg-blue-500/10 rounded" title="Send Email">
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        member.plan === 'Platinum' ? 'bg-zinc-800 text-zinc-200' : 
                        member.plan === 'Gold' ? 'bg-yellow-500/10 text-yellow-500' : 
                        'bg-zinc-800 text-zinc-400'
                      }`}>
                      {member.plan}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      member.status === 'Active' ? 'bg-green-500/10 text-green-500' : 
                      member.status === 'Enquiry' ? 'bg-yellow-500/10 text-yellow-500' :
                      member.status === 'Booked' ? 'bg-blue-500/10 text-blue-500' :
                      member.status === 'Membership Converted' ? 'bg-purple-500/10 text-purple-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-zinc-400">BMI: <span className="font-bold text-white">{member.bmi}</span></span>
                      <button 
                        onClick={() => setShowAssessment(member.id)}
                        className="text-[10px] text-red-500 hover:text-red-400 font-bold uppercase tracking-wider self-start flex items-center gap-1 mt-1"
                      >
                        <Scale className="w-3 h-3" /> Update Log
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right relative">
                    <button 
                      onClick={() => setShowActionMenu(showActionMenu === member.id ? null : member.id)}
                      className="text-zinc-500 hover:text-white p-1 transition-colors"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                    {showActionMenu === member.id && (
                      <div className="absolute right-6 top-10 w-48 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-xl z-10 overflow-hidden py-1">
                        <button className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-[#252525] flex items-center gap-2">
                          <ArrowUpRight className="w-3.5 h-3.5" /> Upgrade Plan
                        </button>
                        <button className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-[#252525] flex items-center gap-2">
                          <RefreshCw className="w-3.5 h-3.5" /> Extend Membership
                        </button>
                        <button className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-[#252525] flex items-center gap-2">
                          <UserPlus className="w-3.5 h-3.5" /> Transfer Membership
                        </button>
                        <button className="w-full text-left px-3 py-2 text-xs text-blue-400 hover:text-blue-300 hover:bg-[#252525] flex items-center gap-2 border-t border-[#2a2a2a] mt-1 pt-2">
                          <Snowflake className="w-3.5 h-3.5" /> Freeze Account
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAssessment && selectedMember && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl w-full max-w-md p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowAssessment(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-2">Physical Assessment Log</h3>
            <p className="text-sm text-zinc-400 mb-6 flex items-center gap-2">
              <img src={selectedMember.avatar} alt="Avatar" className="w-6 h-6 rounded-full" />
              {selectedMember.name}
            </p>
            
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); setShowAssessment(null); }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Weight (kg)</label>
                  <input 
                    type="number" 
                    defaultValue={selectedMember.weight}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Height (cm)</label>
                  <input 
                    type="number" 
                    defaultValue={selectedMember.height}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Calculated BMI</label>
                <input 
                  type="text" 
                  defaultValue={selectedMember.bmi}
                  disabled
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] opacity-50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none" 
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowAssessment(null)}
                  className="flex-1 bg-zinc-800 text-zinc-300 hover:text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-red-600 text-white hover:bg-red-700 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      <AnimatePresence>
        {showAddMember && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto py-10"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#141414] border border-[#1f1f1f] rounded-3xl w-full max-w-2xl p-6 md:p-8 relative shadow-2xl my-auto"
            >
              <button 
                onClick={() => { setShowAddMember(false); setFormStep(1); }}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="mb-8">
                <h3 className="text-2xl font-black text-white mb-2">Member Registration</h3>
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map(step => (
                    <React.Fragment key={step}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${formStep >= step ? 'bg-red-600 text-white' : 'bg-[#1a1a1a] border border-[#2a2a2a] text-zinc-500'}`}>
                        {step}
                      </div>
                      {step < 3 && <div className={`flex-1 h-px ${formStep > step ? 'bg-red-600' : 'bg-[#2a2a2a]'}`} />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              <form onSubmit={handleAddMember} className="space-y-6">
                {formStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <h4 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Full Name</label>
                        <input type="text" name="name" required placeholder="John Doe" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                        <input type="tel" name="phone" required placeholder="+91 90000 00000" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">WhatsApp Number</label>
                        <input type="tel" name="whatsapp" placeholder="+91 90000 00000" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Email Address</label>
                        <input type="email" name="email" required placeholder="john@example.com" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Gender</label>
                        <select name="gender" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 appearance-none">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Date of Birth</label>
                        <input type="date" name="dob" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Full Address</label>
                        <input type="text" name="address" placeholder="123 Fitness St, City" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Emergency Contact</label>
                        <input type="text" name="emergencyName" placeholder="Jane Doe" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Emergency Phone</label>
                        <input type="tel" name="emergencyPhone" placeholder="+91 80000 00000" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {formStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <h4 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4">Physical & Medical Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Height (cm)</label>
                        <input type="number" name="height" required placeholder="175" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Weight (kg)</label>
                        <input type="number" name="weight" required placeholder="70" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Fitness Goal</label>
                        <select name="goal" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 appearance-none">
                          <option value="Weight Loss">Weight Loss</option>
                          <option value="Muscle Gain">Muscle Gain</option>
                          <option value="Endurance">Endurance</option>
                          <option value="Flexibility">Flexibility</option>
                          <option value="General Fitness">General Fitness</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Medical Conditions</label>
                        <input type="text" name="medical" placeholder="None" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Allergies / Injuries</label>
                        <input type="text" name="injuries" placeholder="None" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {formStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <h4 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4">Membership & Credentials</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Membership Plan</label>
                        <select name="plan" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 appearance-none">
                          <option value="Platinum">Platinum (12 Months) - ₹15,000</option>
                          <option value="Gold">Gold (6 Months) - ₹8,000</option>
                          <option value="Silver">Silver (3 Months) - ₹5,000</option>
                          <option value="Bronze">Bronze (1 Month) - ₹2,000</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Registration Status</label>
                        <select name="status" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 appearance-none">
                          <option value="Active">Active Member</option>
                          <option value="Enquiry">Enquiry / Pending</option>
                          <option value="Booked">Booked (Starting Later)</option>
                          <option value="Membership Converted">Membership Converted</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Total Fee (₹)</label>
                        <input type="number" name="fee" required placeholder="0" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Amount Paid (₹)</label>
                        <input type="number" name="amountPaid" required placeholder="0" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                      <div className="col-span-2 h-px bg-[#1f1f1f] my-2" />
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Assign Username</label>
                        <input type="text" name="username" required placeholder="john.doe" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Assign Password</label>
                        <input type="text" name="password" required placeholder="••••••••" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500" />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="pt-6 flex gap-3">
                  {formStep > 1 ? (
                    <button type="button" onClick={() => setFormStep(formStep - 1)} className="flex-1 bg-zinc-800 text-zinc-300 hover:text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex justify-center items-center gap-2">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                  ) : (
                    <button type="button" onClick={() => setShowAddMember(false)} className="flex-1 bg-zinc-800 text-zinc-300 hover:text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">
                      Cancel
                    </button>
                  )}
                  
                  <button type="submit" className="flex-1 bg-red-600 text-white hover:bg-red-700 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2">
                    {formStep < 3 ? (
                      <>Next <ChevronRight className="w-4 h-4" /></>
                    ) : (
                      <><UserPlus className="w-4 h-4" /> Complete Registration</>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SMS Notification Simulation */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-6 shadow-2xl max-w-sm z-50 flex gap-4 items-start"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
              <Smartphone className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-bold text-white">SMS Sent Successfully</h4>
                <button onClick={() => setShowNotification(null)} className="text-zinc-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-zinc-400 mb-3">To: <span className="text-white font-mono">{showNotification.phone}</span></p>
              <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#1f1f1f]">
                <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                  Welcome to the <strong className="text-red-500">M Fitness Family</strong>, {showNotification.name}! 🎉
                  <br/><br/>
                  Log in to your member portal using:
                  <br/>Username: <strong className="text-white">{showNotification.username}</strong>
                  <br/>Password: <span className="text-zinc-500">(Your assigned password)</span>
                  <br/><br/>
                  Portal Link: <span className="text-blue-400 underline cursor-pointer">mfitness.club/login</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
