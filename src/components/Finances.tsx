import React, { useState } from 'react';
import { DollarSign, Wallet, FileText, ArrowUpRight, ArrowDownRight, CreditCard, Landmark, Check } from 'lucide-react';

export function Finances() {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Expenses' | 'Payroll'>('Overview');

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Finances & Payroll</h1>
          <p className="text-sm text-zinc-400">Manage expenses, track collections, and handle staff salary processing.</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-[#1f1f1f] pb-4">
        {(['Overview', 'Expenses', 'Payroll'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === tab 
                ? 'bg-red-600 text-white shadow-md shadow-red-900/10' 
                : 'bg-[#141414] border border-[#1f1f1f] text-zinc-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Collections</span>
                <div className="p-2 bg-green-500/10 rounded-xl">
                  <ArrowUpRight className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <h4 className="text-3xl font-mono font-black text-white mt-4">₹4,20,500</h4>
              <p className="text-[10px] text-zinc-400 font-semibold mt-2">Current Month (June)</p>
            </div>

            <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Expenses</span>
                <div className="p-2 bg-red-500/10 rounded-xl">
                  <ArrowDownRight className="w-5 h-5 text-red-500" />
                </div>
              </div>
              <h4 className="text-3xl font-mono font-black text-white mt-4">₹1,15,200</h4>
              <p className="text-[10px] text-zinc-400 font-semibold mt-2">Includes Payroll & Utilities</p>
            </div>

            <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 shadow-sm border-l-4 border-l-red-600">
              <div className="flex justify-between items-start">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Net Profit / Loss</span>
                <div className="p-2 bg-blue-500/10 rounded-xl">
                  <Landmark className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <h4 className="text-3xl font-mono font-black text-green-500 mt-4">+₹3,05,300</h4>
              <p className="text-[10px] text-zinc-400 font-semibold mt-2">Estimated Gross Profit</p>
            </div>
          </div>
          
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-8 text-center text-zinc-500 text-sm">
            Profit and Loss Charting & Detailed Ledger integrations are available in the Reports section.
          </div>
        </div>
      )}

      {activeTab === 'Expenses' && (
        <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white tracking-tight">Recent Expenses Tracking</h3>
            <button className="bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-zinc-700 transition-colors">
              + Add Expense
            </button>
          </div>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2a2a2a] text-xs font-bold text-zinc-500 uppercase tracking-wider">
                <th className="pb-3 px-3">Date</th>
                <th className="pb-3 px-3">Category</th>
                <th className="pb-3 px-3">Description</th>
                <th className="pb-3 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="py-10 text-center text-zinc-500 text-sm">
                  No expenses recorded.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Payroll' && (
        <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white tracking-tight">Staff Salary Management</h3>
            <span className="text-xs text-zinc-500">Pay Cycle: June 2026</span>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2a2a2a] text-xs font-bold text-zinc-500 uppercase tracking-wider">
                <th className="pb-3 px-3">Staff Member</th>
                <th className="pb-3 px-3">Role</th>
                <th className="pb-3 px-3 text-right">Base Salary</th>
                <th className="pb-3 px-3 text-right">PT Incentives</th>
                <th className="pb-3 px-3 text-right">Total Payout</th>
                <th className="pb-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="py-10 text-center text-zinc-500 text-sm">
                  No staff payroll recorded.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
