import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, UserPlus, Send, X } from "lucide-react";

interface Peer {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar: string;
}

interface RequestedPeer extends Peer {
  status: "pending" | "completed";
  requestedDate: string;
}

export default function FeedbackRequest() {
  const [searchQuery, setSearchQuery] = useState("");
  const [requestedPeers, setRequestedPeers] = useState<RequestedPeer[]>([
    {
      id: "1",
      name: "สมชาย ใจดี",
      position: "Senior Developer",
      department: "IT",
      avatar: "https://ui-avatars.com/api/?name=สมชาย+ใจดี",
      status: "pending",
      requestedDate: "2025-11-20",
    },
  ]);

  const [availablePeers] = useState<Peer[]>([
    { id: "2", name: "สมหญิง รักงาน", position: "Product Manager", department: "Product", avatar: "https://ui-avatars.com/api/?name=สมหญิง+รักงาน" },
    { id: "3", name: "วิชัย เก่งมาก", position: "Designer", department: "Design", avatar: "https://ui-avatars.com/api/?name=วิชัย+เก่งมาก" },
    { id: "4", name: "มาลี สวยงาม", position: "Marketing Manager", department: "Marketing", avatar: "https://ui-avatars.com/api/?name=มาลี+สวยงาม" },
  ]);

  const filteredPeers = availablePeers.filter(peer =>
    peer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    peer.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRequest = (peer: Peer) => {
    const newRequest: RequestedPeer = {
      ...peer,
      status: "pending",
      requestedDate: new Date().toISOString().split("T")[0],
    };
    setRequestedPeers([...requestedPeers, newRequest]);
  };

  const handleRemove = (id: string) => {
    setRequestedPeers(requestedPeers.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-app mb-2 font-display">
          360 Feedback Request
        </h1>
        <p className="text-muted font-light">
          ขอ feedback จากเพื่อนร่วมงาน
        </p>
      </div>

      {/* Requested Peers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-xl font-semibold text-app mb-4">Requested Feedback</h2>
        {requestedPeers.length > 0 ? (
          <div className="space-y-3">
            {requestedPeers.map((peer) => (
              <div
                key={peer.id}
                className="flex items-center justify-between p-4 bg-[var(--bg)] rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={peer.avatar}
                    alt={peer.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-app">{peer.name}</p>
                    <p className="text-sm text-muted">{peer.position} • {peer.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    peer.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-green-500/20 text-green-500"
                  }`}>
                    {peer.status === "pending" ? "Pending" : "Completed"}
                  </span>
                  <button
                    onClick={() => handleRemove(peer.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-all text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-center py-8">ยังไม่มีคำขอ feedback</p>
        )}
      </motion.div>

      {/* Search and Add Peers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-soft border border-app rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-xl font-semibold text-app mb-4">Search Colleagues</h2>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อหรือแผนก..."
            className="w-full pl-10 pr-4 py-3 bg-[var(--bg)] border border-app rounded-xl text-app"
          />
        </div>

        {/* Available Peers */}
        <div className="space-y-3">
          {filteredPeers
            .filter(peer => !requestedPeers.find(rp => rp.id === peer.id))
            .map((peer) => (
              <div
                key={peer.id}
                className="flex items-center justify-between p-4 bg-[var(--bg)] rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={peer.avatar}
                    alt={peer.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-app">{peer.name}</p>
                    <p className="text-sm text-muted">{peer.position} • {peer.department}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRequest(peer)}
                  className="flex items-center gap-2 px-4 py-2 bg-ptt-blue text-app rounded-xl font-medium hover:bg-ptt-blue/80 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  Request
                </button>
              </div>
            ))}
        </div>

        {filteredPeers.filter(peer => !requestedPeers.find(rp => rp.id === peer.id)).length === 0 && (
          <p className="text-muted text-center py-8">ไม่พบเพื่อนร่วมงาน</p>
        )}
      </motion.div>
    </div>
  );
}

