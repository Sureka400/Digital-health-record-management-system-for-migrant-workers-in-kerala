import { useState } from "react";
import { motion } from "motion/react";
import { LoginScreen } from "./components/LoginScreen";
import { WorkerDashboard } from "./components/WorkerDashboard";
import { DoctorDashboard } from "./components/DoctorDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { LogOut } from "lucide-react";

type UserRole = "worker" | "doctor" | "admin" | null;

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);

  const handleLogin = (role: UserRole) => {
    setCurrentRole(role);
  };

  const handleLogout = () => {
    setCurrentRole(null);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f766e 100%)",
      }}
    >
      {/* Animated background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-64 -top-64 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-64 bottom-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Logout button */}
      {currentRole && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleLogout}
          className="fixed right-8 top-8 z-50 flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-white backdrop-blur-sm hover:bg-white/20"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </motion.button>
      )}

      {/* Main content */}
      <div className="relative z-10">
        {!currentRole && <LoginScreen onLogin={handleLogin} />}
        {currentRole === "worker" && <WorkerDashboard />}
        {currentRole === "doctor" && <DoctorDashboard />}
        {currentRole === "admin" && <AdminDashboard />}
      </div>
    </div>
  );
}
