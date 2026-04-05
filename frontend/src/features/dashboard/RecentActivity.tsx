"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Card } from "@/components/ui/Card";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

export const RecentActivity = () => {
    const [records, setRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const res = await api.get("/records", { params: { limit: 5, sort: "date", order: "desc" }});
                if (res.data?.success) setRecords(res.data.data);
            } catch (err) {
                console.error("Failed to fetch recent activity", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecent();
    }, []);

    if (loading) return <div className="h-64 bg-white/5 rounded-2xl animate-pulse mt-8" />;

    return (
        <Card disableHover className="mt-8 p-6 z-10 relative border-t-white/10">
            <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-white/50" />
                <h3 className="text-white/90 font-semibold">Recent Activity</h3>
            </div>
            
            {records.length === 0 ? (
                <div className="py-8 text-center text-white/40 text-sm">No recent transactions found.</div>
            ) : (
                <div className="flex flex-col gap-4">
                    {records.map(record => (
                        <div key={record.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-colors">
                            <div className="flex flex-col">
                                <span className="font-medium text-white/90">{record.title}</span>
                                <span className="text-xs text-white/40 mt-1">{record.category} • {new Date(record.date).toLocaleDateString()}</span>
                            </div>
                            <div className={`flex items-center gap-1 font-bold ${record.type === "INCOME" ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}`}>
                                {record.type === "INCOME" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                ${record.amount.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};
