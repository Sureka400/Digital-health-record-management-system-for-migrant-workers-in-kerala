import { motion } from "motion/react";
import QRCode from "react-qr-code";
import { Download, Lock, Share2 } from "lucide-react";

interface QRCodeCardProps {
  healthId: string;
  workerName: string;
  workerPhoto?: string;
}

export function QRCodeCard({ healthId, workerName, workerPhoto }: QRCodeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl p-1"
      style={{
        background: "linear-gradient(135deg, rgba(0, 229, 255, 0.3), rgba(16, 185, 129, 0.3))",
      }}
    >
      {/* Inner glassmorphic card */}
      <div
        className="relative overflow-hidden rounded-3xl p-8"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        }}
      >
        {/* Scan wave animation */}
        <motion.div
          className="absolute inset-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{
            y: [0, 400, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            opacity: 0.5,
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Lock icon overlay */}
          <div className="absolute -right-4 -top-4">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="rounded-full bg-emerald-500/20 p-3 backdrop-blur-sm"
            >
              <Lock className="h-6 w-6 text-emerald-400" />
            </motion.div>
          </div>

          {/* Worker info */}
          {workerPhoto && (
            <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-cyan-400/50">
              <img src={workerPhoto} alt={workerName} className="h-full w-full object-cover" />
            </div>
          )}

          <div className="text-center">
            <h3 className="text-white">{workerName}</h3>
            <p className="text-sm text-gray-300">Health ID: {healthId}</p>
          </div>

          {/* QR Code with glow */}
          <motion.div
            className="relative rounded-2xl bg-white p-6"
            whileHover={{ scale: 1.05 }}
            style={{
              boxShadow: "0 0 30px rgba(0, 229, 255, 0.5)",
            }}
          >
            <QRCode value={healthId} size={200} />
          </motion.div>

          {/* Label */}
          <div className="text-center">
            <p className="text-lg text-white">Scan for Medical Records</p>
            <p className="text-sm text-gray-400">Present this code at any hospital</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-cyan-500/20 px-6 py-3 text-white backdrop-blur-sm hover:bg-cyan-500/30"
            >
              <Download className="h-5 w-5" />
              Download
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-6 py-3 text-white backdrop-blur-sm hover:bg-emerald-500/30"
            >
              <Share2 className="h-5 w-5" />
              Share
            </motion.button>
          </div>

          {/* Secure badge */}
          <div className="flex items-center gap-2 text-emerald-400">
            <Lock className="h-4 w-4" />
            <span className="text-sm">Secure Scan</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
