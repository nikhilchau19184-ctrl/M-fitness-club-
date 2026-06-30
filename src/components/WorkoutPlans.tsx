import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Dumbbell, User, Award, CheckCircle2, ChevronRight, Play } from 'lucide-react';

interface Exercise {
  name: string;
  muscleGroup: string;
  sets: number;
  reps: number;
  weight: string;
}

interface WorkoutPlan {
  id: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationWeeks: number;
  assignedTo: string;
  exercises: Exercise[];
}

const initialWorkoutPlans: WorkoutPlan[] = [
  {
    id: 'wp1',
    name: 'Push Day Power',
    difficulty: 'Intermediate',
    durationWeeks: 8,
    assignedTo: 'Amit Verma',
    exercises: [
      { name: 'Incline Dumbbell Bench Press', muscleGroup: 'Chest', sets: 4, reps: 10, weight: '24 kg' },
      { name: 'Overhead Shoulder Press', muscleGroup: 'Shoulders', sets: 3, reps: 12, weight: '15 kg' },
      { name: 'Tricep Rope Pushdowns', muscleGroup: 'Triceps', sets: 4, reps: 15, weight: '20 kg' }
    ]
  },
  {
    id: 'wp2',
    name: 'Yoga Stretch & Tone',
    difficulty: 'Beginner',
    durationWeeks: 4,
    assignedTo: 'Neha Sharma',
    exercises: [
      { name: 'Downward Dog Hold', muscleGroup: 'Full Body', sets: 3, reps: 1, weight: 'Bodyweight' },
      { name: 'Warrior II Pose', muscleGroup: 'Legs / Core', sets: 3, reps: 5, weight: 'Bodyweight' },
      { name: 'Cobra Stretch Flow', muscleGroup: 'Back', sets: 4, reps: 8, weight: 'Bodyweight' }
    ]
  }
];

export function WorkoutPlans() {
  const [plans, setPlans] = useState<WorkoutPlan[]>(() => {
    const saved = localStorage.getItem('fc_workouts');
    return saved ? JSON.parse(saved) : initialWorkoutPlans;
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activePlanId, setActivePlanId] = useState<string | null>(plans[0]?.id || null);

  // New Workout Form States
  const [planName, setPlanName] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [duration, setDuration] = useState(4);
  const [assignee, setAssignee] = useState('Amit Verma');

  // Exercise builder sub-form state
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exName, setExName] = useState('');
  const [exMuscle, setExMuscle] = useState('Chest');
  const [exSets, setExSets] = useState(3);
  const [exReps, setExReps] = useState(10);
  const [exWeight, setExWeight] = useState('Bodyweight');

  useEffect(() => {
    localStorage.setItem('fc_workouts', JSON.stringify(plans));
  }, [plans]);

  const addExerciseToDraft = () => {
    if (!exName.trim()) return;
    const newEx: Exercise = {
      name: exName,
      muscleGroup: exMuscle,
      sets: exSets,
      reps: exReps,
      weight: exWeight
    };
    setExercises(prev => [...prev, newEx]);
    setExName('');
    setExWeight('Bodyweight');
  };

  const removeExerciseFromDraft = (index: number) => {
    setExercises(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!planName.trim() || exercises.length === 0) return;

    const newPlan: WorkoutPlan = {
      id: 'wp_' + Date.now(),
      name: planName,
      difficulty,
      durationWeeks: duration,
      assignedTo: assignee,
      exercises
    };

    setPlans(prev => [newPlan, ...prev]);
    setActivePlanId(newPlan.id);
    setShowCreateModal(false);

    // Reset Form
    setPlanName('');
    setExercises([]);
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
          <h1 className="text-2xl font-black text-white tracking-tight">Workout Plans</h1>
          <p className="text-sm text-zinc-400">Design custom workout programs and assign them to members.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-red-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-red-900/10"
        >
          <Plus className="w-4 h-4" /> Create Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Plans Sidebar/List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-5">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Active Programs</h3>
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
                      <User className="w-3 h-3" />
                      <span>{p.assignedTo}</span>
                      <span>•</span>
                      <span>{p.exercises.length} Exercises</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              ))}
              {plans.length === 0 && (
                <p className="text-zinc-500 text-xs text-center py-4">No programs created yet.</p>
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
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-zinc-400">
                    <span className="flex items-center gap-1 bg-[#1a1a1a] border border-[#2a2a2a] px-2.5 py-1 rounded-lg">
                      <Award className="w-3.5 h-3.5 text-red-500" /> {activePlan.difficulty}
                    </span>
                    <span className="bg-[#1a1a1a] border border-[#2a2a2a] px-2.5 py-1 rounded-lg">
                      Duration: {activePlan.durationWeeks} Weeks
                    </span>
                    <span className="bg-[#1a1a1a] border border-[#2a2a2a] px-2.5 py-1 rounded-lg text-red-500">
                      Assigned to: {activePlan.assignedTo}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeletePlan(activePlan.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#2a2a2a] bg-[#1a1a1a] hover:bg-red-500/10 hover:border-red-500/30 text-zinc-400 hover:text-red-500 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all self-start sm:self-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Plan
                </button>
              </div>

              <div>
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-red-500" /> Exercises Routine
                </h3>
                <div className="space-y-3">
                  {activePlan.exercises.map((ex, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#1a1a1a] border border-[#222] hover:border-red-500/20 transition-all">
                      <div>
                        <h4 className="font-semibold text-white text-sm">{ex.name}</h4>
                        <p className="text-xs text-zinc-500 mt-0.5">Muscle Target: <span className="text-red-500">{ex.muscleGroup}</span></p>
                      </div>
                      <div className="flex items-center gap-6 mt-3 sm:mt-0 font-mono text-xs">
                        <div>
                          <span className="text-zinc-500 uppercase block text-[10px] tracking-wider mb-0.5">Sets</span>
                          <span className="text-white font-bold">{ex.sets}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 uppercase block text-[10px] tracking-wider mb-0.5">Reps</span>
                          <span className="text-white font-bold">{ex.reps}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 uppercase block text-[10px] tracking-wider mb-0.5">Weight</span>
                          <span className="text-red-500 font-bold">{ex.weight}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl p-12 text-center text-zinc-500 text-sm">
              No workout programs created yet. Click "Create Plan" to design your first custom workout!
            </div>
          )}
        </div>
      </div>

      {/* Plan Creator Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-[#1f1f1f] rounded-3xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto custom-scrollbar relative shadow-2xl">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Create Workout Program</h3>
            
            <form onSubmit={handleCreatePlan} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Program Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Legs Hypertrophy"
                    value={planName}
                    onChange={e => setPlanName(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-zinc-600" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Assign to Member</label>
                  <select 
                    value={assignee}
                    onChange={e => setAssignee(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    <option value="Amit Verma">Amit Verma</option>
                    <option value="Neha Sharma">Neha Sharma</option>
                    <option value="Rahul Singh">Rahul Singh</option>
                    <option value="Pooja Mehta">Pooja Mehta</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Difficulty</label>
                  <select 
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value as any)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">Duration (Weeks)</label>
                  <input 
                    type="number" 
                    min={1} 
                    max={24}
                    value={duration}
                    onChange={e => setDuration(parseInt(e.target.value) || 4)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                  />
                </div>
              </div>

              {/* Exercises Builder Section */}
              <div className="border-t border-[#1f1f1f] pt-4">
                <h4 className="text-sm font-bold text-white mb-3">Build Exercise Routine ({exercises.length} Added)</h4>
                
                {/* List of Added Draft Exercises */}
                {exercises.length > 0 && (
                  <div className="space-y-2 mb-4 bg-[#1a1a1a] p-3 rounded-2xl border border-[#252525]">
                    {exercises.map((ex, i) => (
                      <div key={i} className="flex items-center justify-between text-xs text-zinc-300 py-1.5 border-b border-[#2a2a2a] last:border-0">
                        <div>
                          <span className="font-bold text-white">{ex.name}</span>
                          <span className="text-zinc-500 ml-1">({ex.muscleGroup})</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span>{ex.sets}x{ex.reps} @ {ex.weight}</span>
                          <button 
                            type="button" 
                            onClick={() => removeExerciseFromDraft(i)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inline exercise inputs */}
                <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-[#252525] grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Exercise Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Barbell Bench Press" 
                      value={exName}
                      onChange={e => setExName(e.target.value)}
                      className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-zinc-700" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Target Muscle</label>
                    <select 
                      value={exMuscle}
                      onChange={e => setExMuscle(e.target.value)}
                      className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                      <option value="Chest">Chest</option>
                      <option value="Back">Back</option>
                      <option value="Shoulders">Shoulders</option>
                      <option value="Legs">Legs</option>
                      <option value="Arms">Arms</option>
                      <option value="Core">Core</option>
                      <option value="Full Body">Full Body</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Sets</label>
                    <input 
                      type="number" 
                      min={1} 
                      max={10}
                      value={exSets}
                      onChange={e => setExSets(parseInt(e.target.value) || 3)}
                      className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Reps</label>
                    <input 
                      type="number" 
                      min={1} 
                      max={50}
                      value={exReps}
                      onChange={e => setExReps(parseInt(e.target.value) || 10)}
                      className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Weight Load</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 50 kg or Bodyweight" 
                      value={exWeight}
                      onChange={e => setExWeight(e.target.value)}
                      className="w-full bg-[#141414] border border-[#2a2a2a] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-zinc-700" 
                    />
                  </div>
                  <div className="sm:col-span-3 flex justify-end">
                    <button 
                      type="button"
                      onClick={addExerciseToDraft}
                      className="bg-zinc-800 text-zinc-200 hover:text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors"
                    >
                      + Add Exercise
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1f1f1f] flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-zinc-800 text-zinc-300 hover:text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={exercises.length === 0}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Save program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
