import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Plus, Calendar, User, Lock, Unlock } from "lucide-react";

interface CheckIn {
  id: string;
  date: string;
  type: "1-on-1" | "self";
  title: string;
  notes: string;
  isPrivate: boolean;
  managerName?: string;
}

export default function CheckIns() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([
    {
      id: "1",
      date: "2025-11-15",
      type: "1-on-1",
      title: "Monthly Review",
      notes: "พูดคุยเกี่ยวกับเป้าหมาย Q4 และแผนพัฒนาทักษะ",
      isPrivate: false,
      managerName: "John Doe",
    },
    {
      id: "2",
      date: "2025-11-01",
      type: "self",
      title: "Self Reflection",
      notes: "บันทึกความก้าวหน้าในโครงการใหม่",
      isPrivate: true,
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newCheckIn, setNewCheckIn] = useState<Partial<CheckIn>>({
    date: new Date().toISOString().split("T")[0],
    type: "self",
    title: "",
    notes: "",
    isPrivate: false,
  });

  const handleAdd = () => {
    if (newCheckIn.title && newCheckIn.notes) {
      const checkIn: CheckIn = {
        id: Date.now().toString(),
        date: newCheckIn.date || new Date().toISOString().split("T")[0],
        type: newCheckIn.type || "self",
        title: newCheckIn.title,
        notes: newCheckIn.notes,
        isPrivate: newCheckIn.isPrivate || false,
        managerName: newCheckIn.type === "1-on-1" ? "Manager Name" : undefined,
      };
      setCheckIns([checkIn, ...checkIns]);
      setNewCheckIn({
        date: new Date().toISOString().split("T")[0],
        type: "self",
        title: "",
        notes: "",
        isPrivate: false,
      });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-app mb-2 font-display">
            Check-ins
          </h1>
          <p className="text-muted font-light">
            บันทึกการสนทนาและ feedback รายเดือน
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-ptt-blue hover:bg-ptt-blue/80 
                   text-app rounded-xl transition-all duration-200 font-semibold 
                   shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          เพิ่ม Check-in
        </button>
      </div>

      {/* Add New Check-in Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <h2 className="text-xl font-semibold text-app mb-4">New Check-in</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-app mb-2">Date</label>
                <input
                  type="date"
                  value={newCheckIn.date}
                  onChange={(e) => setNewCheckIn({ ...newCheckIn, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-xl text-app"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-app mb-2">Type</label>
                <select
                  value={newCheckIn.type}
                  onChange={(e) => setNewCheckIn({ ...newCheckIn, type: e.target.value as "1-on-1" | "self" })}
                  className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-xl text-app"
                >
                  <option value="self">Self Reflection</option>
                  <option value="1-on-1">1-on-1 Meeting</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-app mb-2">Title</label>
              <input
                type="text"
                value={newCheckIn.title}
                onChange={(e) => setNewCheckIn({ ...newCheckIn, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-xl text-app"
                placeholder="เช่น Monthly Review"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-app mb-2">Notes</label>
              <textarea
                value={newCheckIn.notes}
                onChange={(e) => setNewCheckIn({ ...newCheckIn, notes: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-xl text-app"
                placeholder="บันทึกการสนทนา..."
                rows={4}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="private"
                checked={newCheckIn.isPrivate}
                onChange={(e) => setNewCheckIn({ ...newCheckIn, isPrivate: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="private" className="text-sm text-app">
                Private (Manager notes only)
              </label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex-1 px-4 py-2.5 bg-ptt-blue text-app rounded-xl font-medium hover:bg-ptt-blue/80 transition-all"
              >
                บันทึก
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewCheckIn({
                    date: new Date().toISOString().split("T")[0],
                    type: "self",
                    title: "",
                    notes: "",
                    isPrivate: false,
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

      {/* Check-ins List - Compact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {checkIns.map((checkIn, index) => (
          <motion.div
            key={checkIn.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-soft border border-app rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-ptt-cyan" />
                  <h3 className="text-base font-semibold text-app">{checkIn.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(checkIn.date).toLocaleDateString("th-TH", { month: "short", day: "numeric" })}
                  </div>
                  {checkIn.type === "1-on-1" && checkIn.managerName && (
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {checkIn.managerName}
                    </div>
                  )}
                </div>
                <p className="text-sm text-app line-clamp-2">{checkIn.notes}</p>
              </div>
              <div className="flex flex-col items-end gap-1 ml-2">
                {checkIn.isPrivate ? (
                  <Lock className="w-3 h-3 text-yellow-500" />
                ) : (
                  <Unlock className="w-3 h-3 text-green-500" />
                )}
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  checkIn.type === "1-on-1"
                    ? "bg-blue-500/20 text-blue-500"
                    : "bg-purple-500/20 text-purple-500"
                }`}>
                  {checkIn.type === "1-on-1" ? "1-on-1" : "Self"}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {checkIns.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-soft border border-app rounded-2xl"
        >
          <MessageSquare className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
          <p className="text-muted">ยังไม่มี Check-in</p>
        </motion.div>
      )}
    </div>
  );
}

