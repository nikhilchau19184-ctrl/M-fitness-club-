import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, MessageCircle, Mail, Scale, X, Save, ArrowUpRight, Snowflake, UserPlus, RefreshCw } from 'lucide-react';

const members = [
  { id: 1, name: 'Amit Verma', email: 'amit@gmail.com', phone: '+91 9876543210', plan: 'Platinum', status: 'Active', joinDate: '12 May 2024', avatar: 'https://ui-avatars.com/api/?name=Amit+Verma&background=f4f4f5&color=18181b', weight: '78', height: '175', bmi: '25.5' },
  { id: 2, name: 'Neha Sharma', email: 'neha@gmail.com', phone: '+91 9876543211', plan: 'Gold', status: 'Active', joinDate: '11 May 2024', avatar: 'https://ui-avatars.com/api/?name=Neha+Sharma&background=f4f4f5&color=18181b', weight: '60', height: '162', bmi: '22.9' },
  { id: 3, name: 'Rahul Singh', email: 'rahul@gmail.com', phone: '+91 9876543212', plan: 'Silver', status: 'Inactive', joinDate: '10 May 2024', avatar: 'https://ui-avatars.com/api/?name=Rahul+Singh&background=f4f4f5&color=18181b', weight: '85', height: '180', bmi: '26.2' },
  { id: 4, name: 'Pooja Mehta', email: 'pooja@gmail.com', phone: '+91 9876543213', plan: 'Gold', status: 'Active', joinDate: '09 May 2024', avatar: 'https://ui-avatars.com/api/?name=Pooja+Mehta&background=f4f4f5&color=18181b', weight: '65', height: '165', bmi: '23.9' },
];

export function Members({ isSuperAdmin }: { isSuperAdmin?: boolean }) {
  const [showAssessment, setShowAssessment] = useState<number | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<number | null>(null);

  const selectedMember = members.find(m => m.id === showAssessment);

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-5 h-full relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Members</h1>
          <p className="text-sm text-zinc-400">Manage club members, physical assessments, and communications.</p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center gap-2">
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
            <button className="px-4 py-2 border border-[#2a2a2a] bg-[#1a1a1a] text-zinc-300 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#2a2a2a]">Filter</button>
            <button className="px-4 py-2 border border-[#2a2a2a] bg-[#1a1a1a] text-zinc-300 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#2a2a2a]">Export</button>
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
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${member.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
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
    </div>
  );
}
