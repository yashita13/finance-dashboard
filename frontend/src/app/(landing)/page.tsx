"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-primary-start)]/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-blue-500/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-purple-500/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Floating Glass Shapes */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[15%] w-32 h-32 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl hidden md:block"
      />
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[30%] right-[15%] w-48 h-48 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl hidden md:block"
      />

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter">MoneyBoard</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-6 py-2 rounded-full font-bold text-sm bg-white/10 hover:bg-white/20 transition-all border border-white/10">Log In</Link>
          <Link href="/register" className="px-6 py-2 rounded-full font-bold text-sm bg-white text-black hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">Terminal Access</Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="flex flex-col items-center text-center max-w-4xl"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-xs font-bold tracking-widest text-white/70 uppercase">Status Protocol Live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-t from-white/40 via-white to-white mb-6">
            Track Assets.<br/>Scale Wealth.
          </h1>
          
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 font-medium">
             High-density cyber-infrastructure for advanced fiscal management.
             Deploy your intelligence protocol today.
          </p>
          
          <Link href="/register">
             <button className="group relative px-8 py-4 bg-white text-black font-black tracking-wide rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-all duration-300">
               <span className="relative z-10 flex items-center gap-2">
                 INITIALIZE DASHBOARD
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </span>
               <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
             </button>
          </Link>
        </motion.div>
      </main>

      {/* Dynamic Ticker */}
      <div className="absolute bottom-0 left-0 w-full bg-black/50 backdrop-blur-xl border-t border-white/10 py-3 overflow-hidden flex whitespace-nowrap z-20">
         <motion.div 
           animate={{ x: ["0%", "-50%"] }}
           transition={{ duration: 20, ease: "linear", repeat: Infinity }}
           className="flex items-center gap-12 font-mono text-xs font-bold text-white/40 uppercase tracking-widest w-max"
         >
           {Array.from({ length: 8 }).map((_, i) => (
             <span key={i} className="flex items-center gap-3">
               <ShieldCheck className="w-4 h-4 text-green-500/50" />
               ZERO-TRUST GUARD PROTECTED
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 ml-12" />
               99.9% UPTIME METRICS
               <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 ml-12" />
               END-TO-END ENCRYPTION PROTOCOL
             </span>
           ))}
         </motion.div>
      </div>
    </div>
  );
}
