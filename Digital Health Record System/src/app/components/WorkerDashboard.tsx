import { useState } from "react";
import { motion } from "motion/react";
import { QRCodeCard } from "./QRCodeCard";
import { GlassCard } from "./GlassCard";
import { Activity, AlertCircle, Calendar, FileText, Heart, Pill, ClipboardList, FolderOpen } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const healthData = [
  { month: "Jan", bp: 120, sugar: 95 },
  { month: "Feb", bp: 118, sugar: 92 },
  { month: "Mar", bp: 122, sugar: 98 },
  { month: "Apr", bp: 119, sugar: 94 },
  { month: "May", bp: 121, sugar: 96 },
  { month: "Jun", bp: 117, sugar: 91 },
];

const medicalHistory = [
  { date: "2025-12-15", type: "Checkup", doctor: "Dr. Smith", hospital: "City Hospital", diagnosis: "Routine checkup, all normal" },
  { date: "2025-11-03", type: "Vaccination", doctor: "Dr. Johnson", hospital: "Health Center", diagnosis: "Flu vaccine administered" },
  { date: "2025-09-20", type: "Treatment", doctor: "Dr. Williams", hospital: "General Hospital", diagnosis: "Minor injury treatment" },
  { date: "2025-07-10", type: "Lab Test", doctor: "Dr. Brown", hospital: "Medical Lab", diagnosis: "Blood work - all parameters normal" },
];

const medications = [
  { name: "Vitamin D3", dosage: "1000 IU daily", status: "Active", startDate: "2025-06-01" },
  { name: "Multivitamin", dosage: "1 tablet daily", status: "Active", startDate: "2025-06-01" },
  { name: "Pain Relief", dosage: "As needed", status: "Completed", startDate: "2025-09-20", endDate: "2025-09-30" },
];

const reports = [
  { name: "Blood Test Report", date: "2025-12-15", type: "Lab Report", status: "Normal" },
  { name: "X-Ray Chest", date: "2025-11-03", type: "Imaging", status: "Normal" },
  { name: "ECG Report", date: "2025-09-20", type: "Cardiac", status: "Normal" },
];

type TabType = "health" | "history" | "reports" | "medications";

export function WorkerDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("health");

  const tabs = [
    { id: "health" as TabType, label: "My Health", icon: Heart },
    { id: "history" as TabType, label: "Medical History", icon: ClipboardList },
    { id: "reports" as TabType, label: "Reports", icon: FolderOpen },
    { id: "medications" as TabType, label: "Medications", icon: Pill },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Worker Dashboard
          </h1>
          <p className="text-gray-300">Welcome back, Raj Kumar</p>
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
                    ? "bg-cyan-500/30 text-white"
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
        {activeTab === "health" && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - QR Code */}
            <div className="lg:col-span-1">
              <QRCodeCard healthId="MWH-2025-000123" workerName="Raj Kumar" />

              {/* Emergency Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white shadow-lg"
              >
                <div className="flex items-center justify-center gap-3">
                  <AlertCircle className="h-8 w-8 animate-pulse" />
                  <span className="text-xl">Emergency Access</span>
                </div>
              </motion.button>
            </div>

            {/* Right Column - Health Info */}
            <div className="space-y-6 lg:col-span-2">
              {/* Health Summary Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <GlassCard className="flex items-center gap-4">
                  <div className="rounded-full bg-red-500/20 p-3">
                    <Heart className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Blood Pressure</p>
                    <p className="text-2xl text-white">120/80</p>
                    <p className="text-xs text-emerald-400">Normal</p>
                  </div>
                </GlassCard>

                <GlassCard className="flex items-center gap-4">
                  <div className="rounded-full bg-blue-500/20 p-3">
                    <Activity className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Blood Sugar</p>
                    <p className="text-2xl text-white">95 mg/dL</p>
                    <p className="text-xs text-emerald-400">Normal</p>
                  </div>
                </GlassCard>

                <GlassCard className="flex items-center gap-4">
                  <div className="rounded-full bg-purple-500/20 p-3">
                    <Pill className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Medications</p>
                    <p className="text-2xl text-white">2 Active</p>
                    <p className="text-xs text-cyan-400">Ongoing</p>
                  </div>
                </GlassCard>
              </div>

              {/* Health Chart */}
              <GlassCard>
                <h3 className="mb-4 text-white">Health Trends (Last 6 Months)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={healthData}>
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(0, 0, 0, 0.8)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="bp" stroke="#06b6d4" strokeWidth={2} name="Blood Pressure" />
                    <Line type="monotone" dataKey="sugar" stroke="#10b981" strokeWidth={2} name="Blood Sugar" />
                  </LineChart>
                </ResponsiveContainer>
              </GlassCard>

              {/* Recent Checkup */}
              <GlassCard>
                <h3 className="mb-4 text-white">Last Checkup</h3>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-emerald-500/20 p-4">
                    <Calendar className="h-8 w-8 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 text-white">General Health Checkup</p>
                    <p className="text-sm text-gray-400">December 15, 2025 • Dr. Smith • City Hospital</p>
                    <p className="mt-2 text-sm text-emerald-400">All parameters normal</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <GlassCard>
            <div className="mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-cyan-400" />
              <h3 className="text-white">Complete Medical History</h3>
            </div>
            <div className="space-y-4">
              {medicalHistory.map((record, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl bg-white/5 p-6 hover:bg-white/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-cyan-400" />
                        <span className="text-white">{record.type}</span>
                        <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-400">
                          {record.date}
                        </span>
                      </div>
                      <p className="mb-2 text-sm text-gray-300">{record.diagnosis}</p>
                      <p className="text-sm text-gray-500">
                        {record.doctor} • {record.hospital}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        )}

        {activeTab === "reports" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-purple-500/20 p-3">
                      <FileText className="h-6 w-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white">{report.name}</p>
                      <p className="text-sm text-gray-400">{report.type}</p>
                    </div>
                  </div>
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-gray-400">{report.date}</span>
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-400">
                      {report.status}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-lg bg-cyan-500/20 py-2 text-sm text-white hover:bg-cyan-500/30"
                  >
                    View Report
                  </motion.button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "medications" && (
          <div className="space-y-6">
            <GlassCard>
              <h3 className="mb-6 text-white">Active Medications</h3>
              <div className="space-y-4">
                {medications
                  .filter((med) => med.status === "Active")
                  .map((med, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 rounded-xl bg-emerald-500/10 p-4"
                    >
                      <div className="rounded-full bg-emerald-500/20 p-3">
                        <Pill className="h-6 w-6 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <p className="mb-1 text-white">{med.name}</p>
                        <p className="text-sm text-gray-400">{med.dosage}</p>
                        <p className="mt-1 text-xs text-gray-500">Started: {med.startDate}</p>
                      </div>
                      <div className="rounded-full bg-emerald-500/20 px-4 py-2">
                        <span className="text-sm text-emerald-400">{med.status}</span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="mb-6 text-white">Past Medications</h3>
              <div className="space-y-4">
                {medications
                  .filter((med) => med.status === "Completed")
                  .map((med, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 rounded-xl bg-white/5 p-4"
                    >
                      <div className="rounded-full bg-gray-500/20 p-3">
                        <Pill className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="mb-1 text-white">{med.name}</p>
                        <p className="text-sm text-gray-400">{med.dosage}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {med.startDate} - {med.endDate}
                        </p>
                      </div>
                      <div className="rounded-full bg-gray-500/20 px-4 py-2">
                        <span className="text-sm text-gray-400">{med.status}</span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
