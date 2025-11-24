import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Plus, CheckCircle, Circle, Trash2, Edit2 } from "lucide-react";

interface IDPItem {
  id: string;
  title: string;
  description: string;
  category: "skill" | "course" | "certification" | "project";
  targetDate: string;
  status: "planned" | "in-progress" | "completed";
  progress: number;
}

export default function IDP() {
  const [idpItems, setIdpItems] = useState<IDPItem[]>([
    {
      id: "1",
      title: "เรียน Python Advanced",
      description: "เรียนคอร์ส Python สำหรับ Data Science",
      category: "course",
      targetDate: "2025-12-31",
      status: "in-progress",
      progress: 60,
    },
    {
      id: "2",
      title: "สอบ AWS Certification",
      description: "เตรียมสอบ AWS Solutions Architect",
      category: "certification",
      targetDate: "2026-03-31",
      status: "planned",
      progress: 0,
    },
    {
      id: "3",
      title: "พัฒนาทักษะ Leadership",
      description: "เข้าร่วม Leadership Workshop",
      category: "skill",
      targetDate: "2025-12-15",
      status: "completed",
      progress: 100,
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<IDPItem>>({
    title: "",
    description: "",
    category: "skill",
    targetDate: "",
    status: "planned",
    progress: 0,
  });

  const categoryLabels = {
    skill: "Skill Development",
    course: "Course",
    certification: "Certification",
    project: "Project",
  };

  const statusLabels = {
    planned: "Planned",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  const handleAdd = () => {
    if (newItem.title && newItem.description && newItem.targetDate) {
      const item: IDPItem = {
        id: Date.now().toString(),
        title: newItem.title,
        description: newItem.description,
        category: newItem.category || "skill",
        targetDate: newItem.targetDate,
        status: newItem.status || "planned",
        progress: newItem.progress || 0,
      };
      setIdpItems([...idpItems, item]);
      setNewItem({
        title: "",
        description: "",
        category: "skill",
        targetDate: "",
        status: "planned",
        progress: 0,
      });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    setIdpItems(idpItems.filter(item => item.id !== id));
  };

  const handleStatusChange = (id: string, status: IDPItem["status"]) => {
    setIdpItems(idpItems.map(item =>
      item.id === id
        ? { ...item, status, progress: status === "completed" ? 100 : item.progress }
        : item
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-app mb-2 font-display">
            Individual Development Plan (IDP)
          </h1>
          <p className="text-muted font-light">
            แผนพัฒนาตนเองและทักษะ
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-ptt-blue hover:bg-ptt-blue/80 
                   text-app rounded-xl transition-all duration-200 font-semibold 
                   shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          เพิ่ม IDP Item
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <p className="text-muted text-sm mb-1 font-light">Total Items</p>
          <p className="text-2xl font-bold text-app font-display">{idpItems.length}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <p className="text-muted text-sm mb-1 font-light">Completed</p>
          <p className="text-2xl font-bold text-green-500 font-display">
            {idpItems.filter(i => i.status === "completed").length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <p className="text-muted text-sm mb-1 font-light">In Progress</p>
          <p className="text-2xl font-bold text-yellow-500 font-display">
            {idpItems.filter(i => i.status === "in-progress").length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <p className="text-muted text-sm mb-1 font-light">Avg Progress</p>
          <p className="text-2xl font-bold text-ptt-cyan font-display">
            {idpItems.length > 0
              ? Math.round(idpItems.reduce((sum, i) => sum + i.progress, 0) / idpItems.length)
              : 0}%
          </p>
        </motion.div>
      </div>

      {/* Add New Item Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <h2 className="text-xl font-semibold text-app mb-4">New IDP Item</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-app mb-2">Title</label>
              <input
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-xl text-app"
                placeholder="เช่น เรียน Python Advanced"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-app mb-2">Description</label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-xl text-app"
                placeholder="อธิบายรายละเอียด..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-app mb-2">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value as IDPItem["category"] })}
                  className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-xl text-app"
                >
                  <option value="skill">Skill Development</option>
                  <option value="course">Course</option>
                  <option value="certification">Certification</option>
                  <option value="project">Project</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-app mb-2">Target Date</label>
                <input
                  type="date"
                  value={newItem.targetDate}
                  onChange={(e) => setNewItem({ ...newItem, targetDate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-xl text-app"
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
                  setNewItem({
                    title: "",
                    description: "",
                    category: "skill",
                    targetDate: "",
                    status: "planned",
                    progress: 0,
                  });
                }}
                className="px-4 py-2.5 bg-soft text-muted rounded-xl font-medium hover:bg-app/10 transition-all"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* IDP Items List - Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {idpItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-soft border border-app rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-ptt-cyan" />
                <span className="px-2 py-0.5 bg-ptt-blue/20 text-ptt-cyan rounded text-xs font-medium">
                  {categoryLabels[item.category]}
                </span>
              </div>
              <select
                value={item.status}
                onChange={(e) => handleStatusChange(item.id, e.target.value as IDPItem["status"])}
                className="px-2 py-1 bg-[var(--bg)] border border-app rounded text-xs text-app"
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <h3 className="text-base font-semibold text-app mb-1">{item.title}</h3>
            <p className="text-xs text-muted mb-3 line-clamp-2">{item.description}</p>
            
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted">Progress</span>
                <span className="text-app font-medium">{item.progress}%</span>
              </div>
              <div className="w-full bg-app/10 rounded-full h-1.5">
                <div
                  className="bg-ptt-cyan h-1.5 rounded-full transition-all"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">
                Target: {new Date(item.targetDate).toLocaleDateString("th-TH", { month: "short", day: "numeric" })}
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 hover:bg-red-500/20 rounded transition-all text-red-500"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {idpItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-soft border border-app rounded-2xl"
        >
          <BookOpen className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
          <p className="text-muted">ยังไม่มี IDP Items</p>
        </motion.div>
      )}
    </div>
  );
}

