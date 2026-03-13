"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
} from "recharts";

const data = [
    { name: "Mon", hours: 2 },
    { name: "Tue", hours: 4 },
    { name: "Wed", hours: 3 },
    { name: "Thu", hours: 5 },
    { name: "Fri", hours: 4 },
    { name: "Sat", hours: 6 },
    { name: "Sun", hours: 3 },
];

export function LearningTrendChart() {
    return (
        <div className="h-[300px] w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="#94a3b8"
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(0,0,0,0.8)" }}
                        itemStyle={{ color: "#fff" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="hours"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorHours)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

const skillData = [
    { name: "AI/ML", score: 80 },
    { name: "Full Stack", score: 65 },
    { name: "CyberSec", score: 40 },
    { name: "Solidity", score: 20 },
];

export function SkillDistributionChart() {
    return (
        <div className="h-[300px] w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        width={80}
                        stroke="#94a3b8"
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{ borderRadius: "12px", border: "none", backgroundColor: "rgba(0,0,0,0.9)" }}
                    />
                    <Bar dataKey="score" fill="#ec4899" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
