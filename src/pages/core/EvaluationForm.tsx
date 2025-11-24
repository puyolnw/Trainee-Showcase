import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, Calendar, AlertCircle, Save, Star, TrendingUp, User } from "lucide-react";

interface AttendanceData {
  lates: number;
  absences: number;
  sickLeave: number;
}

interface CompetencyRating {
  id: string;
  name: string;
  description: string;
  selfRating: number;
  managerRating: number;
  comment: string;
}

export default function EvaluationForm() {
  const [attendanceData] = useState<AttendanceData>({
    lates: 3,
    absences: 0,
    sickLeave: 2,
  });

  const [competencies, setCompetencies] = useState<CompetencyRating[]>([
    { id: "1", name: "Leadership", description: "ความสามารถในการนำทีม", selfRating: 4, managerRating: 0, comment: "" },
    { id: "2", name: "Communication", description: "ทักษะการสื่อสาร", selfRating: 5, managerRating: 0, comment: "" },
    { id: "3", name: "Problem Solving", description: "การแก้ไขปัญหา", selfRating: 4, managerRating: 0, comment: "" },
    { id: "4", name: "Teamwork", description: "การทำงานเป็นทีม", selfRating: 5, managerRating: 0, comment: "" },
    { id: "5", name: "Discipline", description: "วินัยและความรับผิดชอบ", selfRating: 4, managerRating: 0, comment: "" },
  ]);

  const handleRatingChange = (id: string, rating: number) => {
    setCompetencies(competencies.map(c => c.id === id ? { ...c, managerRating: rating } : c));
  };

  const handleCommentChange = (id: string, comment: string) => {
    setCompetencies(competencies.map(c => c.id === id ? { ...c, comment } : c));
  };

  const handleSubmit = () => {
    const allRated = competencies.every(c => c.managerRating > 0);
    if (!allRated) {
      alert("กรุณาให้คะแนนทุก competency");
      return;
    }
    alert("บันทึกการประเมินเรียบร้อย");
  };

  const averageRating = competencies.reduce((sum, c) => sum + (c.managerRating || 0), 0) / competencies.length;
  const completedCount = competencies.filter(c => c.managerRating > 0).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-app mb-2 font-display">
            Evaluation Form
          </h1>
          <p className="text-muted font-light">
            ประเมินผลการทำงานของพนักงาน
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 px-6 py-3 bg-ptt-blue hover:bg-ptt-blue/80 
                   text-app rounded-xl transition-all duration-200 font-semibold 
                   shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Save className="w-5 h-5" />
          บันทึกการประเมิน
        </button>
      </div>

      {/* Employee Info & Summary - Compact */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-soft border border-app rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=สมชาย+ใจดี"
              alt="Employee"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold text-app">สมชาย ใจดี</h2>
              <p className="text-sm text-muted">Senior Developer • IT</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-soft border border-app rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-ptt-cyan" />
            <p className="text-xs text-muted">Avg Rating</p>
          </div>
          <p className="text-2xl font-bold text-ptt-cyan font-display">
            {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-soft border border-app rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-green-500" />
            <p className="text-xs text-muted">Completed</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">
            {completedCount}/{competencies.length}
          </p>
        </motion.div>
      </div>

      {/* Attendance Widget - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/30 rounded-xl p-4 shadow-lg"
      >
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-yellow-500" />
          <h3 className="text-base font-semibold text-app">Attendance Summary (2025)</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[var(--bg)] rounded-lg p-3">
            <div className="flex items-center gap-1 mb-1">
              <AlertCircle className="w-3 h-3 text-yellow-500" />
              <span className="text-xs text-muted">Late</span>
            </div>
            <p className="text-xl font-bold text-app font-display">{attendanceData.lates}</p>
          </div>
          <div className="bg-[var(--bg)] rounded-lg p-3">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="w-3 h-3 text-red-500" />
              <span className="text-xs text-muted">Absent</span>
            </div>
            <p className="text-xl font-bold text-app font-display">{attendanceData.absences}</p>
          </div>
          <div className="bg-[var(--bg)] rounded-lg p-3">
            <div className="flex items-center gap-1 mb-1">
              <AlertCircle className="w-3 h-3 text-blue-500" />
              <span className="text-xs text-muted">Sick Leave</span>
            </div>
            <p className="text-xl font-bold text-app font-display">{attendanceData.sickLeave}</p>
          </div>
        </div>
      </motion.div>

      {/* Competencies Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-soft border border-app rounded-2xl overflow-hidden shadow-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-soft border-b border-app">
              <tr>
                <th className="px-6 py-4 text-left text-base font-semibold text-app">Competency</th>
                <th className="px-6 py-4 text-center text-base font-semibold text-app">Self Rating</th>
                <th className="px-6 py-4 text-center text-base font-semibold text-app">Manager Rating</th>
                <th className="px-6 py-4 text-left text-base font-semibold text-app">Comment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app">
              {competencies.map((competency, index) => (
                <motion.tr
                  key={competency.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-soft transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-base font-semibold text-app">{competency.name}</p>
                      <p className="text-sm text-muted">{competency.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Star
                          key={rating}
                          className={`w-4 h-4 ${
                            competency.selfRating >= rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-base font-medium text-app min-w-[2.5rem] text-center">
                        {competency.selfRating}/5
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleRatingChange(competency.id, rating)}
                          className={`${
                            competency.managerRating >= rating
                              ? "text-ptt-cyan"
                              : "text-muted hover:text-ptt-cyan/50"
                          }`}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              competency.managerRating >= rating ? "fill-current" : ""
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-base font-medium text-app min-w-[2.5rem] text-center">
                        {competency.managerRating > 0 ? `${competency.managerRating}/5` : '\u00A0'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <textarea
                      value={competency.comment}
                      onChange={(e) => handleCommentChange(competency.id, e.target.value)}
                      className="w-full px-3 py-2 bg-[var(--bg)] border border-app rounded-lg text-app text-base"
                      placeholder="ให้ feedback..."
                      rows={2}
                    />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
