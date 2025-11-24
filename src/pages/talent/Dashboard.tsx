import { motion } from "framer-motion";
import { Target, CheckCircle, Clock, TrendingUp, FileText, Calendar, AlertCircle, Star, Users, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TalentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-app mb-2 font-display">
          My Performance Dashboard
        </h1>
        <p className="text-muted font-light">
          ภาพรวมผลการประเมินและเป้าหมายของคุณ
        </p>
      </div>

      {/* Summary Stats - Row 1 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg cursor-pointer hover:shadow-xl transition-all"
          onClick={() => navigate("/app/talent/goals")}
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-ptt-cyan" />
            <p className="text-sm text-muted">Goals Set</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">5</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg cursor-pointer hover:shadow-xl transition-all"
          onClick={() => navigate("/app/talent/goals")}
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-sm text-muted">Completed</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">3</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg cursor-pointer hover:shadow-xl transition-all"
          onClick={() => navigate("/app/talent/goals")}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            <p className="text-sm text-muted">In Progress</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">2</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-ptt-cyan" />
            <p className="text-sm text-muted">Current Score</p>
          </div>
          <p className="text-2xl font-bold text-ptt-cyan font-display">85.5</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg cursor-pointer hover:shadow-xl transition-all"
          onClick={() => navigate("/app/talent/reviews")}
        >
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <p className="text-sm text-muted">Reviews</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">3</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <p className="text-sm text-muted">Avg Rating</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">4.2</p>
        </motion.div>
      </div>

      {/* Current Cycle & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Cycle Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-app mb-4">Current Review Cycle</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-base text-muted">Cycle:</span>
              <span className="text-app font-medium text-base">Year End 2025</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-muted">Status:</span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-medium">
                Goal Setting
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-muted">Progress:</span>
              <span className="text-app font-medium text-base">25%</span>
            </div>
            <div className="w-full bg-app/10 rounded-full h-2">
              <div className="bg-ptt-cyan h-2 rounded-full" style={{ width: "25%" }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-muted">Due Date:</span>
              <span className="text-app font-medium text-base">Dec 31, 2025</span>
            </div>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-app mb-4">Recent Activities</h2>
          <div className="space-y-3">
            {[
              { icon: Target, text: "Goal approved by manager", time: "2 days ago", color: "text-green-500" },
              { icon: FileText, text: "Self-assessment submitted", time: "5 days ago", color: "text-blue-500" },
              { icon: Users, text: "360 feedback requested", time: "1 week ago", color: "text-purple-500" },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-app/5 transition-colors">
                  <Icon className={`w-4 h-4 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-base text-app">{activity.text}</p>
                    <p className="text-sm text-muted">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Performance Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-app mb-4">Performance Trend</h2>
          <div className="space-y-3">
            {[
              { period: "Q1 2025", score: 82.0, grade: "B+" },
              { period: "Q2 2025", score: 85.5, grade: "B+" },
              { period: "Q3 2025", score: 87.0, grade: "A-" },
              { period: "Q4 2025", score: 85.5, grade: "B+", current: true },
            ].map((item) => (
              <div key={item.period} className="flex items-center justify-between p-2 rounded-lg hover:bg-app/5 transition-colors">
                <div>
                  <p className="text-base text-app font-medium">{item.period}</p>
                  <p className="text-sm text-muted">{item.grade}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-ptt-cyan font-mono">{item.score}</p>
                  {item.current && (
                    <span className="text-sm text-muted">Current</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions & Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-app mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate("/app/talent/goals")}
              className="p-3 bg-[var(--bg)] rounded-lg hover:bg-app/10 transition-all text-left"
            >
              <Target className="w-5 h-5 text-ptt-cyan mb-2" />
              <p className="text-base font-medium text-app">Set Goals</p>
            </button>
            <button
              onClick={() => navigate("/app/talent/self-assessment")}
              className="p-3 bg-[var(--bg)] rounded-lg hover:bg-app/10 transition-all text-left"
            >
              <Star className="w-5 h-5 text-yellow-500 mb-2" />
              <p className="text-base font-medium text-app">Self-Assess</p>
            </button>
            <button
              onClick={() => navigate("/app/talent/feedback")}
              className="p-3 bg-[var(--bg)] rounded-lg hover:bg-app/10 transition-all text-left"
            >
              <Users className="w-5 h-5 text-purple-500 mb-2" />
              <p className="text-base font-medium text-app">Request Feedback</p>
            </button>
            <button
              onClick={() => navigate("/app/talent/reviews")}
              className="p-3 bg-[var(--bg)] rounded-lg hover:bg-app/10 transition-all text-left"
            >
              <FileText className="w-5 h-5 text-blue-500 mb-2" />
              <p className="text-base font-medium text-app">View Reviews</p>
            </button>
          </div>
        </motion.div>

        {/* Pending Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-app mb-4">Pending Tasks</h2>
          <div className="space-y-2">
            {[
              { icon: AlertCircle, text: "Complete self-assessment", priority: "high", color: "text-red-500" },
              { icon: Clock, text: "Approve peer nominations", priority: "medium", color: "text-yellow-500" },
              { icon: Calendar, text: "Schedule check-in meeting", priority: "low", color: "text-blue-500" },
            ].map((task, index) => {
              const Icon = task.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-app/5 transition-colors">
                  <Icon className={`w-4 h-4 ${task.color}`} />
                  <div className="flex-1">
                    <p className="text-base text-app">{task.text}</p>
                    <p className="text-sm text-muted">{task.priority} priority</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
