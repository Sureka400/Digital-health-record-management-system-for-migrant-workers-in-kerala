import { useState } from "react";
import { motion } from "motion/react";
import { GlassCard } from "./GlassCard";
import { Scan, User, FileText, Upload, AlertTriangle, CheckCircle, Calendar, Users, Clipboard, Settings } from "lucide-react";

type TabType = "scan" | "patients" | "appointments" | "prescriptions";

const patientsList = [
  { id: "MWH-2025-000123", name: "Raj Kumar", age: 32, gender: "Male", lastVisit: "2025-12-15", status: "Active" },
  { id: "MWH-2025-000124", name: "Priya Singh", age: 28, gender: "Female", lastVisit: "2025-12-10", status: "Active" },
  { id: "MWH-2025-000125", name: "Arjun Patel", age: 35, gender: "Male", lastVisit: "2025-12-05", status: "Active" },
];

const appointments = [
  { time: "09:00 AM", patient: "Raj Kumar", type: "Follow-up", status: "Scheduled" },
  { time: "10:30 AM", patient: "Priya Singh", type: "Checkup", status: "Scheduled" },
  { time: "02:00 PM", patient: "Arjun Patel", type: "Consultation", status: "Scheduled" },
  { time: "04:00 PM", patient: "Lakshmi Devi", type: "Review", status: "Completed" },
];

export function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("scan");
  const [scannedPatient, setScannedPatient] = useState<string | null>(null);

  const tabs = [
    { id: "scan" as TabType, label: "Scan Patient", icon: Scan },
    { id: "patients" as TabType, label: "Patients", icon: Users },
    { id: "appointments" as TabType, label: "Appointments", icon: Calendar },
    { id: "prescriptions" as TabType, label: "Prescriptions", icon: Clipboard },
  ];

  const handleScan = () => {
    setTimeout(() => {
      setScannedPatient("Raj Kumar");
    }, 1000);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Doctor Dashboard
          </h1>
          <p className="text-gray-300">Dr. Sarah Johnson • City Hospital</p>
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
                    ? "bg-emerald-500/30 text-white"
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
        {activeTab === "scan" && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* QR Scanner */}
            <div className="lg:col-span-1">
              <GlassCard>
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
                    <Scan className="h-24 w-24 text-emerald-400" />
                  </div>

                  <div>
                    <h3 className="mb-2 text-white">Scan Patient QR Code</h3>
                    <p className="text-sm text-gray-400">Point camera at patient's health QR code</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleScan}
                    className="w-full rounded-full bg-emerald-500/20 py-3 text-white backdrop-blur-sm hover:bg-emerald-500/30"
                  >
                    Start Scanning
                  </motion.button>

                  {scannedPatient && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 text-emerald-400"
                    >
                      <CheckCircle className="h-5 w-5" />
                      <span>Patient Loaded</span>
                    </motion.div>
                  )}
                </div>
              </GlassCard>
            </div>

            {/* Patient Records */}
            <div className="space-y-6 lg:col-span-2">
              {scannedPatient ? (
                <>
                  <GlassCard>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-cyan-500/20 p-4">
                        <User className="h-8 w-8 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white">{scannedPatient}</h3>
                        <p className="text-sm text-gray-400">ID: MWH-2025-000123 • Age: 32 • Male</p>
                      </div>
                      <div className="rounded-full bg-emerald-500/20 px-4 py-2">
                        <span className="text-sm text-emerald-400">Active</span>
                      </div>
                    </div>
                  </GlassCard>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <GlassCard>
                      <p className="mb-2 text-sm text-gray-400">Blood Pressure</p>
                      <p className="mb-1 text-3xl text-white">120/80</p>
                      <p className="text-xs text-emerald-400">Normal</p>
                    </GlassCard>
                    <GlassCard>
                      <p className="mb-2 text-sm text-gray-400">Heart Rate</p>
                      <p className="mb-1 text-3xl text-white">72 bpm</p>
                      <p className="text-xs text-emerald-400">Normal</p>
                    </GlassCard>
                    <GlassCard>
                      <p className="mb-2 text-sm text-gray-400">Temperature</p>
                      <p className="mb-1 text-3xl text-white">98.6°F</p>
                      <p className="text-xs text-emerald-400">Normal</p>
                    </GlassCard>
                  </div>

                  <GlassCard>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-cyan-400" />
                        <h3 className="text-white">Medical History</h3>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm text-white hover:bg-cyan-500/30"
                      >
                        View All
                      </motion.button>
                    </div>
                    <div className="space-y-3">
                      <div className="rounded-lg bg-white/5 p-4">
                        <p className="mb-1 text-white">General Checkup</p>
                        <p className="text-sm text-gray-400">Dec 15, 2025 • Dr. Smith</p>
                      </div>
                      <div className="rounded-lg bg-white/5 p-4">
                        <p className="mb-1 text-white">Vaccination</p>
                        <p className="text-sm text-gray-400">Nov 3, 2025 • Dr. Johnson</p>
                      </div>
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <div className="mb-4 flex items-center gap-2">
                      <AlertTriangle className="h-6 w-6 text-orange-400" />
                      <h3 className="text-white">Allergies & Warnings</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="rounded-lg bg-orange-500/10 p-3 text-orange-400">
                        Penicillin allergy
                      </div>
                      <div className="rounded-lg bg-orange-500/10 p-3 text-orange-400">
                        Latex sensitivity
                      </div>
                    </div>
                  </GlassCard>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/20 py-4 text-white backdrop-blur-sm hover:bg-emerald-500/30"
                    >
                      <Upload className="h-5 w-5" />
                      Upload Report
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500/20 py-4 text-white backdrop-blur-sm hover:bg-cyan-500/30"
                    >
                      <FileText className="h-5 w-5" />
                      Add Prescription
                    </motion.button>
                  </div>
                </>
              ) : (
                <GlassCard className="flex h-96 items-center justify-center">
                  <div className="text-center">
                    <Scan className="mx-auto mb-4 h-16 w-16 text-gray-500" />
                    <p className="text-gray-400">Scan a patient QR code to view records</p>
                  </div>
                </GlassCard>
              )}
            </div>
          </div>
        )}

        {activeTab === "patients" && (
          <GlassCard>
            <h3 className="mb-6 text-white">My Patients</h3>
            <div className="space-y-4">
              {patientsList.map((patient, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between rounded-xl bg-white/5 p-6 hover:bg-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-cyan-500/20 p-3">
                      <User className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="mb-1 text-white">{patient.name}</p>
                      <p className="text-sm text-gray-400">
                        {patient.id} • {patient.age}y • {patient.gender}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">Last visit: {patient.lastVisit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-emerald-500/20 px-4 py-2">
                      <span className="text-sm text-emerald-400">{patient.status}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm text-white hover:bg-cyan-500/30"
                    >
                      View Records
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        )}

        {activeTab === "appointments" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard>
              <h3 className="mb-6 text-white">Today's Appointments</h3>
              <div className="space-y-4">
                {appointments
                  .filter((apt) => apt.status === "Scheduled")
                  .map((apt, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-xl bg-cyan-500/10 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-cyan-500/20 p-2">
                            <Calendar className="h-5 w-5 text-cyan-400" />
                          </div>
                          <div>
                            <p className="text-white">{apt.patient}</p>
                            <p className="text-sm text-gray-400">{apt.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-cyan-400">{apt.time}</p>
                          <p className="text-xs text-gray-500">{apt.status}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="mb-6 text-white">Completed Appointments</h3>
              <div className="space-y-4">
                {appointments
                  .filter((apt) => apt.status === "Completed")
                  .map((apt, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-xl bg-white/5 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-emerald-500/20 p-2">
                            <CheckCircle className="h-5 w-5 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-white">{apt.patient}</p>
                            <p className="text-sm text-gray-400">{apt.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400">{apt.time}</p>
                          <p className="text-xs text-emerald-400">{apt.status}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === "prescriptions" && (
          <GlassCard>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-white">Write Prescription</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-emerald-500/20 px-6 py-2 text-white hover:bg-emerald-500/30"
              >
                Save Prescription
              </motion.button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm text-gray-400">Patient Name</label>
                <input
                  type="text"
                  placeholder="Enter patient name or scan QR"
                  className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:bg-white/10"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-400">Diagnosis</label>
                <textarea
                  placeholder="Enter diagnosis"
                  rows={3}
                  className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:bg-white/10"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-400">Medications</label>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Medicine name"
                      className="flex-1 rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:bg-white/10"
                    />
                    <input
                      type="text"
                      placeholder="Dosage"
                      className="w-40 rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:bg-white/10"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    + Add another medication
                  </motion.button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-400">Instructions</label>
                <textarea
                  placeholder="Additional instructions for the patient"
                  rows={4}
                  className="w-full rounded-lg bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:bg-white/10"
                />
              </div>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
