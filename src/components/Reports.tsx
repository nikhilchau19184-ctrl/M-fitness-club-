import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import { BarChart3, TrendingUp, Users, CreditCard, DollarSign, Calendar, RefreshCw } from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 240000, members: 800 },
  { month: 'Feb', revenue: 280000, members: 920 },
  { month: 'Mar', revenue: 310000, members: 1050 },
  { month: 'Apr', revenue: 290000, members: 1100 },
  { month: 'May', revenue: 345000, members: 1250 },
  { month: 'Jun', revenue: 380000, members: 1320 },
];

const classDistribution = [
  { name: 'Strength', booked: 320, capacity: 400 },
  { name: 'Yoga', booked: 210, capacity: 300 },
  { name: 'Zumba', booked: 180, capacity: 200 },
  { name: 'HIIT', booked: 290, capacity: 300 },
  { name: 'Spinning', booked: 140, capacity: 150 },
];

const trainerLoad: any[] = [];

export function Reports() {
  const [timeframe, setTimeframe] = useState<'6M' | '1Y' | 'ALL'>('6M');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const triggerRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Analytics & Reports</h1>
          <p className="text-sm text-zinc-400">Perform deep analysis on gym members, revenue progress, and staff performance.</p>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-1 flex">
            {(['6M', '1Y', 'ALL'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  timeframe === tf 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button 
            onClick={triggerRefresh}
            className="p-2.5 bg-[#141414] border border-[#1f1f1f] rounded-xl hover:bg-[#1f1f1f] text-zinc-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-red-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Consolidated Revenue" 
          value="₹18,45,000" 
          trend="+15.4% YoY" 
          positive={true}
          icon={<DollarSign className="w-5 h-5 text-red-500" />} 
        />
        <KpiCard 
          title="Average Attendance Rate" 
          value="82.4%" 
          trend="+3.2% vs Last month" 
          positive={true}
          icon={<TrendingUp className="w-5 h-5 text-green-500" />} 
        />
        <KpiCard 
          title="New Member Registrations" 
          value="+520" 
          trend="8.4% monthly increase" 
          positive={true}
          icon={<Users className="w-5 h-5 text-blue-500" />} 
        />
        <KpiCard 
          title="Active Subscription Rate" 
          value="94.2%" 
          trend="-0.5% vs Peak" 
          positive={false}
          icon={<CreditCard className="w-5 h-5 text-yellow-500" />} 
        />
      </div>

      {/* Charts Suite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-8 bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Revenue & Member Accrual</h3>
              <p className="text-xs text-zinc-500">6-Month sliding financial analysis</p>
            </div>
            <span className="text-[10px] bg-red-600/10 text-red-500 font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              Primary Indicator
            </span>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#252525" vertical={false} />
                <XAxis dataKey="month" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#dc2626' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colRev)" name="Revenue (₹)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Member Signups Line Chart */}
        <div className="lg:col-span-4 bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-white mb-6">Active Subscriptions Growth</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#252525" vertical={false} />
                <XAxis dataKey="month" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="members" stroke="#f59e0b" strokeWidth={3} activeDot={{ r: 8 }} name="Active Members" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Class reservations Distribution */}
        <div className="lg:col-span-6 bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-white mb-4">Class Capacity Booking Loads</h3>
          <p className="text-xs text-zinc-500 mb-6">Current reservations vs class maximum seats</p>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classDistribution} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#252525" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="booked" fill="#dc2626" radius={[4, 4, 0, 0]} name="Reserved Bookings" />
                <Bar dataKey="capacity" fill="#3f3f46" radius={[4, 4, 0, 0]} name="Total Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Staff Training Load analysis */}
        <div className="lg:col-span-6 bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-2">Trainer Clients Distribution</h3>
            <p className="text-xs text-zinc-500 mb-6">Total private clients trained and performance ratings</p>
          </div>

          <div className="space-y-4">
            {trainerLoad.length === 0 ? (
              <p className="text-zinc-500 text-xs text-center py-10">No active trainers recorded.</p>
            ) : (
              trainerLoad.map((trainer, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-white">{trainer.name}</span>
                    <div className="space-x-2 text-zinc-400">
                      <span>{trainer.clients} Active Clients</span>
                      <span className="text-yellow-500">★ {trainer.rating} Rating</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-600 rounded-full" 
                      style={{ width: `${(trainer.clients / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, trend, positive, icon }: { title: string, value: string, trend: string, positive: boolean, icon: React.ReactNode }) {
  return (
    <div className="bg-[#141414] border border-[#1f1f1f] rounded-2xl p-6 shadow-sm flex flex-col justify-between h-32 hover:border-[#2a2a2a] transition-all">
      <div className="flex justify-between items-start">
        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{title}</span>
        <div className="p-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shrink-0">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline justify-between mt-auto">
        <h4 className="text-2xl font-mono font-black text-white">{value}</h4>
        <span className={`text-[10px] font-bold uppercase ${positive ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}
