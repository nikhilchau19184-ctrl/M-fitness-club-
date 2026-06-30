import React, { useState, useEffect } from 'react';
import { Search, Plus, Check, X, Calendar, User, Clock, Trash2 } from 'lucide-react';

interface Booking {
  id: string;
  memberName: string;
  memberEmail: string;
  className: string;
  trainerName: string;
  date: string;
  time: string;
  status: 'Approved' | 'Pending' | 'Cancelled';
}

const initialBookings: Booking[] = [
  { id: 'b1', memberName: 'Amit Verma', memberEmail: 'amit@gmail.com', className: 'Strength Training', trainerName: 'Vikram', date: '2026-06-25', time: '07:00 AM', status: 'Approved' },
  { id: 'b2', memberName: 'Neha Sharma', memberEmail: 'neha@gmail.com', className: 'Yoga', trainerName: 'Anjali', date: '2026-06-25', time: '08:00 AM', status: 'Pending' },
  { id: 'b3', memberName: 'Rahul Singh', memberEmail: 'rahul@gmail.com', className: 'Zumba', trainerName: 'Pooja', date: '2026-06-25', time: '06:00 PM', status: 'Pending' },
  { id: 'b4', memberName: 'Pooja Mehta', memberEmail: 'pooja@gmail.com', className: 'HIIT', trainerName: 'Rohit', date: '2026-06-25', time: '07:00 PM', status: 'Cancelled' },
];

export function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('fc_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Approved' | 'Cancelled'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  // New Booking Form States
  const [newMember, setNewMember] = useState('Amit Verma');
  const [newClass, setNewClass] = useState('Strength Training');
  const [newTrainer, setNewTrainer] = useState('Vikram');
  const [newDate, setNewDate] = useState('2026-06-25');
  const [newTime, setNewTime] = useState('07:00 AM');

  useEffect(() => {
    localStorage.setItem('fc_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleStatusChange = (id: string, newStatus: 'Approved' | 'Cancelled') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const handleDelete = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const emails: Record<string, string> = {
      'Amit Verma': 'amit@gmail.com',
      'Neha Sharma': 'neha@gmail.com',
      'Rahul Singh': 'rahul@gmail.com',
      'Pooja Mehta': 'pooja@gmail.com',
    };
    const booking: Booking = {
      id: 'b_' + Date.now(),
      memberName: newMember,
      memberEmail: emails[newMember] || 'member@gmail.com',
      className: newClass,
      trainerName: newTrainer,
      date: newDate,
      time: newTime,
      status: 'Pending'
    };
    setBookings(prev => [booking, ...prev]);
    setShowModal(false);
  };

  const filteredBookings = bookings.filter(b => {
    const matchesTab = activeTab === 'All' || b.status === activeTab;
    const matchesQuery = b.memberName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         b.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.trainerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Bookings Management</h1>
          <p className="text-sm text-zinc-400">Approve, cancel, and schedule class reservations.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center justify-center gap-2 self-start sm:self-auto shadow-md shadow-red-900/10"
        >
          <Plus className="w-4 h-4" /> Book Class
        </button>
      </div>

      <div className="bg-[#141414] rounded-3xl border border-[#1f1f1f] p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar">
            {(['All', 'Pending', 'Approved', 'Cancelled'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'bg-red-600 text-white shadow-md shadow-red-900/10' 
                    : 'bg-[#1a1a1a] text-zinc-400 hover:text-white hover:bg-[#222222]'
                }`}
              >
                {tab} Bookings
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl pl-9 pr-4 py-2 text-sm w-full lg:w-64 focus:outline-none focus:ring-1 focus:ring-red-500 text-white placeholder-zinc-500" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2a2a2a] text-xs font-bold text-zinc-500 uppercase tracking-wider">
                <th className="pb-3 px-3">Member</th>
                <th className="pb-3 px-3">Class & Trainer</th>
                <th className="pb-3 px-3">Schedule</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-zinc-500 text-sm">
                    No bookings found matching filters.
                  </td>
                </tr>
              ) : (
                filteredBookings.map(b => (
                  <tr key={b.id} className="border-b border-[#1f1f1f] last:border-0 hover:bg-[#1a1a1a] transition-colors">
                    <td className="py-4 px-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{b.memberName}</p>
                        <p className="text-xs text-zinc-500">{b.memberEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{b.className}</p>
                        <p className="text-xs text-red-500">Trainer: {b.trainerName}</p>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex flex-col gap-1 text-xs text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-zinc-500" /> {b.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-zinc-500" /> {b.time}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        b.status === 'Approved' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                        b.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <div className="flex justify-end items-center gap-2">
                        {b.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => handleStatusChange(b.id, 'Approved')}
                              title="Approve"
                              className="p-1.5 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleStatusChange(b.id, 'Cancelled')}
                              title="Cancel"
                              className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button 
                          onClick={() => handleDelete(b.id)}
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

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl w-full max-w-md p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">New Class Booking</h3>
            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Select Member</label>
                <select 
                  value={newMember}
                  onChange={e => setNewMember(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="Amit Verma">Amit Verma</option>
                  <option value="Neha Sharma">Neha Sharma</option>
                  <option value="Rahul Singh">Rahul Singh</option>
                  <option value="Pooja Mehta">Pooja Mehta</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Class</label>
                <select 
                  value={newClass}
                  onChange={e => {
                    setNewClass(e.target.value);
                    const mapping: Record<string, string> = {
                      'Strength Training': 'Vikram',
                      'Yoga': 'Anjali',
                      'Zumba': 'Pooja',
                      'HIIT': 'Rohit'
                    };
                    setNewTrainer(mapping[e.target.value] || 'Vikram');
                  }}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="Strength Training">Strength Training</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Zumba">Zumba</option>
                  <option value="HIIT">HIIT</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Trainer</label>
                <input 
                  type="text" 
                  value={newTrainer} 
                  disabled
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] opacity-50 rounded-xl px-3 py-2 text-sm text-white focus:outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Date</label>
                  <input 
                    type="date" 
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Time Slot</label>
                  <select 
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    <option value="07:00 AM">07:00 AM</option>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                  </select>
                </div>
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
                  Submit Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
