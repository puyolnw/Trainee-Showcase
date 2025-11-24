import { motion } from "framer-motion";
import { Users, Target, Clock, BarChart3, TrendingUp, AlertCircle, CheckCircle, FileText, Calendar } from "lucide-react";

export default function CoreDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-app mb-2 font-display">
          Team Performance Dashboard
        </h1>
        <p className="text-muted font-light">
          ภาพรวมผลการประเมินของทีมและองค์กร
        </p>
      </div>

      {/* Summary Stats - Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-ptt-blue/20 rounded-lg">
              <Users className="w-5 h-5 text-ptt-cyan" />
            </div>
            <p className="text-muted text-sm font-light">Team Members</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">24</p>
          <p className="text-xs text-muted mt-1">+2 from last month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-muted text-sm font-light">Completed Reviews</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">18</p>
          <p className="text-xs text-muted mt-1">75% completion rate</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-muted text-sm font-light">Pending</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">6</p>
          <p className="text-xs text-muted mt-1">Due this week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-ptt-cyan/20 rounded-lg">
              <BarChart3 className="w-5 h-5 text-ptt-cyan" />
            </div>
            <p className="text-muted text-sm font-light">Avg Score</p>
          </div>
          <p className="text-2xl font-bold text-ptt-cyan font-display">84.2</p>
          <p className="text-xs text-muted mt-1">+2.5 from last cycle</p>
        </motion.div>
      </div>

      {/* Summary Stats - Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-green-500" />
            <p className="text-muted text-sm font-light">Goals Approved</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">22</p>
          <p className="text-xs text-muted mt-1">92% approval rate</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-muted text-sm font-light">Overdue</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">2</p>
          <p className="text-xs text-muted mt-1">Requires attention</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <p className="text-muted text-sm font-light">Top Performers</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">8</p>
            <p className="text-xs text-muted mt-1">Score &gt; 90</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-purple-500" />
            <p className="text-muted text-sm font-light">Active Cycles</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">3</p>
          <p className="text-xs text-muted mt-1">Year End 2025</p>
        </motion.div>
      </div>

      {/* Charts and Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Distribution - Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-lg font-semibold text-app mb-4">Performance Distribution</h3>
          <div className="flex items-end justify-between gap-4 h-48">
            {[
              { grade: "A", count: 5, color: "from-green-500 to-green-400" },
              { grade: "A-", count: 8, color: "from-blue-500 to-blue-400" },
              { grade: "B+", count: 7, color: "from-yellow-500 to-yellow-400" },
              { grade: "B", count: 4, color: "from-orange-500 to-orange-400" },
            ].map((item) => {
              const maxCount = 8;
              const height = (item.count / maxCount) * 100;
              return (
                <div key={item.grade} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full flex items-end justify-center" style={{ height: "150px" }}>
                    <div
                      className={`w-full bg-gradient-to-t ${item.color} rounded-t-lg transition-all flex flex-col items-center justify-end pb-2 min-h-[20px] shadow-lg`}
                      style={{ height: `${height}%` }}
                    >
                      <span className="text-sm font-bold text-app">{item.count}</span>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-app">{item.grade}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-lg font-semibold text-app mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {[
              { name: "สมชาย ใจดี", action: "Completed evaluation", time: "2 hours ago" },
              { name: "มาลี สวยงาม", action: "Submitted goals", time: "5 hours ago" },
              { name: "วิชัย เก่งมาก", action: "Started self-assessment", time: "1 day ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-app/5 transition-colors">
                <div className="w-8 h-8 bg-ptt-blue/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-ptt-cyan" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-app font-medium">{activity.name}</p>
                  <p className="text-xs text-muted">{activity.action}</p>
                </div>
                <p className="text-xs text-muted">{activity.time}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
      >
        <h3 className="text-lg font-semibold text-app mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-[var(--bg)] rounded-xl hover:bg-app/10 transition-all text-left">
            <FileText className="w-5 h-5 text-ptt-cyan mb-2" />
            <p className="text-sm font-medium text-app">View Reviews</p>
          </button>
          <button className="p-4 bg-[var(--bg)] rounded-xl hover:bg-app/10 transition-all text-left">
            <Target className="w-5 h-5 text-green-500 mb-2" />
            <p className="text-sm font-medium text-app">Approve Goals</p>
          </button>
          <button className="p-4 bg-[var(--bg)] rounded-xl hover:bg-app/10 transition-all text-left">
            <BarChart3 className="w-5 h-5 text-purple-500 mb-2" />
            <p className="text-sm font-medium text-app">Calibration</p>
          </button>
          <button className="p-4 bg-[var(--bg)] rounded-xl hover:bg-app/10 transition-all text-left">
            <Calendar className="w-5 h-5 text-blue-500 mb-2" />
            <p className="text-sm font-medium text-app">Schedule Review</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
