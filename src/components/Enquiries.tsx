import React, { useState, useEffect } from 'react';
import { Search, Plus, Phone, Mail, Calendar, Check, X, AlertTriangle, UserPlus, PhoneCall, Trash2 } from 'lucide-react';

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  interest: string;
  status: 'New' | 'Follow-Up' | 'Converted' | 'Lost';
  date: string;
  notes: string;
}

const initialEnquiries: Enquiry[] = [];

export function Enquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('fc_enquiries');
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  const [activeTab, setActiveTab] = useState<'All' | 'New' | 'Follow-Up' | 'Converted' | 'Lost'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    localStorage.setItem('fc_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newEq: Enquiry = {
      id: 'eq_' + Date.now(),
      name,
      phone,
      interest,
      status: 'New',
      date: new Date().toISOString().split('T')[0],
      notes
    };
    
    setEnquiries(prev => [newEq, ...prev]);
    setShowModal(false);
    setName('');
    setPhone('');
    setInterest('');
    setNotes('');
  };

  const handleStatusChange = (id: string, newStatus: Enquiry['status']) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
  };

  const handleDelete = (id: string) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
  };

  const filteredEnquiries = enquiries.filter(e => {
    const matchesTab = activeTab === 'All' || e.status === activeTab;
    const matchesQuery = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         e.phone.includes(searchQuery);
    return matchesTab && matchesQuery;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Enquiry Management</h1>
          <p className="text-sm text-zinc-400">Track walk-ins, manage leads, and set follow-up reminders.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-red-900/10"
        >
          <Plus className="w-4 h-4" /> New Enquiry
        </button>
      </div>

      <div className="bg-[#141414] rounded-3xl border border-[#1f1f1f] p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar">
            {(['All', 'New', 'Follow-Up', 'Converted', 'Lost'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'bg-red-600 text-white shadow-md shadow-red-900/10' 
                    : 'bg-[#1a1a1a] text-zinc-400 hover:text-white hover:bg-[#222222]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl pl-9 pr-4 py-2 text-sm w-full lg:w-64 focus:outline-none focus:ring-1 focus:ring-red-500 text-white placeholder-zinc-500" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#2a2a2a] text-xs font-bold text-zinc-500 uppercase tracking-wider">
                <th className="pb-3 px-3">Lead Details</th>
                <th className="pb-3 px-3">Interest / Package</th>
                <th className="pb-3 px-3">Date & Notes</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-zinc-500 text-sm">
                    No enquiries found matching filters.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map(e => (
                  <tr key={e.id} className="border-b border-[#1f1f1f] last:border-0 hover:bg-[#1a1a1a] transition-colors group">
                    <td className="py-4 px-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{e.name}</p>
                        <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" /> {e.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <p className="text-sm font-medium text-white">{e.interest}</p>
                    </td>
                    <td className="py-4 px-3">
                      <p className="text-xs text-zinc-400 mb-0.5"><Calendar className="w-3 h-3 inline mr-1" />{e.date}</p>
                      <p className="text-[10px] text-zinc-500 truncate max-w-[200px]">{e.notes || '-'}</p>
                    </td>
                    <td className="py-4 px-3">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        e.status === 'New' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 
                        e.status === 'Follow-Up' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                        e.status === 'Converted' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <div className="flex justify-end items-center gap-2">
                        {e.status !== 'Converted' && e.status !== 'Lost' && (
                          <div className="flex gap-1 mr-2 border-r border-[#2a2a2a] pr-2">
                            <button 
                              onClick={() => handleStatusChange(e.id, 'Follow-Up')}
                              title="Mark Follow-Up"
                              className="p-1.5 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500/20 transition-colors"
                            >
                              <PhoneCall className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleStatusChange(e.id, 'Converted')}
                              title="Convert to Member"
                              className="p-1.5 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors"
                            >
                              <UserPlus className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleStatusChange(e.id, 'Lost')}
                              title="Mark Lost"
                              className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        <button 
                          onClick={() => handleDelete(e.id)}
                          title="Delete"
                          className="p-1.5 bg-zinc-800 text-zinc-400 rounded-lg hover:bg-[#252525] hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl w-full max-w-md p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">New Enquiry Record</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Interest / Package</label>
                <input 
                  type="text"
                  placeholder="e.g. Weight Loss, Monthly Plan" 
                  value={interest}
                  onChange={e => setInterest(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Notes (Optional)</label>
                <textarea 
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500 resize-none" 
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-zinc-800 text-zinc-300 hover:text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-red-600 text-white hover:bg-red-700 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Save Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
