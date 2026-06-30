import React, { useState } from 'react';
import { Menu, Search, Bell, ChevronDown, MonitorPlay, LogOut } from 'lucide-react';

interface HeaderProps {
  title: string;
  onLogout?: () => void;
  onKioskMode?: () => void;
  userRole?: string;
}

export function Header({ title, onLogout, onKioskMode, userRole = 'Admin User' }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="h-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1f1f1f] flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
      <div className="flex items-center">
        <button className="md:hidden text-zinc-400 hover:text-white mr-4">
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold text-white hidden sm:block">{title}</h2>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative hidden md:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-[#1a1a1a] text-white pl-10 pr-4 py-2 rounded-full border border-[#2a2a2a] focus:outline-none focus:border-red-500 w-64 transition-colors"
          />
        </div>

        <button className="relative text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0a0a0a]"></span>
        </button>

        <div className="relative">
          <div 
            className="flex items-center space-x-3 cursor-pointer pl-4 border-l border-[#1f1f1f]"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img 
              src={`https://ui-avatars.com/api/?name=${userRole.replace(' ', '+')}&background=random`} 
              alt={userRole} 
              className="w-10 h-10 rounded-full"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white leading-tight">{userRole}</p>
              <p className="text-xs text-zinc-400">{userRole.toLowerCase().replace(' ', '')}@fitnessclub.com</p>
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          </div>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#141414] border border-[#1f1f1f] rounded-xl shadow-xl overflow-hidden py-1">
              <button 
                onClick={() => { setShowDropdown(false); onKioskMode?.(); }}
                className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-[#1a1a1a] transition-colors flex items-center gap-2"
              >
                <MonitorPlay className="w-4 h-4" /> Launch Kiosk Mode
              </button>
              <button 
                onClick={() => { setShowDropdown(false); onLogout?.(); }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:text-red-400 hover:bg-[#1a1a1a] transition-colors flex items-center gap-2 border-t border-[#1f1f1f] mt-1 pt-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
