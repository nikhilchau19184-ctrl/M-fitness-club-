import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Apple, Flame, Award, ChevronRight, Check } from 'lucide-react';
import { getMembers } from '../lib/db';

interface Meal {
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DietPlan {
  id: string;
  name: string;
  goal: string;
  assigneeId: string;
  assignedTo: string;
  targetKcal: number;
  targetProtein: number;
  targetCarbs: number;
  targetFat: number;
  meals: Meal[];
}

export function Nutrition() {
  const [plans, setPlans] = useState<DietPlan[]>(() => {
    const saved = localStorage.getItem('fc_nutrition');
    return saved ? JSON.parse(saved) : [];
  });

  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    getMembers().then(setMembers);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [activePlanId, setActivePlanId] = useState<string | null>(plans[0]?.id || null);

  // Form States
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('Muscle Growth');
  const [assigneeId, setAssigneeId] = useState('');
  const [targetKcal, setTargetKcal] = useState(2000);
  const [targetProtein, setTargetProtein] = useState(140);
  const [targetCarbs, setTargetCarbs] = useState(200);
  const [targetFat, setTargetFat] = useState(60);

  // Meal states inside form
  const [meals, setMeals] = useState<Meal[]>([]);
  const [mType, setMType] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'>('Breakfast');
  const [mFood, setMFood] = useState('');
  const [mKcal, setMKcal] = useState(300);
  const [mPro, setMPro] = useState(20);
  const [mCarb, setMCarb] = useState(30);
  const [mFat, setMFat] = useState(8);

  useEffect(() => {
    localStorage.setItem('fc_nutrition', JSON.stringify(plans));
  }, [plans]);

  const addMealToDraft = () => {
    if (!mFood.trim()) return;
    const newMeal: Meal = {
      type: mType,
      food: mFood,
      calories: mKcal,
      protein: mPro,
      carbs: mCarb,
      fat: mFat
    };
    setMeals(prev => [...prev, newMeal]);
    setMFood('');
    setMKcal(300);
    setMPro(20);
    setMCarb(30);
    setMFat(8);
  };

  const removeMealFromDraft = (idx: number) => {
    setMeals(prev => prev.filter((_, i) => i !== idx));
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || meals.length === 0) return;

    const member = members.find(m => m.id === assigneeId);
    if (!member) return;

    const newPlan: DietPlan = {
      id: 'dp_' + Date.now(),
      name,
      goal,
      assigneeId: member.id,
      assignedTo: member.fullName || member.name,
      targetKcal,
      targetProtein,
      targetCarbs,
      targetFat,
      meals
    };

    setPlans(prev => [newPlan, ...prev]);
    setActivePlanId(newPlan.id);
    setShowModal(false);

    // Reset Form
    setName('');
    setMeals([]);
  };

  const handleDeletePlan = (id: string) => {
    const updated = plans.filter(p => p.id !== id);
    setPlans(updated);
    if (activePlanId === id) {
      setActivePlanId(updated[0]?.id || null);
    }
  };

  const activePlan = plans.find(p => p.id === activePlanId);

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Nutrition & Diet Planner</h1>
          <p className="text-sm text-zinc-400">Design daily macro targets and complete diet logs for your members.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-red-900/10"
        >
          <Plus className="w-4 h-4" /> New Diet Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Plans Navigation */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-5">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Diet Architectures</h3>
            <div className="space-y-2">
              {plans.map(p => (
                <button
                  key={p.id}
                  onClick={() => setActivePlanId(p.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    activePlanId === p.id 
                      ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-900/20' 
                      : 'bg-[#1a1a1a] border-[#252525] text-zinc-400 hover:text-white hover:bg-[#202020]'
                  }`}
                >
                  <div>
                    <h4 className="font-semibold text-sm leading-tight text-white mb-1">{p.name}</h4>
                    <div className="flex items-center gap-2 text-xs opacity-80">
                      <Flame className="w-3.5 h-3.5 text-red-300" />
                      <span>{p.targetKcal} kcal</span>
                      <span>•</span>
                      <span className="truncate">{p.assignedTo}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              ))}
              {plans.length === 0 && (
                <p className="text-zinc-500 text-xs text-center py-4">No diet plans created yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Selected Plan Details */}
        <div className="lg:col-span-8">
          {activePlan ? (
            <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-6 lg:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f1f1f] pb-6">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">{activePlan.name}</h2>
                  <p className="text-xs text-red-500 mt-1 font-semibold uppercase tracking-wider">Goal: {activePlan.goal}</p>
                  <p className="text-xs text-zinc-400 mt-1">Assigned to: <span className="text-white font-medium">{activePlan.assignedTo}</span></p>
                </div>
                <button
                  onClick={() => handleDeletePlan(activePlan.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#2a2a2a] bg-[#1a1a1a] hover:bg-red-500/10 hover:border-red-500/30 text-zinc-400 hover:text-red-500 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all self-start sm:self-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Plan
                </button>
              </div>

              {/* Macro Dashboard Panel */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#1a1a1a] border border-[#222] rounded-2xl p-4 text-center">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Calories Target</span>
                  <span className="text-2xl font-mono font-black text-white block mt-1">{activePlan.targetKcal}</span>
                  <span className="text-[10px] text-zinc-400 font-semibold">kcal / day</span>
                </div>
                <div className="bg-[#1a1a1a] border border-[#222] rounded-2xl p-4 text-center">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Protein Goal</span>
                  <span className="text-2xl font-mono font-black text-red-500 block mt-1">{activePlan.targetProtein}g</span>
                  <span className="text-[10px] text-zinc-400 font-semibold">4 kcal/g</span>
                </div>
                <div className="bg-[#1a1a1a] border border-[#222] rounded-2xl p-4 text-center">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Carbs Limit</span>
                  <span className="text-2xl font-mono font-black text-yellow-500 block mt-1">{activePlan.targetCarbs}g</span>
                  <span className="text-[10px] text-zinc-400 font-semibold">4 kcal/g</span>
                </div>
                <div className="bg-[#1a1a1a] border border-[#222] rounded-2xl p-4 text-center">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Fat Ceiling</span>
                  <span className="text-2xl font-mono font-black text-green-500 block mt-1">{activePlan.targetFat}g</span>
                  <span className="text-[10px] text-zinc-400 font-semibold">9 kcal/g</span>
                </div>
              </div>

              {/* Meals Schedule */}
              <div>
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Apple className="w-4 h-4 text-red-500" /> Meal Breakdown Logs
                </h3>
                <div className="space-y-4">
                  {activePlan.meals.map((meal, index) => (
                    <div key={index} className="bg-[#1a1a1a] border border-[#222] rounded-2xl p-5 hover:border-red-500/15 transition-all">
                      <div className="flex justify-between items-start gap-4 flex-col sm:flex-row">
                        <div>
                          <span className="px-2.5 py-0.5 bg-red-600/10 text-red-500 text-[10px] font-bold uppercase rounded-full tracking-wider">
                            {meal.type}
                          </span>
                          <p className="text-white text-sm font-semibold mt-2 leading-relaxed">{meal.food}</p>
                        </div>
                        <div className="flex gap-4 font-mono text-xs bg-[#121212] px-4 py-2 rounded-xl border border-[#2a2a2a] self-start sm:self-auto shrink-0">
                          <div>
                            <span className="text-[10px] text-zinc-500 block">Kcal</span>
                            <span className="text-white font-bold">{meal.calories}</span>
                          </div>
                          <div className="border-l border-[#2a2a2a] pl-3">
                            <span className="text-[10px] text-zinc-500 block">P</span>
                            <span className="text-red-500 font-bold">{meal.protein}g</span>
                          </div>
                          <div className="border-l border-[#2a2a2a] pl-3">
                            <span className="text-[10px] text-zinc-500 block">C</span>
                            <span className="text-yellow-500 font-bold">{meal.carbs}g</span>
                          </div>
                          <div className="border-l border-[#2a2a2a] pl-3">
                            <span className="text-[10px] text-zinc-500 block">F</span>
                            <span className="text-green-500 font-bold">{meal.fat}g</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-12 text-center text-zinc-500 text-sm">
              No diet plans configured yet. Click "New Diet Plan" to setup daily target macros and nutrition templates!
            </div>
          )}
        </div>
      </div>

      {/* Diet Plan Creator Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto custom-scrollbar relative shadow-2xl">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Design Customized Diet Plan</h3>
            
            <form onSubmit={handleCreatePlan} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Diet Plan Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Clean Lean Bulking"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-zinc-700" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Goal Option</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Cut & Shred"
                    value={goal}
                    onChange={e => setGoal(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-zinc-700" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Assign to Member</label>
                  <select 
                    value={assigneeId}
                    onChange={e => setAssigneeId(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    <option value="">-- Select Member --</option>
                    {members.map(m => (
                      <option key={m.id} value={m.id}>{m.fullName || m.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Daily Kcal</label>
                  <input 
                    type="number" 
                    value={targetKcal}
                    onChange={e => setTargetKcal(parseInt(e.target.value) || 2000)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Protein (g)</label>
                  <input 
                    type="number" 
                    value={targetProtein}
                    onChange={e => setTargetProtein(parseInt(e.target.value) || 120)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Carbs (g)</label>
                  <input 
                    type="number" 
                    value={targetCarbs}
                    onChange={e => setTargetCarbs(parseInt(e.target.value) || 180)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                  />
                </div>
              </div>

              {/* Add Meals sub-routine */}
              <div className="border-t border-[#1f1f1f] pt-4">
                <h4 className="text-sm font-bold text-white mb-3">Compose Daily Meals ({meals.length} Added)</h4>

                {meals.length > 0 && (
                  <div className="space-y-2 mb-4 bg-[#1a1a1a] p-3 rounded-2xl border border-[#252525]">
                    {meals.map((meal, index) => (
                      <div key={index} className="flex items-center justify-between text-xs text-zinc-300 py-2 border-b border-[#2a2a2a] last:border-0">
                        <div>
                          <span className="px-2 py-0.5 bg-red-600/10 text-red-500 font-mono text-[9px] uppercase rounded-full mr-2">{meal.type}</span>
                          <span className="font-medium text-white">{meal.food}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 font-mono">
                          <span>{meal.calories} kcal (P: {meal.protein}g C: {meal.carbs}g F: {meal.fat}g)</span>
                          <button 
                            type="button" 
                            onClick={() => removeMealFromDraft(index)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-[#252525] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Meal Period</label>
                      <select 
                        value={mType}
                        onChange={e => setMType(e.target.value as any)}
                        className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                      >
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snacks">Snacks</option>
                      </select>
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Food Items & Portions</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 150g Grilled Chicken breast, Avocado salad" 
                        value={mFood}
                        onChange={e => setMFood(e.target.value)}
                        className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-zinc-700" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Calories (kcal)</label>
                      <input 
                        type="number" 
                        value={mKcal}
                        onChange={e => setMKcal(parseInt(e.target.value) || 300)}
                        className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Protein (g)</label>
                      <input 
                        type="number" 
                        value={mPro}
                        onChange={e => setMPro(parseInt(e.target.value) || 20)}
                        className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Carbs (g)</label>
                      <input 
                        type="number" 
                        value={mCarb}
                        onChange={e => setMCarb(parseInt(e.target.value) || 30)}
                        className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Fat (g)</label>
                      <input 
                        type="number" 
                        value={mFat}
                        onChange={e => setMFat(parseInt(e.target.value) || 8)}
                        className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button 
                      type="button"
                      onClick={addMealToDraft}
                      className="bg-zinc-800 text-zinc-200 hover:text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors"
                    >
                      + Add Meal Period
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1f1f1f] flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-zinc-800 text-zinc-300 hover:text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={meals.length === 0}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Save Diet Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
