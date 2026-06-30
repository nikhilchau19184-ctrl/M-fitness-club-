import React, { useState } from 'react';
import { Activity, Calendar, Award, Flame, LogOut, TrendingUp, Dumbbell, Target, MessageSquare, Bell, Image as ImageIcon, HelpCircle, Bot, Upload, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ProgressChart } from './ProgressChart';

interface MemberPortalProps {
  onLogout: () => void;
  member?: any;
}

import { QRCodeCanvas } from 'qrcode.react';

export function MemberPortal({ onLogout, member }: MemberPortalProps) {
  const [activeTab, setActiveTab] = useState<'Dashboard' | 'AICoach' | 'Messages' | 'Transformations' | 'Help'>('Dashboard');

  const displayName = member?.name || member?.fullName || 'Member';
  const displayPlan = member?.plan || 'Standard';
  const displayAvatar = member?.avatar || `https://ui-avatars.com/api/?name=${displayName.replace(' ', '+')}&background=1a1a1a&color=ef4444`;
  const weight = member?.weight || '0';
  const height = member?.height || '0';
  const bmi = member?.bmi || '0';
  const goal = member?.fitnessGoal || 'General Fitness';
  const memberId = member?.memberId || 'MF-0000';
  const joinDate = member?.joinDate ? new Date(member.joinDate.seconds * 1000).toLocaleDateString() : 'Today';

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      <header className="h-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1f1f1f] flex items-center justify-between px-6 sticky top-0 z-20 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-transparent border-2 border-red-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.2)]">
            <span className="text-red-600 text-xl font-black italic tracking-tighter pr-0.5">M</span>
          </div>
          <h1 className="text-xl font-black tracking-tight uppercase hidden sm:block">M Fitness Club</h1>
        </div>
        
        <div className="flex-1 max-w-2xl mx-8 hidden lg:flex justify-center gap-2">
          {[
            { id: 'Dashboard', icon: Activity, label: 'Progress' },
            { id: 'AICoach', icon: Bot, label: 'AI Coach' },
            { id: 'Messages', icon: Bell, label: 'Notices' },
            { id: 'Transformations', icon: ImageIcon, label: 'Gallery' },
            { id: 'Help', icon: HelpCircle, label: 'Guide' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === tab.id ? 'bg-red-600 text-white' : 'text-zinc-500 hover:text-white hover:bg-[#1a1a1a]'}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium hidden sm:block">Welcome back, {displayName}!</span>
          <img src={displayAvatar} alt="Avatar" className="w-10 h-10 rounded-full border border-[#2a2a2a]" />
          <button onClick={onLogout} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors ml-2" title="Sign Out">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Tabs */}
      <div className="lg:hidden bg-[#0a0a0a] border-b border-[#1f1f1f] p-4 flex overflow-x-auto gap-2 no-scrollbar sticky top-20 z-10">
        {[
          { id: 'Dashboard', icon: Activity, label: 'Progress' },
          { id: 'AICoach', icon: Bot, label: 'AI Coach' },
          { id: 'Messages', icon: Bell, label: 'Notices' },
          { id: 'Transformations', icon: ImageIcon, label: 'Gallery' },
          { id: 'Help', icon: HelpCircle, label: 'Guide' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs whitespace-nowrap font-bold uppercase tracking-wider transition-colors shrink-0 ${activeTab === tab.id ? 'bg-red-600 text-white' : 'text-zinc-500 bg-[#141414]'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        {activeTab === 'Dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-black tracking-tight">Your Progress</h2>
                <p className="text-zinc-400 text-sm mt-1">Keep pushing your limits, {displayName}. You're doing great!</p>
              </div>
              <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                {displayPlan} Member
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Current Streak', value: '12 Days', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                { label: 'Classes Attended', value: '34', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { label: 'Goal', value: goal, icon: Target, color: 'text-green-500', bg: 'bg-green-500/10' },
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
                  <div className="text-xl font-black font-mono">{stat.value}</div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">{stat.label}</div>
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
                      <span className="text-white">{weight} kg</span>
                    </div>
                    <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-[60%] rounded-full" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-zinc-400">
                      <span>Calculated BMI</span>
                      <span className="text-white">{bmi}</span>
                    </div>
                    <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[50%] rounded-full" />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#1f1f1f]">
                    <h4 className="text-sm font-bold text-white mb-3">Digital Membership Card</h4>
                    <div className="bg-gradient-to-br from-red-600 to-red-900 p-1 rounded-2xl">
                      <div className="bg-[#141414] rounded-xl p-4 flex flex-col items-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
                        <h5 className="text-red-500 font-black italic tracking-tighter text-2xl mb-4">M</h5>
                        
                        <div className="bg-white p-2 rounded-xl mb-4">
                          <QRCodeCanvas value={memberId} size={100} level="H" />
                        </div>
                        
                        <h4 className="font-bold text-lg text-white text-center">{displayName}</h4>
                        <p className="text-sm text-zinc-400 font-mono mt-1">{memberId}</p>
                        
                        <div className="w-full mt-4 flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                          <span className="text-zinc-500">Plan: <span className="text-white">{displayPlan}</span></span>
                          <span className="text-zinc-500">Since: <span className="text-white">{joinDate}</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'AICoach' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-200px)] flex flex-col bg-[#141414] border border-[#1f1f1f] rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-[#1f1f1f] bg-[#1a1a1a]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20">
                  <Bot className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">M Fitness AI Coach</h2>
                  <p className="text-sm text-zinc-400">Your personalized onboarding and fitness guide.</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex justify-start">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-sm">Hi John! Welcome to M Fitness Club. I'm your AI Coach. Based on your profile, your current BMI is <strong className="text-white">24.2</strong> (Healthy Weight).</p>
                  <p className="text-sm mt-2">To reach your goal of 72kg, I recommend a daily caloric intake of 2,200 kcal with a macro split of 40% Protein, 40% Carbs, and 20% Fats.</p>
                  <div className="mt-4 bg-[#0a0a0a] p-3 rounded-xl border border-[#1f1f1f]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">Suggested Diet Plan</h4>
                    <ul className="text-xs text-zinc-400 space-y-1">
                      <li>• Breakfast: Oatmeal with whey protein & berries</li>
                      <li>• Lunch: Grilled chicken breast with sweet potato & broccoli</li>
                      <li>• Dinner: Baked salmon with quinoa & asparagus</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-red-600 text-white rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                  <p className="text-sm">Thanks! What supplements should I take?</p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-sm">For your goals, I suggest starting with:</p>
                  <ul className="text-sm mt-2 space-y-1 list-disc pl-4 text-zinc-300">
                    <li>Whey Protein Isolate (Post-workout)</li>
                    <li>Creatine Monohydrate (5g daily)</li>
                    <li>Omega-3 Fish Oil</li>
                  </ul>
                  <p className="text-sm mt-2 text-zinc-400">Would you like me to send a detailed supplement guide to your email?</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#1a1a1a] border-t border-[#1f1f1f]">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask your AI coach anything..." 
                  className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 text-white"
                />
                <button className="bg-red-600 text-white px-6 rounded-xl font-bold hover:bg-red-700 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Messages' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="text-2xl font-black tracking-tight mb-6">Notice & Reminders</h2>
            {[
              { title: 'Membership Fee Due', message: 'Your Platinum Plan renewal is due in 3 days. Please complete the payment to avoid interruption of services.', type: 'alert', date: 'Today, 10:00 AM' },
              { title: 'Holiday Closure', message: 'The gym will remain closed on Sunday, 4th of July for independence day.', type: 'notice', date: 'Yesterday, 02:00 PM' },
              { title: 'New Equipment Added', message: 'We have added 4 new Squat Racks and 2 new Cable Machines in the free weight section!', type: 'info', date: '25 Jun 2026' },
              { title: 'Diet Plan Updated', message: 'Your AI Coach has updated your monthly diet plan. Check the AI Coach tab for details.', type: 'info', date: '20 Jun 2026' },
            ].map((notice, i) => (
              <div key={i} className={`p-5 rounded-2xl border flex gap-4 ${notice.type === 'alert' ? 'bg-red-500/5 border-red-500/20' : 'bg-[#141414] border-[#1f1f1f]'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${notice.type === 'alert' ? 'bg-red-500/20 text-red-500' : 'bg-zinc-800 text-zinc-400'}`}>
                  {notice.type === 'alert' ? <AlertCircle className="w-6 h-6" /> : <Bell className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-white">{notice.title}</h3>
                    <span className="text-xs text-zinc-500 font-mono whitespace-nowrap ml-4">{notice.date}</span>
                  </div>
                  <p className="text-sm text-zinc-400">{notice.message}</p>
                  {notice.type === 'alert' && (
                    <button className="mt-3 bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'Transformations' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black tracking-tight">Your Transformations</h2>
              <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors">
                <Upload className="w-4 h-4" /> Upload Progress
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { date: 'Jan 2026', label: 'Day 1', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop' },
                { date: 'Mar 2026', label: 'Month 3', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop' },
                { date: 'Jun 2026', label: 'Current', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop' },
              ].map((pic, i) => (
                <div key={i} className="bg-[#141414] border border-[#1f1f1f] rounded-3xl overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <img src={pic.img} alt={pic.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                      <span className="text-white font-black text-xl">{pic.label}</span>
                      <span className="text-red-500 font-bold uppercase tracking-wider text-xs">{pic.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'Help' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black tracking-tight mb-4">How to use M Fitness App</h2>
              <p className="text-zinc-400">Everything you need to know to make the most out of your membership.</p>
            </div>

            <div className="space-y-4">
              {[
                { q: "How do I book a personal training session?", a: "Navigate to the AI Coach tab to request a slot, or speak directly to a trainer at the front desk. Your sessions will appear in the upcoming classes widget." },
                { q: "How does the AI Coach calculate my diet?", a: "The AI Coach uses your provided height, weight, age, and fitness goals to calculate your Basal Metabolic Rate (BMR) and suggests macros accordingly." },
                { q: "Can I bring a guest?", a: "Platinum members can bring 1 guest per month for free. Standard members must pay a ₹500 day-pass fee at the front desk." },
                { q: "How to upload transformation pictures?", a: "Go to the 'Gallery' tab and click 'Upload Progress'. We recommend taking pictures in the same lighting every 4 weeks." },
                { q: "What happens if I miss my fee payment?", a: "You will receive a notification in the 'Notices' tab 3 days prior. If unpaid, access will be temporarily paused until the due is cleared." },
              ].map((faq, i) => (
                <div key={i} className="bg-[#141414] border border-[#1f1f1f] rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-white mb-2 flex items-start gap-3">
                    <span className="text-red-500 mt-0.5">Q.</span> {faq.q}
                  </h4>
                  <p className="text-zinc-400 pl-7">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-red-600/10 border border-red-500/20 rounded-3xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Need more help?</h3>
              <p className="text-zinc-400 mb-6">Our front desk staff is always ready to assist you.</p>
              <button className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-red-700 transition-colors">
                Contact Support
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

