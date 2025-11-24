import { motion } from "framer-motion";
import { Clock, Calendar, CheckCircle, XCircle, AlertCircle, TrendingUp, Users, BarChart3 } from "lucide-react";

export default function TimeDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-app mb-2 font-display">
          Time Management Dashboard
        </h1>
        <p className="text-muted font-light">
          ภาพรวมการจัดการเวลาและตารางงาน
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-muted text-sm font-light">Present Today</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">156</p>
          <p className="text-xs text-muted mt-1">95% attendance</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <p className="text-muted text-sm font-light">Late Today</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">8</p>
          <p className="text-xs text-muted mt-1">5% late rate</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <p className="text-muted text-sm font-light">Absent Today</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">2</p>
          <p className="text-xs text-muted mt-1">1.2% absent rate</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <p className="text-muted text-sm font-light">On Leave</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">12</p>
          <p className="text-xs text-muted mt-1">7.3% on leave</p>
        </motion.div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-ptt-cyan" />
            <p className="text-muted text-sm font-light">Avg Hours/Day</p>
          </div>
          <p className="text-2xl font-bold text-ptt-cyan font-display">8.2</p>
          <p className="text-xs text-muted mt-1">This month</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-purple-500" />
            <p className="text-muted text-sm font-light">Total Employees</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">178</p>
          <p className="text-xs text-muted mt-1">Active staff</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-orange-500" />
            <p className="text-muted text-sm font-light">Attendance Rate</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">94.8%</p>
          <p className="text-xs text-muted mt-1">This month</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-soft border border-app rounded-xl p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            <p className="text-muted text-sm font-light">Overtime Hours</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">245</p>
          <p className="text-xs text-muted mt-1">This month</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-lg font-semibold text-app mb-4">Weekly Attendance Trend</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-app rounded-xl">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-muted mx-auto mb-2 opacity-50" />
              <p className="text-muted">Attendance Chart</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-lg font-semibold text-app mb-4">Department Attendance</h3>
          <div className="space-y-3">
            {[
              { dept: "IT", rate: 96, present: 45, total: 47 },
              { dept: "Sales", rate: 94, present: 38, total: 40 },
              { dept: "Marketing", rate: 92, present: 23, total: 25 },
              { dept: "HR", rate: 98, present: 20, total: 20 },
            ].map((item) => (
              <div key={item.dept} className="flex items-center gap-3">
                <div className="w-20 text-sm font-medium text-app">{item.dept}</div>
                <div className="flex-1 bg-app/10 rounded-full h-4 relative overflow-hidden">
                  <div
                    className="bg-ptt-cyan h-full rounded-full transition-all"
                    style={{ width: `${item.rate}%` }}
                  />
                </div>
                <div className="w-24 text-right text-xs text-muted">
                  {item.present}/{item.total} ({item.rate}%)
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
