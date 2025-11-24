import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, Target, CheckCircle, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusTag, { getStatusVariant } from "@/components/StatusTag";

interface Review {
  id: string;
  cycle: string;
  period: string;
  status: "goal-setting" | "self-review" | "manager-review" | "calibration" | "completed";
  progress: number;
  score?: number;
  grade?: string;
  dueDate: string;
}

export default function MyReviews() {
  const navigate = useNavigate();
  const [reviews] = useState<Review[]>([
    {
      id: "1",
      cycle: "Year End 2025",
      period: "2025",
      status: "manager-review",
      progress: 75,
      dueDate: "2025-12-31",
    },
    {
      id: "2",
      cycle: "Mid Year 2025",
      period: "Q2 2025",
      status: "completed",
      progress: 100,
      score: 85.5,
      grade: "B+",
      dueDate: "2025-06-30",
    },
    {
      id: "3",
      cycle: "Q1 2025",
      period: "Q1 2025",
      status: "completed",
      progress: 100,
      score: 82.0,
      grade: "B+",
      dueDate: "2025-03-31",
    },
  ]);

  const statusLabels = {
    "goal-setting": "Goal Setting",
    "self-review": "Self Review",
    "manager-review": "Manager Review",
    "calibration": "Calibration",
    "completed": "Completed",
  };

  const getStatusColor = (status: Review["status"]) => {
    switch (status) {
      case "goal-setting":
        return "text-blue-500";
      case "self-review":
        return "text-purple-500";
      case "manager-review":
        return "text-yellow-500";
      case "calibration":
        return "text-orange-500";
      case "completed":
        return "text-green-500";
      default:
        return "text-muted";
    }
  };

  const handleViewDetail = (reviewId: string) => {
    navigate(`/app/talent/reviews/${reviewId}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-app mb-2 font-display">
          My Reviews
        </h1>
        <p className="text-muted font-light">
          ดูประวัติการประเมินผลทั้งหมดของคุณ
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-ptt-cyan" />
            <p className="text-muted text-sm font-light">Total Reviews</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">{reviews.length}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-muted text-sm font-light">Completed</p>
          </div>
          <p className="text-2xl font-bold text-green-500 font-display">
            {reviews.filter(r => r.status === "completed").length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            <p className="text-muted text-sm font-light">In Progress</p>
          </div>
          <p className="text-2xl font-bold text-yellow-500 font-display">
            {reviews.filter(r => r.status !== "completed").length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-ptt-cyan" />
            <p className="text-muted text-sm font-light">Avg Score</p>
          </div>
          <p className="text-2xl font-bold text-ptt-cyan font-display">
            {reviews.filter(r => r.score).length > 0
              ? (reviews.filter(r => r.score).reduce((sum, r) => sum + (r.score || 0), 0) /
                  reviews.filter(r => r.score).length).toFixed(1)
              : "0.0"}
          </p>
        </motion.div>
      </div>

      {/* Reviews List - Grid 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-soft border border-app rounded-xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => handleViewDetail(review.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <FileText className="w-5 h-5 text-ptt-cyan" />
              <ArrowRight className="w-4 h-4 text-muted group-hover:text-ptt-cyan transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-app mb-1">{review.cycle}</h3>
            <p className="text-xs text-muted mb-3">{review.period}</p>
            
            <div className="mb-3">
              <StatusTag variant={getStatusVariant(review.status)}>
                {statusLabels[review.status]}
              </StatusTag>
            </div>

            {review.score !== undefined && (
              <div className="mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-ptt-cyan font-mono">{review.score}</span>
                  {review.grade && (
                    <span className="px-2 py-0.5 bg-ptt-blue/20 text-ptt-cyan rounded text-xs font-medium">
                      {review.grade}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Progress */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted">Progress</span>
                <span className="text-app font-medium">{review.progress}%</span>
              </div>
              <div className="w-full bg-app/10 rounded-full h-1.5">
                <div
                  className="bg-ptt-cyan h-1.5 rounded-full transition-all"
                  style={{ width: `${review.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted">
              <Calendar className="w-3 h-3" />
              <span>Due: {new Date(review.dueDate).toLocaleDateString("th-TH", { month: "short", day: "numeric" })}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {reviews.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-soft border border-app rounded-2xl"
        >
          <FileText className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
          <p className="text-muted">ยังไม่มี reviews</p>
        </motion.div>
      )}
    </div>
  );
}

