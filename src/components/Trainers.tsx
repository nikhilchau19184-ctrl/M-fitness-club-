import React from 'react';
import { Plus, Star, MoreHorizontal, Mail, Phone } from 'lucide-react';

const trainers: any[] = [];

export function Trainers() {
  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Trainers</h1>
          <p className="text-sm text-zinc-400">Manage training staff and their specialties.</p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Trainer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {trainers.map(trainer => (
          <div key={trainer.id} className="bg-[#141414] rounded-3xl border border-[#1f1f1f] p-6 shadow-sm flex flex-col items-center text-center relative group hover:border-red-500/50 transition-colors">
            <button className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
            <img src={trainer.avatar} alt={trainer.name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#1a1a1a] shadow-sm" />
            <h3 className="text-lg font-bold text-white tracking-tight">{trainer.name}</h3>
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-3">{trainer.specialty}</p>
            
            <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full text-[10px] font-bold mb-5">
              <Star className="w-3 h-3 fill-current" /> {trainer.rating}
            </div>

            <div className="w-full grid grid-cols-2 gap-2 mb-5 border-t border-[#1f1f1f] pt-5">
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Clients</p>
                <p className="text-lg font-black text-white">{trainer.clients}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Status</p>
                <p className="text-sm font-bold text-green-500 mt-1">Active</p>
              </div>
            </div>

            <div className="flex gap-2 w-full mt-auto">
              <button className="flex-1 py-2 bg-[#1a1a1a] text-zinc-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4" />
              </button>
              <button className="flex-1 py-2 bg-[#1a1a1a] text-zinc-400 hover:bg-red-500/10 hover:text-red-500 rounded-xl flex items-center justify-center transition-colors">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
