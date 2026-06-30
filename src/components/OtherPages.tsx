import React, { useState, useEffect } from 'react';
import { QrCode, ClipboardList, Activity, Apple, BarChart2, Bell, Check, Trash2, Send, Clock, UserCheck, AlertTriangle } from 'lucide-react';

interface AttendanceLog {
  id: string;
  memberName: string;
  memberEmail: string;
  scanTime: string;
  status: 'Granted' | 'Access Denied';
  reason?: string;
}

const initialScans: AttendanceLog[] = [
  { id: 'att1', memberName: 'Amit Verma', memberEmail: 'amit@gmail.com', scanTime: '2026-06-25 08:15 AM', status: 'Granted' },
  { id: 'att2', memberName: 'Neha Sharma', memberEmail: 'neha@gmail.com', scanTime: '2026-06-25 09:02 AM', status: 'Granted' },
  { id: 'att3', memberName: 'Rahul Singh', memberEmail: 'rahul@gmail.com', scanTime: '2026-06-25 10:11 AM', status: 'Access Denied', reason: 'Membership Expired/Inactive' },
];

export function Attendance() {
  const [logs, setLogs] = useState<AttendanceLog[]>(() => {
    const saved = localStorage.getItem('fc_attendance_logs');
    return saved ? JSON.parse(saved) : initialScans;
  });

  const [showScannerModal, setShowScannerModal] = useState(false);
  const [selectedScanMember, setSelectedScanMember] = useState('Amit Verma');

  useEffect(() => {
    localStorage.setItem('fc_attendance_logs', JSON.stringify(logs));
  }, [logs]);

  const handleSimulateScan = () => {
    const memberEmails: Record<string, string> = {
      'Amit Verma': 'amit@gmail.com',
      'Neha Sharma': 'neha@gmail.com',
      'Rahul Singh': 'rahul@gmail.com',
      'Pooja Mehta': 'pooja@gmail.com'
    };

    const memberStatus: Record<string, 'Granted' | 'Access Denied'> = {
      'Amit Verma': 'Granted',
      'Neha Sharma': 'Granted',
      'Rahul Singh': 'Access Denied', // Inactive in our db
      'Pooja Mehta': 'Granted'
    };

    const now = new Date();
    const timeString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newLog: AttendanceLog = {
      id: 'log_' + Date.now(),
      memberName: selectedScanMember,
      memberEmail: memberEmails[selectedScanMember] || 'member@gmail.com',
      scanTime: timeString,
      status: memberStatus[selectedScanMember] || 'Granted',
      reason: memberStatus[selectedScanMember] === 'Access Denied' ? 'Membership Expired/Inactive' : undefined
    };

    setLogs(prev => [newLog, ...prev]);
    setShowScannerModal(false);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-5 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Attendance Logging</h1>
          <p className="text-sm text-zinc-400">QR scan verification flow and dynamic entrance logs.</p>
        </div>
        {logs.length > 0 && (
          <button 
            onClick={clearLogs}
            className="px-3 py-1.5 border border-[#2a2a2a] hover:border-red-500/30 text-zinc-400 hover:text-red-500 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Clear History
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[400px]">
        {/* Interactive QR Simulation Card */}
        <div className="lg:col-span-5 bg-[#141414] rounded-3xl border border-[#1f1f1f] p-8 shadow-sm flex flex-col items-center justify-center text-center">
          <div 
            onClick={() => setShowScannerModal(true)}
            className="w-64 h-64 bg-[#1a1a1a] rounded-3xl border-2 border-dashed border-[#2a2a2a] flex flex-col items-center justify-center mb-6 relative overflow-hidden group cursor-pointer hover:border-red-500/50 transition-all"
          >
            <QrCode className="w-20 h-20 text-zinc-500 group-hover:text-red-500 transition-colors duration-300" />
            <p className="mt-4 text-xs font-bold text-zinc-500 uppercase tracking-wider group-hover:text-white transition-colors">Click to Simulate Scan</p>
            <div className="absolute top-0 w-full h-1 bg-red-500/50 blur-sm transform -translate-y-full group-hover:translate-y-[256px] transition-transform duration-1000 ease-linear repeat-infinite"></div>
          </div>
          <h3 className="text-lg font-bold text-white">Scan Member QR Code</h3>
          <p className="text-sm text-zinc-400 mt-2 max-w-xs">Simulate a member scanning their personal application barcode to trigger entrance logs.</p>
        </div>

        {/* Real-time Entrance Logs */}
        <div className="lg:col-span-7 bg-[#141414] rounded-3xl border border-[#1f1f1f] p-6 shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-white mb-4 tracking-tight flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-red-500" /> Entrance Scan Logs ({logs.length})
          </h3>

          <div className="flex-1 overflow-y-auto max-h-[400px] space-y-3 pr-2 custom-scrollbar">
            {logs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-500 text-sm border border-dashed border-[#2a2a2a] rounded-2xl bg-[#1a1a1a] py-20">
                No active entrance logs recorded today.
              </div>
            ) : (
              logs.map(log => (
                <div key={log.id} className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#222] rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${log.status === 'Granted' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{log.memberName}</h4>
                      <p className="text-[10px] text-zinc-500 flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-600" /> {log.scanTime}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      log.status === 'Granted' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {log.status}
                    </span>
                    {log.reason && (
                      <p className="text-[10px] text-red-400 mt-1 italic">{log.reason}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Simulator Modal */}
      {showScannerModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl w-full max-w-sm p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowScannerModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Simulate QR Barcode Scan</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Select scanning Member</label>
                <select
                  value={selectedScanMember}
                  onChange={e => setSelectedScanMember(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="Amit Verma">Amit Verma (Active - Platinum)</option>
                  <option value="Neha Sharma">Neha Sharma (Active - Gold)</option>
                  <option value="Rahul Singh">Rahul Singh (Inactive - Access Denied!)</option>
                  <option value="Pooja Mehta">Pooja Mehta (Active - Gold)</option>
                </select>
              </div>

              <button 
                onClick={handleSimulateScan}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all"
              >
                Trigger Scan Simulation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Highly Interactive Notifications System */
interface NotificationMsg {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'alert' | 'update' | 'message';
}

const initialNotifications: NotificationMsg[] = [
  { id: 'n1', title: 'New Booking Reservation', message: 'Neha Sharma requested to book Yoga Class tomorrow at 08:00 AM.', time: '10 min ago', read: false, type: 'message' },
  { id: 'n2', title: 'Attendance Alert', message: 'Rahul Singh tried to enter with an expired subscription. Access Denied.', time: '1 hour ago', read: false, type: 'alert' },
  { id: 'n3', title: 'System Backup Completed', message: 'Automated database synchronization completed successfully.', time: '4 hours ago', read: true, type: 'update' },
];

export function Notifications() {
  const [notifs, setNotifs] = useState<NotificationMsg[]>(() => {
    const saved = localStorage.getItem('fc_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');
  const [notifType, setNotifType] = useState<'alert' | 'update' | 'message'>('update');

  useEffect(() => {
    localStorage.setItem('fc_notifications', JSON.stringify(notifs));
  }, [notifs]);

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleMarkRead = (id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDelete = (id: string) => {
    setNotifs(prev => prev.filter(n => n.id !== id));
  };

  const handleSendNotif = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle.trim() || !notifMsg.trim()) return;

    const newNotif: NotificationMsg = {
      id: 'notif_' + Date.now(),
      title: notifTitle,
      message: notifMsg,
      time: 'Just now',
      read: false,
      type: notifType
    };

    setNotifs(prev => [newNotif, ...prev]);
    setNotifTitle('');
    setNotifMsg('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Notifications Broadcast</h1>
          <p className="text-sm text-zinc-400">Distribute broad updates, alerts, and private notices to all trainers and gym members.</p>
        </div>
        {notifs.some(n => !n.read) && (
          <button 
            onClick={markAllRead}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all self-start sm:self-auto"
          >
            Mark All Read
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Composer Section */}
        <div className="lg:col-span-5 bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Send className="w-4 h-4 text-red-500" /> Broadcast New Notification
          </h3>

          <form onSubmit={handleSendNotif} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Alert Subject</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Gym Holiday Announcement"
                value={notifTitle}
                onChange={e => setNotifTitle(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-zinc-700" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Notification Type</label>
              <select 
                value={notifType}
                onChange={e => setNotifType(e.target.value as any)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                <option value="update">Update / Event</option>
                <option value="alert">Critical Alert</option>
                <option value="message">Direct Message</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Notification Message</label>
              <textarea 
                required
                rows={3}
                placeholder="Compose the announcement details here..."
                value={notifMsg}
                onChange={e => setNotifMsg(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500 resize-none placeholder-zinc-700" 
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all shadow-md shadow-red-900/10 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Dispatch Alert
            </button>
          </form>
        </div>

        {/* Live Feed Section */}
        <div className="lg:col-span-7 bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-red-500" /> Active Alerts Feed ({notifs.length})
          </h3>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {notifs.length === 0 ? (
              <p className="text-zinc-500 text-xs text-center py-10">No alerts broadcasted yet.</p>
            ) : (
              notifs.map(n => (
                <div key={n.id} className={`p-4 rounded-2xl border transition-all ${
                  n.read 
                    ? 'bg-[#181818]/60 border-[#222] opacity-75' 
                    : 'bg-[#1a1a1a] border-red-500/15 shadow-sm'
                }`}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${n.read ? 'bg-zinc-600' : 'bg-red-500 animate-ping'}`}></div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-white text-sm leading-tight">{n.title}</h4>
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 uppercase rounded-md tracking-wider ${
                            n.type === 'alert' ? 'bg-red-500/10 text-red-500' : 
                            n.type === 'message' ? 'bg-blue-500/10 text-blue-500' : 
                            'bg-yellow-500/10 text-yellow-500'
                          }`}>
                            {n.type}
                          </span>
                        </div>
                        <p className="text-zinc-400 text-xs mt-1 leading-relaxed">{n.message}</p>
                        <span className="text-[9px] text-zinc-600 font-semibold block mt-2">{n.time}</span>
                      </div>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      {!n.read && (
                        <button 
                          onClick={() => handleMarkRead(n.id)}
                          className="p-1 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors"
                          title="Mark Read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(n.id)}
                        className="p-1 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Alert"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

export const PlaceholderPage = ({ title, icon: Icon, description }: any) => (
  <div className="p-6 max-w-7xl mx-auto flex flex-col gap-5 h-full">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">{title}</h1>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>
    </div>
    <div className="flex-1 bg-[#141414] rounded-3xl border border-[#1f1f1f] p-12 shadow-sm flex flex-col items-center justify-center text-center min-h-[400px]">
      <div className="w-24 h-24 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6 text-red-500 shadow-sm border border-red-500/20">
        <Icon className="w-12 h-12" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{title} Module</h3>
      <p className="text-sm text-zinc-400 max-w-md">This feature is currently under development. Check back soon for updates to the {title.toLowerCase()} system.</p>
    </div>
  </div>
);
