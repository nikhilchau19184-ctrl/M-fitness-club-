import React from 'react';
import { Check, Plus } from 'lucide-react';

const plans = [
  { name: 'Silver', price: '₹1,500', period: '/month', features: ['Gym Access', 'Locker Room', 'Standard Equipment'], popular: false },
  { name: 'Gold', price: '₹2,500', period: '/month', features: ['Gym Access', 'Locker Room', 'Group Classes', '1 PT Session'], popular: true },
  { name: 'Platinum', price: '₹4,000', period: '/month', features: ['24/7 Access', 'Unlimited Classes', '4 PT Sessions', 'Diet Plan', 'Sauna'], popular: false },
];

export function Subscriptions() {
  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Subscriptions</h1>
          <p className="text-sm text-zinc-400">Manage membership plans and billing.</p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
        {plans.map((plan, i) => (
          <div key={i} className={`bg-[#141414] rounded-3xl border ${plan.popular ? 'border-red-500 shadow-lg shadow-red-500/10' : 'border-[#1f1f1f] shadow-sm'} p-8 flex flex-col relative`}>
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-black text-white tracking-tight uppercase">{plan.name}</h3>
            <div className="mt-4 mb-8">
              <span className="text-4xl font-black text-white tracking-tight">{plan.price}</span>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{plan.period}</span>
            </div>
            
            <ul className="space-y-4 flex-1">
              {plan.features.map((feat, j) => (
                <li key={j} className="flex items-center gap-3 text-sm font-semibold text-zinc-400">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-red-500/10 text-red-500' : 'bg-zinc-800 text-zinc-400'}`}>
                    <Check className="w-3 h-3" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>

            <button className={`w-full mt-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              plan.popular ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-[#1a1a1a] text-white border border-[#2a2a2a] hover:bg-[#2a2a2a]'
            }`}>
              Edit Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
