import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Target, Trash2, Edit2, Save, X } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  weight: number;
  target: string;
  actual: string;
}

export default function GoalSetting() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", title: "เพิ่มยอดขาย", description: "เพิ่มยอดขายรายเดือน 20%", weight: 40, target: "20%", actual: "15%" },
    { id: "2", title: "พัฒนาทักษะ", description: "เรียนคอร์สออนไลน์ 3 หลักสูตร", weight: 30, target: "3 courses", actual: "2 courses" },
    { id: "3", title: "โครงการใหม่", description: "เสร็จสิ้นโครงการ Q4", weight: 30, target: "100%", actual: "80%" },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({ title: "", description: "", weight: 0, target: "", actual: "" });

  const totalWeight = goals.reduce((sum, goal) => sum + goal.weight, 0);
  const isValid = totalWeight === 100;

  const handleAdd = () => {
    if (newGoal.title && newGoal.description && newGoal.weight && newGoal.target) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        weight: newGoal.weight || 0,
        target: newGoal.target,
        actual: newGoal.actual || "",
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: "", description: "", weight: 0, target: "", actual: "" });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleSave = (id: string) => {
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-app mb-2 font-display">
            Goal Setting
          </h1>
          <p className="text-muted font-light">
            กำหนดเป้าหมายและ KPIs สำหรับรอบประเมินนี้
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-ptt-blue hover:bg-ptt-blue/80 
                   text-app rounded-xl transition-all duration-200 font-semibold 
                   shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          เพิ่มเป้าหมาย
        </button>
      </div>

      {/* Weight Validation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-xl border-2 ${
          isValid 
            ? "bg-green-500/10 border-green-500/30 text-green-500" 
            : "bg-yellow-500/10 border-yellow-500/30 text-yellow-500"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium">Total Weight: {totalWeight}%</span>
          {isValid ? (
            <span className="text-sm">✓ Valid (Total = 100%)</span>
          ) : (
            <span className="text-sm">⚠ Must equal 100%</span>
          )}
        </div>
      </motion.div>

      {/* Add New Goal Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-app mb-2">ชื่อเป้าหมาย</label>
              <input
                type="text"
                value={newGoal.title || ""}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-xl text-app"
                placeholder="เช่น เพิ่มยอดขาย"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-app mb-2">รายละเอียด</label>
              <textarea
                value={newGoal.description || ""}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-xl text-app"
                placeholder="อธิบายเป้าหมาย"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-app mb-2">Weight (%)</label>
                <input
                  type="number"
                  value={newGoal.weight || 0}
                  onChange={(e) => setNewGoal({ ...newGoal, weight: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-xl text-app"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-app mb-2">Target</label>
                <input
                  type="text"
                  value={newGoal.target || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-xl text-app"
                  placeholder="เช่น 20%"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-app mb-2">Actual</label>
                <input
                  type="text"
                  value={newGoal.actual || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, actual: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-xl text-app"
                  placeholder="เช่น 15%"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex-1 px-4 py-2.5 bg-ptt-blue text-app rounded-xl font-medium hover:bg-ptt-blue/80 transition-all"
              >
                เพิ่ม
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewGoal({ title: "", description: "", weight: 0, target: "", actual: "" });
                }}
                className="px-4 py-2.5 bg-soft text-muted rounded-xl font-medium hover:bg-app/10 transition-all"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Goals List - Compact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-soft border border-app rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-ptt-cyan" />
                <h3 className="text-base font-semibold text-app">{goal.title}</h3>
              </div>
              <span className="px-2 py-0.5 bg-ptt-blue/20 text-ptt-cyan rounded text-xs font-medium">
                {goal.weight}%
              </span>
            </div>
            <p className="text-sm text-muted mb-3 line-clamp-2">{goal.description}</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <span className="text-xs text-muted">Target:</span>
                <p className="text-sm text-app font-medium">{goal.target}</p>
              </div>
              <div>
                <span className="text-xs text-muted">Actual:</span>
                <p className="text-sm text-app font-medium">{goal.actual}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(goal.id)}
              className="w-full px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-all text-sm font-medium"
            >
              <Trash2 className="w-3 h-3 inline mr-1" />
              ลบ
            </button>
          </motion.div>
        ))}
      </div>

      {goals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-soft border border-app rounded-2xl"
        >
          <Target className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
          <p className="text-muted">ยังไม่มีเป้าหมาย</p>
        </motion.div>
      )}
    </div>
  );
}

