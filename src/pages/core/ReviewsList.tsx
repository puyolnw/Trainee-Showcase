import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileText, Search, Clock, CheckCircle, AlertCircle, ArrowRight, Filter } from "lucide-react";
import StatusTag, { getStatusVariant } from "@/components/StatusTag";

interface Review {
  id: string;
  employeeName: string;
  employeePosition: string;
  employeeAvatar: string;
  cycle: string;
  status: "goal-setting" | "self-review" | "manager-review" | "calibration" | "completed";
  progress: number;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

export default function ReviewsList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const [reviews] = useState<Review[]>([
    {
      id: "1",
      employeeName: "สมชาย ใจดี",
      employeePosition: "Senior Developer",
      employeeAvatar: "https://ui-avatars.com/api/?name=สมชาย+ใจดี",
      cycle: "Year End 2025",
      status: "manager-review",
      progress: 75,
      dueDate: "2025-12-31",
      priority: "high",
    },
    {
      id: "2",
      employeeName: "สมหญิง รักงาน",
      employeePosition: "Product Manager",
      employeeAvatar: "https://ui-avatars.com/api/?name=สมหญิง+รักงาน",
      cycle: "Year End 2025",
      status: "self-review",
      progress: 50,
      dueDate: "2025-12-25",
      priority: "medium",
    },
    {
      id: "3",
      employeeName: "วิชัย เก่งมาก",
      employeePosition: "Designer",
      employeeAvatar: "https://ui-avatars.com/api/?name=วิชัย+เก่งมาก",
      cycle: "Year End 2025",
      status: "goal-setting",
      progress: 25,
      dueDate: "2025-12-20",
      priority: "low",
    },
    {
      id: "4",
      employeeName: "มาลี สวยงาม",
      employeePosition: "Marketing Manager",
      employeeAvatar: "https://ui-avatars.com/api/?name=มาลี+สวยงาม",
      cycle: "Year End 2025",
      status: "manager-review",
      progress: 80,
      dueDate: "2025-12-28",
      priority: "high",
    },
  ]);

  const statusLabels = {
    "goal-setting": "Goal Setting",
    "self-review": "Self Review",
    "manager-review": "Manager Review",
    "calibration": "Calibration",
    "completed": "Completed",
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.employeePosition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingReviews = reviews.filter(r => r.status === "manager-review").length;
  const totalReviews = reviews.length;

  const handleViewDetail = (reviewId: string) => {
    navigate(`/app/core/reviews/${reviewId}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-app mb-2 font-display">
          Reviews to Evaluate
        </h1>
        <p className="text-muted font-light">
          รายการ reviews ที่ต้องประเมิน
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-ptt-cyan" />
            <p className="text-muted text-sm font-light">Total Reviews</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">{totalReviews}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <p className="text-muted text-sm font-light">Pending Evaluation</p>
          </div>
          <p className="text-2xl font-bold text-yellow-500 font-display">{pendingReviews}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อหรือตำแหน่ง..."
            className="w-full pl-10 pr-4 py-3 bg-soft border border-app rounded-xl text-app"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-soft border border-app rounded-xl text-app"
          >
            <option value="all">All Status</option>
            <option value="goal-setting">Goal Setting</option>
            <option value="self-review">Self Review</option>
            <option value="manager-review">Manager Review</option>
            <option value="calibration">Calibration</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </motion.div>

      {/* Reviews List - Compact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-soft border border-app rounded-xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => handleViewDetail(review.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={review.employeeAvatar}
                  alt={review.employeeName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-app truncate">{review.employeeName}</h3>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                      review.priority === "high"
                        ? "bg-red-500/20 text-red-500"
                        : review.priority === "medium"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-green-500/20 text-green-500"
                    }`}>
                      {review.priority}
                    </span>
                  </div>
                  <p className="text-xs text-muted truncate">{review.employeePosition}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted group-hover:text-ptt-cyan transition-colors flex-shrink-0" />
            </div>

            <div className="mb-3">
              <StatusTag variant={getStatusVariant(review.status)}>
                {statusLabels[review.status]}
              </StatusTag>
            </div>

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

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-muted">
                <Clock className="w-3 h-3" />
                <span>{new Date(review.dueDate).toLocaleDateString("th-TH", { month: "short", day: "numeric" })}</span>
              </div>
              {review.status === "manager-review" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/app/core/evaluation?reviewId=${review.id}`);
                  }}
                  className="px-3 py-1 bg-ptt-blue text-app rounded-lg font-medium hover:bg-ptt-blue/80 transition-all text-xs"
                >
                  Evaluate
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-soft border border-app rounded-2xl"
        >
          <FileText className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
          <p className="text-muted">ไม่พบ reviews</p>
        </motion.div>
      )}
    </div>
  );
}

