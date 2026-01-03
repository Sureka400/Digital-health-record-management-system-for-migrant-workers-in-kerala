import { motion } from "motion/react";
import { Scan, User, UserCog, Shield } from "lucide-react";
import { GlassCard } from "./GlassCard";

interface LoginScreenProps {
  onLogin: (role: "worker" | "doctor" | "admin") => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(0, 229, 255, 0.3), rgba(16, 185, 129, 0.3))",
              backdropFilter: "blur(20px)",
            }}
          >
            <Scan className="h-12 w-12 text-cyan-400" />
          </motion.div>
          <h1 className="mb-4 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Digital Health Record System
          </h1>
          <p className="text-xl text-gray-300">QR Code-Based Identity for Migrant Workers</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Worker Login */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => onLogin("worker")}
            className="cursor-pointer"
          >
            <GlassCard>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-cyan-500/20 p-6">
                  <User className="h-12 w-12 text-cyan-400" />
                </div>
                <h3 className="text-white">Worker</h3>
                <p className="text-sm text-gray-400">Access your health records and QR code</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 rounded-full bg-cyan-500/20 px-6 py-2 text-white backdrop-blur-sm hover:bg-cyan-500/30"
                >
                  Login
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Doctor Login */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => onLogin("doctor")}
            className="cursor-pointer"
          >
            <GlassCard>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-emerald-500/20 p-6">
                  <Shield className="h-12 w-12 text-emerald-400" />
                </div>
                <h3 className="text-white">Doctor</h3>
                <p className="text-sm text-gray-400">Scan QR codes and access patient records</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 rounded-full bg-emerald-500/20 px-6 py-2 text-white backdrop-blur-sm hover:bg-emerald-500/30"
                >
                  Login
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Admin Login */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => onLogin("admin")}
            className="cursor-pointer"
          >
            <GlassCard>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-blue-500/20 p-6">
                  <UserCog className="h-12 w-12 text-blue-400" />
                </div>
                <h3 className="text-white">Admin</h3>
                <p className="text-sm text-gray-400">Manage system and generate QR codes</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 rounded-full bg-blue-500/20 px-6 py-2 text-white backdrop-blur-sm hover:bg-blue-500/30"
                >
                  Login
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-sm text-gray-400"
        >
          <p>🔒 Government-grade security • Privacy protected • ISO certified</p>
          <p className="mt-2">v1.0.0 | Help & Support</p>
        </motion.div>
      </div>
    </div>
  );
}
