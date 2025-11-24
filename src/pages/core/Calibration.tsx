import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Filter } from "lucide-react";

interface EmployeeGrade {
  id: string;
  name: string;
  department: string;
  originalScore: number;
  originalGrade: string;
  calibratedScore?: number;
  calibratedGrade?: string;
}

export default function Calibration() {
  const [employees] = useState<EmployeeGrade[]>([
    { id: "1", name: "สมชาย ใจดี", department: "IT", originalScore: 85, originalGrade: "B+" },
    { id: "2", name: "สมหญิง รักงาน", department: "Product", originalScore: 92, originalGrade: "A" },
    { id: "3", name: "วิชัย เก่งมาก", department: "Design", originalScore: 78, originalGrade: "B" },
    { id: "4", name: "มาลี สวยงาม", department: "Marketing", originalScore: 88, originalGrade: "A-" },
    { id: "5", name: "ประเสริฐ ดีมาก", department: "IT", originalScore: 90, originalGrade: "A" },
    { id: "6", name: "สุดา เก่ง", department: "Sales", originalScore: 82, originalGrade: "B+" },
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const departments = ["all", ...Array.from(new Set(employees.map(e => e.department)))];

  const filteredEmployees = selectedDepartment === "all"
    ? employees
    : employees.filter(e => e.department === selectedDepartment);

  const gradeDistribution = {
    "A": filteredEmployees.filter(e => e.calibratedGrade === "A" || (!e.calibratedGrade && e.originalGrade === "A")).length,
    "A-": filteredEmployees.filter(e => e.calibratedGrade === "A-" || (!e.calibratedGrade && e.originalGrade === "A-")).length,
    "B+": filteredEmployees.filter(e => e.calibratedGrade === "B+" || (!e.calibratedGrade && e.originalGrade === "B+")).length,
    "B": filteredEmployees.filter(e => e.calibratedGrade === "B" || (!e.calibratedGrade && e.originalGrade === "B")).length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-app mb-2 font-display">
            Calibration Board
          </h1>
          <p className="text-muted font-light">
            ปรับเกรดให้เป็นมาตรฐานและยุติธรรม
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted" />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 bg-soft border border-app rounded-xl text-app"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === "all" ? "All Departments" : dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grade Distribution Chart - Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
      >
        <h3 className="text-xl font-semibold text-app mb-4">Grade Distribution (Bar Chart)</h3>
        <div className="flex items-end justify-between gap-4 h-64">
          {Object.entries(gradeDistribution).map(([grade, count]) => {
            const maxCount = Math.max(...Object.values(gradeDistribution));
            const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
            const height = (count / maxCount) * 100;
            return (
              <div key={grade} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex items-end justify-center" style={{ height: "200px" }}>
                  <div
                    className="w-full bg-gradient-to-t from-ptt-blue to-ptt-cyan rounded-t-lg transition-all flex flex-col items-center justify-end pb-2 min-h-[20px]"
                    style={{ height: `${height}%` }}
                  >
                    <span className="text-sm font-bold text-app">{count}</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-app">{grade}</div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Employees Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-soft border border-app rounded-2xl overflow-hidden shadow-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-soft border-b border-app">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-app">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-app">Department</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-app">Original Score</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-app">Original Grade</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-app">Calibrated Score</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-app">Calibrated Grade</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-app">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app">
              {filteredEmployees.map((employee, index) => (
                <motion.tr
                  key={employee.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-soft transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-app font-medium">{employee.name}</td>
                  <td className="px-6 py-4 text-sm text-muted">{employee.department}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-lg font-bold text-ptt-cyan font-mono">{employee.originalScore}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-ptt-blue/20 text-ptt-cyan rounded-full text-sm font-medium">
                      {employee.originalGrade}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {employee.calibratedScore !== undefined ? (
                      <span className="text-lg font-bold text-green-500 font-mono">{employee.calibratedScore}</span>
                    ) : (
                      <input
                        type="number"
                        defaultValue={employee.originalScore}
                        className="w-20 px-2 py-1 bg-[var(--bg)] border border-app rounded text-app text-center"
                        placeholder={employee.originalScore.toString()}
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {employee.calibratedGrade ? (
                      <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-medium">
                        {employee.calibratedGrade}
                      </span>
                    ) : (
                      <select className="px-3 py-1 bg-[var(--bg)] border border-app rounded text-app text-sm">
                        <option value="">Select</option>
                        <option value="A">A</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                      </select>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-4 py-2 bg-ptt-blue text-app rounded-lg font-medium hover:bg-ptt-blue/80 transition-all text-sm">
                      Apply
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-soft border border-app rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-ptt-cyan" />
            <p className="text-xs text-muted">Total</p>
          </div>
          <p className="text-xl font-bold text-app font-display">{filteredEmployees.length}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-soft border border-app rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-green-500" />
            <p className="text-xs text-muted">Calibrated</p>
          </div>
          <p className="text-xl font-bold text-green-500 font-display">
            {filteredEmployees.filter(e => e.calibratedGrade).length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-soft border border-app rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-yellow-500" />
            <p className="text-xs text-muted">Pending</p>
          </div>
          <p className="text-xl font-bold text-yellow-500 font-display">
            {filteredEmployees.filter(e => !e.calibratedGrade).length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-soft border border-app rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-blue-500" />
            <p className="text-xs text-muted">Avg Score</p>
          </div>
          <p className="text-xl font-bold text-app font-display">
            {Math.round(filteredEmployees.reduce((sum, e) => sum + e.originalScore, 0) / filteredEmployees.length)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-soft border border-app rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            <p className="text-xs text-muted">Top Grade</p>
          </div>
          <p className="text-xl font-bold text-app font-display">A</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-soft border border-app rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-orange-500" />
            <p className="text-xs text-muted">Departments</p>
          </div>
          <p className="text-xl font-bold text-app font-display">
            {new Set(filteredEmployees.map(e => e.department)).size}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

