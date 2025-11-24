import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Target, UserCheck, Users, FileText, CheckCircle, Clock, Calendar } from "lucide-react";
import StatusTag, { getStatusVariant } from "@/components/StatusTag";

export default function ReviewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"goals" | "self-assessment" | "feedback" | "evaluation">("goals");

  // Mock data - ใน production จะ fetch จาก API
  const review = {
    id: id || "1",
    cycle: "Year End 2025",
    period: "2025",
    status: "manager-review",
    progress: 75,
    score: undefined,
    grade: undefined,
    dueDate: "2025-12-31",
  };

  const goals = [
    { id: "1", title: "เพิ่มยอดขาย", description: "เพิ่มยอดขายรายเดือน 20%", weight: 40, target: "20%", actual: "15%", status: "approved" },
    { id: "2", title: "พัฒนาทักษะ", description: "เรียนคอร์สออนไลน์ 3 หลักสูตร", weight: 30, target: "3 courses", actual: "2 courses", status: "approved" },
    { id: "3", title: "โครงการใหม่", description: "เสร็จสิ้นโครงการ Q4", weight: 30, target: "100%", actual: "80%", status: "pending" },
  ];

  const competencies = [
    { id: "1", name: "Leadership", selfRating: 4, managerRating: 0, comment: "" },
    { id: "2", name: "Communication", selfRating: 5, managerRating: 0, comment: "" },
    { id: "3", name: "Problem Solving", selfRating: 4, managerRating: 0, comment: "" },
  ];

  const tabs = [
    { id: "goals", label: "Goals", icon: Target },
    { id: "self-assessment", label: "Self-Assessment", icon: UserCheck },
    { id: "feedback", label: "360 Feedback", icon: Users },
    { id: "evaluation", label: "Manager Evaluation", icon: FileText },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/app/talent/reviews")}
          className="p-2 hover:bg-soft rounded-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-muted" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-app mb-2 font-display">
            {review.cycle}
          </h1>
          <p className="text-muted font-light">{review.period}</p>
        </div>
        <StatusTag variant={getStatusVariant(review.status)}>
          {review.status}
        </StatusTag>
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-muted">Review Progress</span>
          <span className="text-app font-medium">{review.progress}%</span>
        </div>
        <div className="w-full bg-app/10 rounded-full h-3">
          <div
            className="bg-ptt-cyan h-3 rounded-full transition-all"
            style={{ width: `${review.progress}%` }}
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted mt-4">
          <Calendar className="w-4 h-4" />
          <span>Due: {new Date(review.dueDate).toLocaleDateString("th-TH")}</span>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-app">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-ptt-cyan text-ptt-cyan font-semibold"
                  : "border-transparent text-muted hover:text-app"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
      >
        {activeTab === "goals" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-app mb-4">Goals & KPIs</h2>
            {goals.map((goal) => (
              <div key={goal.id} className="p-4 bg-[var(--bg)] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-ptt-cyan" />
                    <h3 className="font-semibold text-app">{goal.title}</h3>
                    <span className="px-3 py-1 bg-ptt-blue/20 text-ptt-cyan rounded-full text-xs font-medium">
                      {goal.weight}%
                    </span>
                  </div>
                  {goal.status === "approved" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
                <p className="text-muted mb-3">{goal.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted">Target:</span>
                    <p className="text-app font-medium">{goal.target}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted">Actual:</span>
                    <p className="text-app font-medium">{goal.actual}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "self-assessment" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-app mb-4">Self-Assessment</h2>
            {competencies.map((comp) => (
              <div key={comp.id} className="p-4 bg-[var(--bg)] rounded-xl">
                <h3 className="font-semibold text-app mb-3">{comp.name}</h3>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-sm text-muted">Self Rating:</span>
                    <p className="text-lg font-bold text-ptt-cyan">{comp.selfRating}/5</p>
                  </div>
                  {comp.managerRating > 0 && (
                    <div>
                      <span className="text-sm text-muted">Manager Rating:</span>
                      <p className="text-lg font-bold text-green-500">{comp.managerRating}/5</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-app mb-4">360 Feedback</h2>
            <div className="text-center py-8 text-muted">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Feedback from peers will appear here</p>
            </div>
          </div>
        )}

        {activeTab === "evaluation" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-app mb-4">Manager Evaluation</h2>
            {review.status === "manager-review" ? (
              <div className="text-center py-8 text-muted">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Manager evaluation is in progress</p>
              </div>
            ) : review.status === "completed" ? (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <p className="text-green-500 font-medium">Evaluation completed</p>
                {review.score && (
                  <p className="text-2xl font-bold text-app mt-2">Score: {review.score}</p>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted">
                <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Waiting for manager evaluation</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

