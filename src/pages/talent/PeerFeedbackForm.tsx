import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Star, Save, User } from "lucide-react";

interface Competency {
  id: string;
  name: string;
  description: string;
  rating: number;
  comment: string;
}

export default function PeerFeedbackForm() {
  const { reviewId, employeeId } = useParams();
  const navigate = useNavigate();
  
  const [employeeName] = useState("สมชาย ใจดี");
  const [competencies, setCompetencies] = useState<Competency[]>([
    { id: "1", name: "Teamwork", description: "ความสามารถในการทำงานเป็นทีม", rating: 0, comment: "" },
    { id: "2", name: "Communication", description: "ทักษะการสื่อสาร", rating: 0, comment: "" },
    { id: "3", name: "Problem Solving", description: "การแก้ไขปัญหา", rating: 0, comment: "" },
    { id: "4", name: "Collaboration", description: "การทำงานร่วมกัน", rating: 0, comment: "" },
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
    alert("บันทึก feedback เรียบร้อย");
    navigate("/app/talent/feedback");
  };

  const averageRating = competencies.reduce((sum, c) => sum + c.rating, 0) / competencies.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/app/talent/feedback")}
          className="p-2 hover:bg-soft rounded-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-muted" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-app mb-2 font-display">
            360 Feedback Form
          </h1>
          <p className="text-muted font-light">
            ให้ feedback สำหรับ {employeeName}
          </p>
        </div>
      </div>

      {/* Employee Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-ptt-blue to-ptt-cyan rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-app" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-app">{employeeName}</h2>
            <p className="text-muted">Senior Developer</p>
          </div>
        </div>
      </motion.div>

      {/* Average Rating */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-ptt-cyan" />
            <div>
              <p className="text-muted text-sm">Average Rating</p>
              <p className="text-3xl font-bold text-app font-display">
                {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-muted text-sm">Total Competencies</p>
            <p className="text-2xl font-bold text-ptt-cyan font-display">{competencies.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Competencies */}
      <div className="space-y-4">
        {competencies.map((competency, index) => (
          <motion.div
            key={competency.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-app mb-1">{competency.name}</h3>
              <p className="text-muted text-sm">{competency.description}</p>
            </div>

            {/* Rating Stars */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-app mb-2">Rating (1-5)</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingChange(competency.id, rating)}
                    className={`p-2 rounded-lg transition-all ${
                      competency.rating >= rating
                        ? "bg-ptt-blue text-app"
                        : "bg-soft text-muted hover:bg-app/10"
                    }`}
                  >
                    <Star className="w-5 h-5" fill={competency.rating >= rating ? "currentColor" : "none"} />
                  </button>
                ))}
                <span className="ml-2 text-app font-medium min-w-[2.5rem] text-center">
                  {competency.rating > 0 ? `${competency.rating}/5` : '\u00A0'}
                </span>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-app mb-2">Comment</label>
              <textarea
                value={competency.comment}
                onChange={(e) => handleCommentChange(competency.id, e.target.value)}
                className="w-full px-4 py-2.5 bg-[var(--bg)] border border-app rounded-xl text-app"
                placeholder="ให้ feedback เกี่ยวกับ competency นี้..."
                rows={3}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4"
      >
        <button
          onClick={handleSubmit}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-ptt-blue hover:bg-ptt-blue/80 
                   text-app rounded-xl transition-all duration-200 font-semibold 
                   shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <Save className="w-5 h-5" />
          บันทึก Feedback
        </button>
        <button
          onClick={() => navigate("/app/talent/feedback")}
          className="px-6 py-3 bg-soft hover:bg-app/10 text-muted rounded-xl transition-all font-semibold"
        >
          ยกเลิก
        </button>
      </motion.div>
    </div>
  );
}

