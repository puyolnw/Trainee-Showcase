import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, TrendingUp, Clock, CheckCircle } from "lucide-react";
import StatusTag, { getStatusVariant } from "@/components/StatusTag";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  avatar: string;
  status: "goal-setting" | "self-review" | "manager-review" | "completed";
  score?: number;
  progress: number;
}

export default function TeamPerformance() {
  const [searchQuery, setSearchQuery] = useState("");
  const [members] = useState<TeamMember[]>([
    {
      id: "1",
      name: "สมชาย ใจดี",
      position: "Senior Developer",
      avatar: "https://ui-avatars.com/api/?name=สมชาย+ใจดี",
      status: "manager-review",
      score: 85,
      progress: 75,
    },
    {
      id: "2",
      name: "สมหญิง รักงาน",
      position: "Product Manager",
      avatar: "https://ui-avatars.com/api/?name=สมหญิง+รักงาน",
      status: "self-review",
      score: undefined,
      progress: 50,
    },
    {
      id: "3",
      name: "วิชัย เก่งมาก",
      position: "Designer",
      avatar: "https://ui-avatars.com/api/?name=วิชัย+เก่งมาก",
      status: "completed",
      score: 92,
      progress: 100,
    },
    {
      id: "4",
      name: "มาลี สวยงาม",
      position: "Marketing Manager",
      avatar: "https://ui-avatars.com/api/?name=มาลี+สวยงาม",
      status: "goal-setting",
      score: undefined,
      progress: 25,
    },
  ]);

  const statusLabels = {
    "goal-setting": "Goal Setting",
    "self-review": "Self Review",
    "manager-review": "Manager Review",
    "completed": "Completed",
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-app mb-2 font-display">
          Team Performance
        </h1>
        <p className="text-muted font-light">
          ภาพรวมผลการประเมินของทีม
        </p>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ค้นหาชื่อหรือตำแหน่ง..."
          className="w-full pl-10 pr-4 py-3 bg-soft border border-app rounded-xl text-app"
        />
      </motion.div>

      {/* Team Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-soft border border-app rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-app">{member.name}</h3>
                  <p className="text-sm text-muted">{member.position}</p>
                </div>
              </div>
              {member.score !== undefined && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-ptt-cyan font-display">{member.score}</p>
                  <p className="text-xs text-muted">Score</p>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="mb-4">
              <StatusTag variant={getStatusVariant(member.status)}>
                {statusLabels[member.status]}
              </StatusTag>
            </div>

            {/* Progress */}
            <div className="mb-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted">Progress</span>
                <span className="text-app font-medium">{member.progress}%</span>
              </div>
              <div className="w-full bg-app/10 rounded-full h-2">
                <div
                  className="bg-ptt-cyan h-2 rounded-full transition-all"
                  style={{ width: `${member.progress}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-4 py-2 bg-ptt-blue text-app rounded-xl font-medium hover:bg-ptt-blue/80 transition-all text-sm">
                View Details
              </button>
              {member.status === "manager-review" && (
                <button className="px-4 py-2 bg-green-500 text-app rounded-xl font-medium hover:bg-green-500/80 transition-all text-sm">
                  Evaluate
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-soft border border-app rounded-2xl"
        >
          <Users className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
          <p className="text-muted">ไม่พบสมาชิกในทีม</p>
        </motion.div>
      )}
    </div>
  );
}

