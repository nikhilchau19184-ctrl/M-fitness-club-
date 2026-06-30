import React, { useState, useEffect } from 'react';
import { Save, Shield, Bell, HelpCircle, Building2, ToggleLeft, ToggleRight, CheckCircle2 } from 'lucide-react';

interface ClubSettings {
  clubName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  currency: string;
  address: string;
  taxRate: number;
  sessionDuration: number;
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
}

const defaultSettings: ClubSettings = {
  clubName: 'FITNESS CLUB',
  tagline: 'UNISEX',
  contactEmail: 'admin@fitnessclub.com',
  contactPhone: '+91 9876543210',
  currency: 'INR (₹)',
  address: 'Plot No. 42, Sector-5, Gurugram, Haryana, India',
  taxRate: 18,
  sessionDuration: 60,
  emailAlerts: true,
  smsAlerts: false,
  pushNotifications: true
};

export function Settings() {
  const [settings, setSettings] = useState<ClubSettings>(() => {
    const saved = localStorage.getItem('fc_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('fc_settings', JSON.stringify(settings));
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  const toggle = (key: 'emailAlerts' | 'smsAlerts' | 'pushNotifications') => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-[#1f1f1f] pb-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">System Settings</h1>
          <p className="text-sm text-zinc-400">Configure global profile metadata, notification pipelines, and financial parameters.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {savedSuccess && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-xl flex items-center gap-3 text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Configuration changes committed to Local Storage successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section: Club Profile Info */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-red-500" /> Club Profile
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">Customize your public branding assets, primary currency, and physical facility address details.</p>
          </div>

          <div className="lg:col-span-2 bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Gym Club Name</label>
                <input 
                  type="text" 
                  value={settings.clubName}
                  onChange={e => setSettings({ ...settings, clubName: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Club Subtitle / Tagline</label>
                <input 
                  type="text" 
                  value={settings.tagline}
                  onChange={e => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Contact Email</label>
                <input 
                  type="email" 
                  value={settings.contactEmail}
                  onChange={e => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Phone Number</label>
                <input 
                  type="text" 
                  value={settings.contactPhone}
                  onChange={e => setSettings({ ...settings, contactPhone: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Physical Facility Address</label>
              <textarea 
                rows={2}
                value={settings.address}
                onChange={e => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500 resize-none" 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border-t border-[#1f1f1f] pt-6">
          {/* Section: Financial Parameters */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-500" /> Defaults & Financials
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">Regulate default class length constants, local Goods & Services (GST/Tax) rates, and monetary currency units.</p>
          </div>

          <div className="lg:col-span-2 bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Local Currency</label>
                <select 
                  value={settings.currency}
                  onChange={e => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="INR (₹)">INR (₹)</option>
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                  <option value="GBP (£)">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Tax Rate (%)</label>
                <input 
                  type="number" 
                  value={settings.taxRate}
                  onChange={e => setSettings({ ...settings, taxRate: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Session Length (Min)</label>
                <input 
                  type="number" 
                  value={settings.sessionDuration}
                  onChange={e => setSettings({ ...settings, sessionDuration: parseInt(e.target.value) || 60 })}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border-t border-[#1f1f1f] pt-6">
          {/* Section: Alert Channels */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Bell className="w-4 h-4 text-red-500" /> Notifications Channels
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">Toggle automated email summaries, real-time push notes, or direct SMS pipelines for your trainers and active members.</p>
          </div>

          <div className="lg:col-span-2 bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-[#1f1f1f] last:border-0">
                <div>
                  <h4 className="text-xs font-semibold text-white">Automated Email Receipts</h4>
                  <p className="text-[10px] text-zinc-500">Dispatch transaction receipts and billing notices directly to member emails.</p>
                </div>
                <button type="button" onClick={() => toggle('emailAlerts')} className="text-red-500">
                  {settings.emailAlerts ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-zinc-600" />}
                </button>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-[#1f1f1f] last:border-0">
                <div>
                  <h4 className="text-xs font-semibold text-white">SMS Booking Confirmations</h4>
                  <p className="text-[10px] text-zinc-500">Send direct SMS alerts upon class reservation approvals and schedule updates.</p>
                </div>
                <button type="button" onClick={() => toggle('smsAlerts')} className="text-red-500">
                  {settings.smsAlerts ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-zinc-600" />}
                </button>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-[#1f1f1f] last:border-0">
                <div>
                  <h4 className="text-xs font-semibold text-white">In-App Push Feed</h4>
                  <p className="text-[10px] text-zinc-500">Display workout updates, trainers recommendations, and check-in alarms.</p>
                </div>
                <button type="button" onClick={() => toggle('pushNotifications')} className="text-red-500">
                  {settings.pushNotifications ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-zinc-600" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-[#1f1f1f]">
          <button 
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-red-900/15"
          >
            <Save className="w-4 h-4" /> Save System Settings
          </button>
        </div>
      </form>
    </div>
  );
}
