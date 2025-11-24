import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  status: "present" | "late" | "absent" | "leave";
  hours: number;
}

export default function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [records] = useState<AttendanceRecord[]>([
    { date: "2025-11-01", checkIn: "09:00", checkOut: "18:00", status: "present", hours: 8 },
    { date: "2025-11-02", checkIn: "09:15", checkOut: "18:00", status: "late", hours: 8 },
    { date: "2025-11-03", checkIn: "09:00", checkOut: "18:00", status: "present", hours: 8 },
    { date: "2025-11-04", checkIn: "-", checkOut: "-", status: "leave", hours: 0 },
    { date: "2025-11-05", checkIn: "09:00", checkOut: "18:00", status: "present", hours: 8 },
  ]);

  const statusIcons = {
    present: CheckCircle,
    late: AlertCircle,
    absent: XCircle,
    leave: Calendar,
  };

  const statusColors = {
    present: "text-green-500",
    late: "text-yellow-500",
    absent: "text-red-500",
    leave: "text-blue-500",
  };

  const statusLabels = {
    present: "Present",
    late: "Late",
    absent: "Absent",
    leave: "Leave",
  };

  const totalHours = records.reduce((sum, r) => sum + r.hours, 0);
  const presentDays = records.filter(r => r.status === "present").length;
  const lateDays = records.filter(r => r.status === "late").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-app mb-2 font-display">
            Attendance
          </h1>
          <p className="text-muted font-light">
            บันทึกการมาทำงานและเวลา
          </p>
        </div>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 bg-soft border border-app rounded-xl text-app"
        />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-muted text-sm font-light">Present Days</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">{presentDays}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <p className="text-muted text-sm font-light">Late Days</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">{lateDays}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-ptt-cyan" />
            <p className="text-muted text-sm font-light">Total Hours</p>
          </div>
          <p className="text-2xl font-bold text-ptt-cyan font-display">{totalHours}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <p className="text-muted text-sm font-light">Working Days</p>
          </div>
          <p className="text-2xl font-bold text-app font-display">{records.length}</p>
        </motion.div>
      </div>

      {/* Attendance Records Table */}
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-app">Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-app">Check In</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-app">Check Out</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-app">Hours</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-app">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app">
              {records.map((record, index) => {
                const StatusIcon = statusIcons[record.status];
                return (
                  <motion.tr
                    key={record.date}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-soft transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-app font-medium">
                      {new Date(record.date).toLocaleDateString("th-TH", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-app font-mono">{record.checkIn}</td>
                    <td className="px-6 py-4 text-center text-sm text-app font-mono">{record.checkOut}</td>
                    <td className="px-6 py-4 text-center text-sm text-app font-medium">{record.hours}h</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <StatusIcon className={`w-4 h-4 ${statusColors[record.status]}`} />
                        <span className={`text-sm font-medium ${statusColors[record.status]}`}>
                          {statusLabels[record.status]}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

