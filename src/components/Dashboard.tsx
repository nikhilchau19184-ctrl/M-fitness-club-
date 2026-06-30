import React from 'react';
import { Users, UserCheck, Calendar, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 50 },
  { name: 'Mar', value: 40 },
  { name: 'Apr', value: 70 },
  { name: 'May', value: 55 },
  { name: 'Jun', value: 80 },
  { name: 'Jul', value: 100 },
];

const popularClasses = [
  { name: 'Strength Training', schedule: 'Mon, Wed, Fri - 7:00 AM', attendees: 25, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=100&auto=format&fit=crop&q=60' },
  { name: 'Yoga', schedule: 'Tue, Thu - 8:00 AM', attendees: 20, image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=100&auto=format&fit=crop&q=60' },
  { name: 'Zumba', schedule: 'Mon, Wed - 6:00 PM', attendees: 18, image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&auto=format&fit=crop&q=60' },
  { name: 'HIIT', schedule: 'Sat - 9:00 AM', attendees: 15, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&auto=format&fit=crop&q=60' },
];

const recentMembers = [
  { name: 'Amit Verma', email: 'amit@gmail.com', plan: 'Platinum', date: '12 May 2024', avatar: 'https://ui-avatars.com/api/?name=Amit+Verma' },
  { name: 'Neha Sharma', email: 'neha@gmail.com', plan: 'Gold', date: '11 May 2024', avatar: 'https://ui-avatars.com/api/?name=Neha+Sharma' },
  { name: 'Rahul Singh', email: 'rahul@gmail.com', plan: 'Silver', date: '10 May 2024', avatar: 'https://ui-avatars.com/api/?name=Rahul+Singh' },
  { name: 'Pooja Mehta', email: 'pooja@gmail.com', plan: 'Gold', date: '09 May 2024', avatar: 'https://ui-avatars.com/api/?name=Pooja+Mehta' },
];

const upcomingClasses = [
  { time: '07:00 AM', name: 'Strength Training', trainer: 'Vikram' },
  { time: '08:00 AM', name: 'Yoga', trainer: 'Anjali' },
  { time: '06:00 PM', name: 'Zumba', trainer: 'Pooja' },
  { time: '07:00 PM', name: 'HIIT', trainer: 'Rohit' },
];

export function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Members" value="1,250" trend="+12% this month" icon={<Users className="w-6 h-6 text-red-500" />} />
        <StatCard title="Active Members" value="980" trend="78% of total" icon={<UserCheck className="w-6 h-6 text-green-500" />} trendColor="text-zinc-400" />
        <StatCard title="Today's Bookings" value="25" trend="+8% this week" icon={<Calendar className="w-6 h-6 text-blue-500" />} />
        <StatCard title="Monthly Revenue" value="₹3,45,000" trend="+18% this month" icon={<DollarSign className="w-6 h-6 text-yellow-500" />} />
      </div>

      {/* Charts & Popular Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#141414] border border-[#1f1f1f] rounded-2xl p-6 lg:col-span-2 shadow-sm">
          <h3 className="text-lg font-semibold text-white mb-6">Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#dc2626' }}
                />
                <Area type="monotone" dataKey="value" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Popular Classes</h3>
            <button className="text-sm text-zinc-400 hover:text-white">View All</button>
          </div>
          <div className="flex-1 space-y-4">
            {popularClasses.map((cls, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1a1a1a] transition-colors group">
                <div className="flex items-center space-x-4">
                  <img src={cls.image} alt={cls.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <h4 className="text-white font-medium group-hover:text-red-500 transition-colors">{cls.name}</h4>
                    <p className="text-xs text-zinc-500">{cls.schedule}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-white">{cls.attendees}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#141414] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Members</h3>
            <button className="text-sm text-zinc-400 hover:text-white">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <tbody>
                {recentMembers.map((member, i) => (
                  <tr key={i} className="border-b border-[#1f1f1f] last:border-0 hover:bg-[#1a1a1a] transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-3">
                        <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="text-sm font-medium text-white">{member.name}</p>
                          <p className="text-xs text-zinc-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`text-xs px-2 py-1 rounded-full bg-zinc-800 border ${
                        member.plan === 'Platinum' ? 'text-zinc-200 border-zinc-600' : 
                        member.plan === 'Gold' ? 'text-yellow-500 border-yellow-900/50' : 
                        'text-zinc-400 border-zinc-700'
                      }`}>
                        {member.plan}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right text-sm text-zinc-400">{member.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Upcoming Classes</h3>
            <button className="text-sm text-zinc-400 hover:text-white">View All</button>
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((cls, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a]">
                <div className="flex items-center space-x-4">
                  <div className="text-center px-4 border-r border-[#2a2a2a]">
                    <span className="text-sm font-bold text-white block">{cls.time}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{cls.name}</h4>
                    <p className="text-xs text-zinc-500">Trainer: {cls.trainer}</p>
                  </div>
                </div>
                <button className="text-xs font-medium text-red-500 bg-red-500/10 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-colors">
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, trendColor = "text-green-500" }: { title: string, value: string, trend: string, icon: React.ReactNode, trendColor?: string }) {
  return (
    <div className="bg-[#141414] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-zinc-400 mb-1">{title}</p>
          <h4 className="text-3xl font-bold text-white">{value}</h4>
        </div>
        <div className="p-3 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
          {icon}
        </div>
      </div>
      <div className="mt-auto">
        <span className={`text-xs font-medium ${trendColor}`}>{trend}</span>
      </div>
    </div>
  );
}
