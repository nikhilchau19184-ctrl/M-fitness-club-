import React from 'react';
import { Plus, Users, MapPin } from 'lucide-react';

const schedule = [
  { time: '07:00 AM', name: 'Strength Training', trainer: 'Vikram Singh', location: 'Main Floor', capacity: 25, booked: 22, duration: '60 min', type: 'strength' },
  { time: '08:00 AM', name: 'Morning Yoga', trainer: 'Anjali Desai', location: 'Studio A', capacity: 20, booked: 20, duration: '45 min', type: 'flexibility' },
  { time: '05:00 PM', name: 'HIIT Blast', trainer: 'Rohit Sharma', location: 'Studio B', capacity: 15, booked: 12, duration: '45 min', type: 'cardio' },
  { time: '06:00 PM', name: 'Zumba Party', trainer: 'Pooja Kapoor', location: 'Studio A', capacity: 30, booked: 28, duration: '60 min', type: 'cardio' },
];

export function Classes() {
  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Class Schedule</h1>
          <p className="text-sm text-zinc-400">Manage daily classes and bookings.</p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Class
        </button>
      </div>

      <div className="bg-[#141414] rounded-3xl border border-[#1f1f1f] p-6 shadow-sm">
        <div className="flex gap-4 border-b border-[#2a2a2a] pb-4 mb-6 overflow-x-auto custom-scrollbar">
          {['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday'].map((day, i) => (
            <button key={i} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${i === 0 ? 'bg-red-600 text-white' : 'bg-[#1a1a1a] text-zinc-400 hover:text-white'}`}>
              {day}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {schedule.map((cls, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-2xl border border-[#1f1f1f] hover:border-red-500/50 hover:bg-[#1a1a1a] transition-colors">
              <div className="md:w-32 shrink-0">
                <span className="text-xl font-black text-red-500 tracking-tight">{cls.time}</span>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{cls.duration}</p>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white tracking-tight">{cls.name}</h3>
                <p className="text-xs font-semibold text-zinc-500 mt-1">with <span className="text-red-500">{cls.trainer}</span></p>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-8 items-center">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                  <MapPin className="w-4 h-4 text-zinc-500" /> {cls.location}
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
                  <Users className="w-4 h-4 text-zinc-500" /> {cls.booked} / {cls.capacity}
                </div>
                <div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    cls.booked === cls.capacity ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                  }`}>
                    {cls.booked === cls.capacity ? 'Full' : 'Open'}
                  </span>
                </div>
                <button className="px-4 py-2 bg-[#1a1a1a] text-white border border-[#2a2a2a] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-600 hover:border-red-600 transition-colors">
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
