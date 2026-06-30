import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, Activity, Calendar, UserCheck, Dumbbell, Smartphone, LogOut, Info, Star } from 'lucide-react';

interface KioskProps {
  onExit: () => void;
}

export function Kiosk({ onExit }: KioskProps) {
  const [activeScreen, setActiveScreen] = useState<'Home' | 'Enquiry' | 'BMI' | 'Packages' | 'Trainers'>('Home');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden">
      {/* Kiosk Header */}
      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">FITNESS<span className="text-red-500">+</span></h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xl font-bold font-mono">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">{currentTime.toLocaleDateString()}</p>
          </div>
          <button 
            onClick={onExit}
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Exit Kiosk"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {activeScreen === 'Home' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-8 z-10 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-[#050505] to-[#050505] -z-10" />
          
          <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8">
            Self-Registration Kiosk
          </span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
            TRANSFORM <br />YOUR <span className="text-red-500 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">BODY</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mb-12 font-medium">
            Welcome to Fitness+. Join today and get access to premium equipment, expert trainers, and a thriving community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center mt-6">
            <button 
              onClick={() => setActiveScreen('Enquiry')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl text-lg font-bold uppercase tracking-widest transition-all shadow-xl shadow-red-900/20 flex items-center justify-center gap-3 group"
            >
              Join Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setActiveScreen('Packages')}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white px-8 py-4 rounded-2xl text-lg font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3"
            >
              View Packages
            </button>
            <button 
              onClick={() => setActiveScreen('Trainers')}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white px-8 py-4 rounded-2xl text-lg font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3"
            >
              Our Trainers
            </button>
            <button 
              onClick={() => setActiveScreen('BMI')}
              className="bg-[#141414] hover:bg-[#1a1a1a] border border-[#1f1f1f] text-zinc-400 hover:text-white px-8 py-4 rounded-2xl text-lg font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3"
            >
              Calculate BMI
            </button>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full">
            {[
              { icon: UserCheck, label: 'Expert Trainers' },
              { icon: Dumbbell, label: 'Modern Equipments' },
              { icon: Calendar, label: 'Flexible Timings' },
              { icon: Smartphone, label: 'Mobile Access' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-red-500" />
                </div>
                <span className="text-sm font-bold text-zinc-400 uppercase tracking-wider">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeScreen === 'Enquiry' && (
        <div className="flex-1 flex items-center justify-center p-8 z-10 pt-32">
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-10 max-w-xl w-full shadow-2xl relative">
            <button 
              onClick={() => setActiveScreen('Home')}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white"
            >
              Close
            </button>
            <h3 className="text-3xl font-black mb-2 tracking-tight">Quick Enquiry</h3>
            <p className="text-zinc-400 mb-8 font-medium">Submit your details and our team will get back to you instantly.</p>

            <form className="space-y-6" onSubmit={e => { e.preventDefault(); setActiveScreen('Home'); alert('Enquiry Submitted!'); }}>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Full Name</label>
                <input type="text" required className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Phone Number</label>
                <input type="tel" required className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Interested Package</label>
                <select className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 appearance-none">
                  <option>Monthly Plan</option>
                  <option>Quarterly Plan</option>
                  <option>Yearly Plan</option>
                  <option>Personal Training</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-colors mt-4">
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {activeScreen === 'BMI' && (
        <div className="flex-1 flex items-center justify-center p-8 z-10 pt-32">
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-10 max-w-md w-full shadow-2xl relative">
             <button 
              onClick={() => setActiveScreen('Home')}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white"
            >
              Close
            </button>
            <h3 className="text-3xl font-black mb-2 tracking-tight">BMI Calculator</h3>
            <p className="text-zinc-400 mb-8 font-medium">Check your Body Mass Index quickly.</p>

            <form className="space-y-6" onSubmit={e => { e.preventDefault(); alert('BMI Checked! Please talk to our trainer.'); }}>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Weight (KG)</label>
                <input type="number" required placeholder="e.g. 70" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Height (CM)</label>
                <input type="number" required placeholder="e.g. 175" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50" />
              </div>
              <button type="submit" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-colors mt-4">
                Calculate Now
              </button>
            </form>
          </div>
        </div>
      )}

      {activeScreen === 'Packages' && (
        <div className="flex-1 flex flex-col items-center p-8 z-10 pt-32 overflow-y-auto">
          <button 
            onClick={() => setActiveScreen('Home')}
            className="absolute top-24 right-8 text-zinc-500 hover:text-white bg-[#141414] px-4 py-2 rounded-lg border border-[#1f1f1f]"
          >
            Back to Home
          </button>
          <h3 className="text-4xl font-black mb-12 tracking-tight">Explore Our Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
            {[
              { title: 'Silver Plan', price: '₹2,999', duration: 'Monthly', features: ['General Gym Access', 'Cardio Equipment', 'Locker Facility'] },
              { title: 'Gold Plan', price: '₹7,999', duration: 'Quarterly', features: ['All Silver Features', 'Group Classes', 'Diet Plan Consultation'], highlighted: true },
              { title: 'Platinum Plan', price: '₹24,999', duration: 'Yearly', features: ['All Gold Features', 'Personal Trainer', 'Massage Therapy', 'Free Merchandise'] }
            ].map((pkg, i) => (
              <div key={i} className={`bg-[#141414] border ${pkg.highlighted ? 'border-red-500' : 'border-[#1f1f1f]'} rounded-3xl p-8 flex flex-col`}>
                {pkg.highlighted && <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full self-start mb-4">Best Value</span>}
                <h4 className="text-xl font-bold text-white mb-2">{pkg.title}</h4>
                <div className="text-3xl font-black font-mono mb-1">{pkg.price}</div>
                <div className="text-sm text-zinc-500 mb-8">{pkg.duration}</div>
                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="text-sm text-zinc-300 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" /> {f}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setActiveScreen('Enquiry')}
                  className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider transition-colors ${pkg.highlighted ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeScreen === 'Trainers' && (
        <div className="flex-1 flex flex-col items-center p-8 z-10 pt-32 overflow-y-auto">
          <button 
            onClick={() => setActiveScreen('Home')}
            className="absolute top-24 right-8 text-zinc-500 hover:text-white bg-[#141414] px-4 py-2 rounded-lg border border-[#1f1f1f]"
          >
            Back to Home
          </button>
          <h3 className="text-4xl font-black mb-12 tracking-tight">Meet Our Experts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl w-full">
            {[
              { name: 'Vikram Singh', spec: 'Strength & Conditioning', rating: 4.9 },
              { name: 'Anjali Desai', spec: 'Yoga & Flexibility', rating: 4.8 },
              { name: 'Pooja Sharma', spec: 'Zumba & Aerobics', rating: 4.7 },
              { name: 'Rahul Verma', spec: 'CrossFit', rating: 4.9 },
            ].map((trainer, i) => (
              <div key={i} className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 text-center group hover:border-red-500/50 transition-colors">
                <img 
                  src={`https://ui-avatars.com/api/?name=${trainer.name.replace(' ', '+')}&background=1a1a1a&color=ef4444&size=150`} 
                  alt={trainer.name} 
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-[#2a2a2a] group-hover:border-red-500 transition-colors"
                />
                <h4 className="text-lg font-bold text-white mb-1">{trainer.name}</h4>
                <p className="text-xs text-red-500 font-bold uppercase tracking-wider mb-3">{trainer.spec}</p>
                <div className="flex items-center justify-center gap-1 text-yellow-500 text-sm font-bold">
                  <Star className="w-4 h-4 fill-current" /> {trainer.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
