"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { api } from "@/services/api";
import { ArrowUpRight, ArrowDownRight, Wallet, Activity } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

interface SummaryData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  categoryBreakdown?: any;
}

export const OverviewCards = () => {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore(s => s.user);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/summary");
        if (res.data?.success) setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch summary", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
       fetchSummary();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
         {[1,2,3,4].map(i => <Card key={i} className="h-40 animate-pulse bg-white/5 border-white/5 flex items-center justify-center" disableHover />)}
      </div>
    );
  }

  const topCategory = data?.categoryBreakdown 
     ? Object.entries(data.categoryBreakdown).sort((a: any, b: any) => b[1].expense - a[1].expense)[0]
     : null;
  const categoryVelocity = topCategory ? `${topCategory[0]}` : "N/A";
  const categoryVelocityValue = topCategory ? (topCategory[1] as any).expense : 0;

  const items = [
    { title: "Net Balance", value: data?.balance || 0, icon: Wallet, color: "var(--color-primary-start)", bg: "from-[var(--color-primary-start)]/20 to-transparent", glowClass: "shadow-[0_0_30px_rgba(99,102,241,0.15)] border-indigo-500/30" },
    { title: "Total Income", value: data?.totalIncome || 0, icon: ArrowUpRight, color: "var(--color-success)", bg: "from-[var(--color-success)]/20 to-transparent", glowClass: "shadow-[0_0_30px_rgba(34,197,94,0.15)] border-green-500/30" },
    { title: "Total Expense", value: data?.totalExpense || 0, icon: ArrowDownRight, color: "var(--color-danger)", bg: "from-[var(--color-danger)]/20 to-transparent", glowClass: "shadow-[0_0_30px_rgba(239,68,68,0.15)] border-red-500/30" },
    { title: "Category Velocity", subtitle: categoryVelocity, value: categoryVelocityValue, icon: Activity, color: "var(--color-primary-end)", bg: "from-[var(--color-primary-end)]/20 to-transparent", glowClass: "shadow-[0_0_30px_rgba(168,85,247,0.15)] border-purple-500/30" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
      {items.map((item, i) => (
        <Card 
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
          className={`relative overflow-hidden ${item.glowClass}`}
        >
          <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full blur-[40px] bg-gradient-to-br ${item.bg}`} />
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--color-glass)] border border-[var(--color-glass-border)] shadow-lg relative overflow-hidden">
               <div className={`absolute inset-0 bg-gradient-to-br transition-opacity ${item.bg} opacity-50`} />
               <item.icon className="w-6 h-6 relative z-10" style={{ color: item.color }} />
            </div>
          </div>
          <div className="text-white/60 text-xs font-bold mb-2 tracking-widest uppercase">{item.title}</div>
          <div className="text-3xl lg:text-4xl font-black font-mono text-white tracking-tighter">
            ${item.value.toLocaleString()}
          </div>
          {item.subtitle && <div className="text-[10px] font-bold text-white/40 mt-3 tracking-widest uppercase">{item.subtitle} (Target)</div>}
        </Card>
      ))}
    </div>
  );
};
