import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  CalendarDays, 
  BookCheck, 
  CreditCard, 
  ClipboardCheck, 
  Activity, 
  Apple, 
  BarChart2, 
  Bell, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { title: 'Dashboard', icon: LayoutDashboard, href: '#' },
  { title: 'Enquiries', icon: Users, href: '#enquiries' },
  { title: 'Members', icon: Users, href: '#members' },
  { title: 'Trainers', icon: Dumbbell, href: '#trainers' },
  { title: 'Classes', icon: CalendarDays, href: '#classes' },
  { title: 'Bookings', icon: BookCheck, href: '#bookings' },
  { title: 'Subscriptions', icon: CreditCard, href: '#subscriptions' },
  { title: 'Finances & Payroll', icon: BarChart2, href: '#finances' },
  { title: 'Attendance', icon: ClipboardCheck, href: '#attendance' },
  { title: 'Workout Plans', icon: Activity, href: '#workouts' },
  { title: 'Nutrition', icon: Apple, href: '#nutrition' },
  { title: 'Reports', icon: BarChart2, href: '#reports' },
  { title: 'Notifications', icon: Bell, href: '#notifications' },
  { title: 'Settings', icon: Settings, href: '#settings' },
];

export function Sidebar({ activeItem, setActiveItem, userRole }: { activeItem: string, setActiveItem: (item: string) => void, userRole?: string }) {

  return (
    <div className="w-64 h-screen bg-[#0a0a0a] border-r border-[#1f1f1f] flex flex-col hidden md:flex fixed top-0 left-0">
      <div className="p-6 flex flex-col items-center border-b border-[#1f1f1f]">
        <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-3xl mb-2 italic shadow-[0_0_15px_rgba(220,38,38,0.5)] border-2 border-red-500">
          M
        </div>
        <h1 className="text-xl font-bold text-red-600 tracking-wider">FITNESS CLUB</h1>
        <p className="text-[10px] font-bold text-zinc-400 tracking-widest mt-1 uppercase">- UNISEX -</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <button
              key={item.title}
              onClick={() => setActiveItem(item.title)}
              className={cn(
                "w-full flex items-center px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                activeItem === item.title 
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/20" 
                  : "text-zinc-400 hover:text-white hover:bg-[#1a1a1a]"
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.title}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-[#1f1f1f]">
        <button className="w-full flex items-center px-4 py-3 rounded-lg transition-colors text-sm font-medium text-zinc-400 hover:text-white hover:bg-[#1a1a1a]">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
