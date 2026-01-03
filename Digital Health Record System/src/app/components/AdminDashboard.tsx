import { useState } from "react";
import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { Users, QrCode, Activity, TrendingUp, Shield, Plus, UserPlus, BarChart3, Settings } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import QRCodeGen from "react-qr-code";

type TabType = "overview" | "users" | "qr" | "analytics" | "settings";

const registrationData = [
  { month: "Jan", count: 450 },
  { month: "Feb", count: 520 },
  { month: "Mar", count: 680 },
  { month: "Apr", count: 750 },
  { month: "May", count: 890 },
  { month: "Jun", count: 1020 },
];

const healthStatus = [
  { name: "Healthy", value: 75, color: "#10b981" },
  { name: "Under Treatment", value: 20, color: "#f59e0b" },
  { name: "Critical", value: 5, color: "#ef4444" },
];

const usersList = [
  { name: "Raj Kumar", id: "MWH-2025-000123", type: "Worker", status: "Active", date: "2025-01-15" },
  { name: "Dr. Sarah Johnson", id: "DOC-2025-001", type: "Doctor", status: "Active", date: "2024-06-20" },
  { name: "Priya Singh", id: "MWH-2025-000124", type: "Worker", status: "Active", date: "2025-01-10" },
  { name: "Admin User", id: "ADM-2025-001", type: "Admin", status: "Active", date: "2024-01-01" },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [newQRId, setNewQRId] = useState("");
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);

  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: BarChart3 },
    { id: "users" as TabType, label: "Users", icon: Users },
    { id: "qr" as TabType, label: "QR Management", icon: QrCode },
    { id: "analytics" as TabType, label: "Analytics", icon: Activity },
    { id: "settings" as TabType, label: "Settings", icon: Settings },
  ];

  const handleGenerateQR = () => {
    if (newQRId) {
      setGeneratedQR(`MWH-2025-${newQRId}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-300">System Management & Analytics</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3 backdrop-blur-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-500/30 text-white"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <>
            {/* Stats Cards */}
            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <GlassCard>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-blue-500/20 p-3">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Workers</p>
                    <p className="text-3xl text-white">12,450</p>
                    <p className="text-xs text-emerald-400">+12% this month</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-purple-500/20 p-3">
                    <QrCode className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">QR Codes Generated</p>
                    <p className="text-3xl text-white">12,450</p>
                    <p className="text-xs text-cyan-400">100% coverage</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-emerald-500/20 p-3">
                    <Activity className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Active Cases</p>
                    <p className="text-3xl text-white">3,120</p>
                    <p className="text-xs text-orange-400">Under monitoring</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-cyan-500/20 p-3">
                    <TrendingUp className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Scans Today</p>
                    <p className="text-3xl text-white">847</p>
                    <p className="text-xs text-emerald-400">+8% vs yesterday</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Registration Trends */}
              <GlassCard>
                <h3 className="mb-6 text-white">Worker Registration Trends</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={registrationData}>
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(0, 0, 0, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </GlassCard>

              {/* Health Status Distribution */}
              <GlassCard>
                <h3 className="mb-6 text-white">Health Status Distribution</h3>
                <div className="flex items-center gap-8">
                  <ResponsiveContainer width="50%" height={200}>
                    <PieChart>
                      <Pie
                        data={healthStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {healthStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-3">
                    {healthStatus.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <p className="text-white">{item.name}</p>
                          <p className="text-sm text-gray-400">{item.value}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* System Status */}
              <GlassCard>
                <div className="mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-emerald-400" />
                  <h3 className="text-white">System Status</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-gray-400">Database</span>
                      <span className="text-sm text-emerald-400">Operational</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-gray-400">QR Scanner</span>
                      <span className="text-sm text-emerald-400">Active</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-gray-400">Security</span>
                      <span className="text-sm text-emerald-400">Secured</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </>
        )}

        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-white">User Management</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full bg-blue-500/20 px-6 py-3 text-white hover:bg-blue-500/30"
              >
                <UserPlus className="h-5 w-5" />
                Add User
              </motion.button>
            </div>
            <GlassCard>
              <div className="space-y-4">
                {usersList.map((user, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between rounded-xl bg-white/5 p-6 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-500/20 p-3">
                        <Users className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="mb-1 text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.id}</p>
                        <p className="mt-1 text-xs text-gray-500">Added: {user.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-purple-500/20 px-4 py-2">
                        <span className="text-sm text-purple-400">{user.type}</span>
                      </div>
                      <div className="rounded-full bg-emerald-500/20 px-4 py-2">
                        <span className="text-sm text-emerald-400">{user.status}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm text-white hover:bg-cyan-500/30"
                      >
                        Edit
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === "qr" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard>
              <h3 className="mb-6 text-white">Generate New QR Code</h3>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Worker Name</label>
                  <input
                    type="text"
                    placeholder="Enter worker name"
                    className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:bg-white/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Worker ID Number</label>
                  <input
                    type="text"
                    placeholder="Enter ID number"
                    value={newQRId}
                    onChange={(e) => setNewQRId(e.target.value)}
                    className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:bg-white/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Contact Number</label>
                  <input
                    type="text"
                    placeholder="Enter contact number"
                    className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:bg-white/10"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerateQR}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-500/20 py-4 text-white hover:bg-blue-500/30"
                >
                  <Plus className="h-5 w-5" />
                  Generate QR Code
                </motion.button>
              </div>
            </GlassCard>

            {generatedQR && (
              <GlassCard>
                <h3 className="mb-6 text-white">Generated QR Code</h3>
                <div className="flex flex-col items-center gap-6">
                  <div className="rounded-2xl bg-white p-6">
                    <QRCodeGen value={generatedQR} size={200} />
                  </div>
                  <div className="text-center">
                    <p className="mb-1 text-white">Health ID</p>
                    <p className="text-2xl text-cyan-400">{generatedQR}</p>
                  </div>
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="rounded-full bg-emerald-500/20 px-6 py-2 text-white hover:bg-emerald-500/30"
                    >
                      Download
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="rounded-full bg-cyan-500/20 px-6 py-2 text-white hover:bg-cyan-500/30"
                    >
                      Print
                    </motion.button>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <GlassCard>
              <h3 className="mb-6 text-white">Monthly Statistics</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={registrationData}>
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(0, 0, 0, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>

            <div className="grid gap-6 md:grid-cols-3">
              <GlassCard>
                <h3 className="mb-4 text-white">Daily Scans</h3>
                <p className="mb-2 text-4xl text-cyan-400">847</p>
                <p className="text-sm text-emerald-400">+8.2% vs yesterday</p>
              </GlassCard>
              <GlassCard>
                <h3 className="mb-4 text-white">New Registrations</h3>
                <p className="mb-2 text-4xl text-purple-400">124</p>
                <p className="text-sm text-emerald-400">+15% this week</p>
              </GlassCard>
              <GlassCard>
                <h3 className="mb-4 text-white">Hospital Visits</h3>
                <p className="mb-2 text-4xl text-emerald-400">456</p>
                <p className="text-sm text-cyan-400">Today's count</p>
              </GlassCard>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <GlassCard>
              <h3 className="mb-6 text-white">System Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm text-gray-400">System Name</label>
                  <input
                    type="text"
                    defaultValue="Digital Health Record System"
                    className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none focus:bg-white/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-400">Default Language</label>
                  <select className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none focus:bg-white/10">
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="te">Telugu</option>
                    <option value="ta">Tamil</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-3 text-sm text-gray-400">
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                    Enable QR Code Auto-Generation
                  </label>
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-3 text-sm text-gray-400">
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                    Send SMS Notifications
                  </label>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-full bg-blue-500/20 py-3 text-white hover:bg-blue-500/30"
                >
                  Save Settings
                </motion.button>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
