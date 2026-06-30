import React from 'react';
import { Activity, Calendar, Award, Flame, LogOut, TrendingUp, Dumbbell, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { ProgressChart } from './ProgressChart';

interface MemberPortalProps {
  onLogout: () => void;
}

export function MemberPortal({ onLogout }: MemberPortalProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <header className="h-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1f1f1f] flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-black tracking-tight uppercase">M Fitness Club</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium hidden sm:block">Welcome back, John!</span>
          <img src="https://ui-avatars.com/api/?name=John+Doe&background=1a1a1a&color=ef4444" alt="Avatar" className="w-10 h-10 rounded-full border border-[#2a2a2a]" />
          <button onClick={onLogout} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors ml-2" title="Sign Out">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Your Progress</h2>
            <p className="text-zinc-400 text-sm mt-1">Keep pushing your limits. You're doing great!</p>
          </div>
          <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
            Platinum Member
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Current Streak', value: '12 Days', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            { label: 'Classes Attended', value: '34', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Weight Goal', value: '72 kg', icon: Target, color: 'text-green-500', bg: 'bg-green-500/10' },
            { label: 'Personal Records', value: '8', icon: Award, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-black font-mono">{stat.value}</div>
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-red-500" /> Progress Visualizer</h3>
            <ProgressChart />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6"
          >
            <h3 className="text-lg font-bold mb-4">Body Metrics</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-zinc-400">
                  <span>Weight</span>
                  <span className="text-white">74 kg</span>
                </div>
                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[60%] rounded-full" />
                </div>
                <p className="text-[10px] text-zinc-500 mt-2 text-right">Goal: 72 kg</p>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-zinc-400">
                  <span>Body Fat %</span>
                  <span className="text-white">18%</span>
                </div>
                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[70%] rounded-full" />
                </div>
                <p className="text-[10px] text-zinc-500 mt-2 text-right">Goal: 15%</p>
              </div>

              <div className="pt-6 border-t border-[#1f1f1f]">
                <h4 className="text-sm font-bold text-white mb-3">Upcoming Classes</h4>
                <div className="bg-[#1a1a1a] p-3 rounded-xl border border-[#2a2a2a]">
                  <div className="text-xs text-red-500 font-bold uppercase tracking-wider mb-1">Tomorrow, 07:00 AM</div>
                  <div className="font-bold text-sm">HIIT Bootcamp</div>
                  <div className="text-xs text-zinc-400 mt-1">Trainer: Vikram Singh</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
