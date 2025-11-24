import { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, Star, Save, TrendingUp } from "lucide-react";

interface Competency {
  id: string;
  name: string;
  description: string;
  rating: number;
  comment: string;
}

export default function SelfAssessment() {
  const [competencies, setCompetencies] = useState<Competency[]>([
    { id: "1", name: "Leadership", description: "ความสามารถในการนำทีม", rating: 0, comment: "" },
    { id: "2", name: "Communication", description: "ทักษะการสื่อสาร", rating: 0, comment: "" },
    { id: "3", name: "Problem Solving", description: "การแก้ไขปัญหา", rating: 0, comment: "" },
    { id: "4", name: "Teamwork", description: "การทำงานเป็นทีม", rating: 0, comment: "" },
    { id: "5", name: "Discipline", description: "วินัยและความรับผิดชอบ", rating: 0, comment: "" },
  ]);

  const handleRatingChange = (id: string, rating: number) => {
    setCompetencies(competencies.map(c => c.id === id ? { ...c, rating } : c));
  };

  const handleCommentChange = (id: string, comment: string) => {
    setCompetencies(competencies.map(c => c.id === id ? { ...c, comment } : c));
  };

  const handleSubmit = () => {
    const allRated = competencies.every(c => c.rating > 0);
    if (!allRated) {
      alert("กรุณาให้คะแนนทุก competency");
      return;
    }
    alert("บันทึกการประเมินตนเองเรียบร้อย");
  };

  const averageRating = competencies.reduce((sum, c) => sum + c.rating, 0) / competencies.length;
  const completedCount = competencies.filter(c => c.rating > 0).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-app mb-2 font-display">
            Self-Assessment
          </h1>
          <p className="text-muted font-light">
            ประเมินตนเองตาม Competencies
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <UserCheck className="w-5 h-5 text-ptt-cyan" />
            <p className="text-muted text-sm font-light">Average Rating</p>
          </div>
          <p className="text-3xl font-bold text-app font-display">
            {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <p className="text-muted text-sm font-light">Completed</p>
          </div>
          <p className="text-3xl font-bold text-green-500 font-display">
            {completedCount}/{competencies.length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <p className="text-muted text-sm font-light">Total Competencies</p>
          </div>
          <p className="text-3xl font-bold text-app font-display">{competencies.length}</p>
        </motion.div>
      </div>

      {/* Competencies Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-soft border border-app rounded-2xl overflow-hidden shadow-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-soft border-b border-app">
              <tr>
                <th className="px-6 py-4 text-left text-base font-semibold text-app">Competency</th>
                <th className="px-6 py-4 text-left text-base font-semibold text-app">Description</th>
                <th className="px-6 py-4 text-center text-base font-semibold text-app">Rating (1-5)</th>
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
                    <p className="text-base font-semibold text-app">{competency.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-base text-muted">{competency.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleRatingChange(competency.id, rating)}
                          className={`p-2 rounded-lg transition-all ${
                            competency.rating >= rating
                              ? "bg-ptt-blue text-app scale-110"
                              : "bg-soft text-muted hover:bg-app/10"
                          }`}
                        >
                          <Star className="w-5 h-5" fill={competency.rating >= rating ? "currentColor" : "none"} />
                        </button>
                      ))}
                      <span className="ml-2 text-base font-medium text-app min-w-[2.5rem] text-center">
                        {competency.rating > 0 ? `${competency.rating}/5` : '\u00A0'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <textarea
                      value={competency.comment}
                      onChange={(e) => handleCommentChange(competency.id, e.target.value)}
                      className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-lg text-app text-base"
                      placeholder="อธิบายการประเมิน..."
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
