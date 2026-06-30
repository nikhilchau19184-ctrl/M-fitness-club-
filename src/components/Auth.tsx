import React, { useState } from 'react';
import { Lock, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthProps {
  onLogin: (role: string) => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const uname = username.toLowerCase();
    
    if (uname === 'admin' && password === 'admin123') {
      onLogin('Admin');
    } else if (uname === 'superadmin' && password === 'superadmin123') {
      onLogin('Super Admin');
    } else if (uname === 'member' && password === 'member123') {
      onLogin('Member');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 selection:bg-red-500/30 overflow-hidden relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm" />
      </div>

      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-transparent border-4 border-red-600 rounded-full mx-auto flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(220,38,38,0.2)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-600/10" />
            <span className="text-red-600 text-5xl font-black italic tracking-tighter pr-1">M</span>
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-black text-white tracking-tight uppercase"
          >
            M Fitness Club
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-zinc-400 mt-2"
          >
            Secure Gym Management Login
          </motion.p>
        </div>

        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle gradient border effect inside the card */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Username</label>
              <div className="relative group">
                <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative group">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all" 
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0, x: [-5, 5, -5, 5, 0] }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-red-500 text-sm font-medium text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-red-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider hover:bg-red-700 transition-colors shadow-md shadow-red-900/20"
            >
              Sign In
            </motion.button>
          </form>

          <div className="mt-6 text-center flex flex-col gap-1">
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">System Access Credentials</p>
            <p className="text-xs text-zinc-500">Super Admin: <span className="text-red-500 font-bold">superadmin</span> / <span className="text-zinc-300">superadmin123</span></p>
            <p className="text-xs text-zinc-500">Admin: <span className="text-red-500 font-bold">admin</span> / <span className="text-zinc-300">admin123</span></p>
            <p className="text-xs text-zinc-500">Member: <span className="text-red-500 font-bold">member</span> / <span className="text-zinc-300">member123</span></p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
