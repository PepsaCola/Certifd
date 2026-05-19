"use client";

import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";

export interface ChartDataPoint {
    name: string;
    issued: number;
    verifications: number;
}

type BackendChartResponse = Record<string, ChartDataPoint[]>;

const lineDataByPeriod: BackendChartResponse = {
    "7d": [
        { name: "Sat", issued: 10, verifications: 15 },
        { name: "Sun", issued: 5, verifications: 8 },
        { name: "Mon", issued: 15, verifications: 10 },
        { name: "Tue", issued: 25, verifications: 30 },
        { name: "Wed", issued: 20, verifications: 25 },
        { name: "Thu", issued: 45, verifications: 35 },
        { name: "Fri", issued: 30, verifications: 40 },
    ],
    "30d": [
        { name: "Feb 20", issued: 120, verifications: 90 },
        { name: "Feb 27", issued: 150, verifications: 110 },
        { name: "Mar 06", issued: 180, verifications: 160 },
        { name: "Mar 13", issued: 130, verifications: 140 },
        { name: "Mar 20", issued: 150, verifications: 160 },
    ],
    "90d": [
        { name: "Jan '26", issued: 450, verifications: 320 },
        { name: "Feb '26", issued: 520, verifications: 480 },
        { name: "Mar '26", issued: 380, verifications: 410 },
    ],
    "1y": [
        { name: "Apr '25", issued: 110, verifications: 80 },
        { name: "May '25", issued: 130, verifications: 100 },
        { name: "Jun '25", issued: 150, verifications: 120 },
        { name: "Jul '25", issued: 140, verifications: 110 },
        { name: "Aug '25", issued: 180, verifications: 140 },
        { name: "Sep '25", issued: 200, verifications: 170 },
        { name: "Oct '25", issued: 160, verifications: 130 },
        { name: "Nov '25", issued: 220, verifications: 180 },
        { name: "Dec '25", issued: 250, verifications: 210 },
        { name: "Jan '26", issued: 190, verifications: 160 },
        { name: "Feb '26", issued: 210, verifications: 190 },
        { name: "Mar '26", issued: 230, verifications: 200 },
    ],
};

const donutDataByPeriod: Record<string, { active: number; revoked: number; total: number }> = {
    "7d": { active: 148, revoked: 2, total: 150 },
    "30d": { active: 107, revoked: 3, total: 110 },
    "90d": { active: 1320, revoked: 30, total: 1350 },
    "1y": { active: 5800, revoked: 200, total: 6000 },
};

const COLORS = ["#00C48C", "#E7000B"];

interface ChartsRowProps {
    period: string;
}

export const ChartsRow = ({ period }: ChartsRowProps) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 800);
    };

    const currentLineData = lineDataByPeriod[period] || lineDataByPeriod["30d"];
    const currentDonutStats = donutDataByPeriod[period] || donutDataByPeriod["30d"];

    const donutChartData = [
        { name: "Active", value: currentDonutStats.active },
        { name: "Revoked", value: currentDonutStats.revoked },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-6">

            <div className="flex-[2] bg-white border border-[#E5E7EB] flex flex-col min-h-[320px] sm:min-h-[400px]">

                <div className="flex items-center justify-between mb-4 sm:mb-8 py-3 sm:py-4 px-4 sm:px-5 border-b border-[#D9DEE7]">
                    <div>
                        <h3 className="text-[14px] sm:text-[15px] font-semibold text-brand-dark leading-tight">Credentials Issued Over Time</h3>
                        <p className="text-[11px] sm:text-[12px] text-brand-secondary mt-1">Monthly issuance vs verifications ({period})</p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        className={`flex items-center gap-1.5 text-[11px] sm:text-[12px] font-medium text-brand-secondary transition-colors ${isRefreshing ? "opacity-50" : ""}`}
                    >
                        <img className={isRefreshing ? "animate-[spin_1s_linear_infinite_reverse]" : ""} src="/icons/refresh.svg" alt="Refresh"/>
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                </div>

                <div className="flex-1 w-full min-w-0 p-2 sm:p-5 pr-4 sm:pr-5 relative min-h-[250px]">
                    <div className="absolute inset-0 px-2 sm:px-5 pb-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={currentLineData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8C9BB0' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8C9BB0' }} />
                                <Tooltip contentStyle={{ borderRadius: '4px', border: '1px solid #E5E7EB', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontSize: '12px' }} />

                                <Line type="monotone" dataKey="issued" stroke="#2880B9" strokeWidth={2} dot={false} activeDot={{ r: 4 }} name="Issued" isAnimationActive={true} animationDuration={800} />
                                <Line type="monotone" dataKey="verifications" stroke="#00C48C" strokeWidth={2} dot={false} activeDot={{ r: 4 }} name="Verifications" isAnimationActive={true} animationDuration={800} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-4 sm:gap-6 pb-4 sm:pb-5 pt-2">
                    <div className="flex items-center gap-2 text-[11px] sm:text-[12px] text-[#2880B9] font-medium ">
                        <img src="/icons/graf-1.svg" alt="" className="w-3 h-3 sm:w-auto sm:h-auto" /> Issued
                    </div>
                    <div className="flex items-center gap-2 text-[11px] sm:text-[12px] text-[#00C48C] font-medium ">
                        <img src="/icons/graf-2.svg" alt="" className="w-3 h-3 sm:w-auto sm:h-auto" /> Verifications
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white border border-[#E5E7EB] flex flex-col min-h-[320px] sm:min-h-[400px]">

                <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-[#D9DEE7]">
                    <h3 className="text-[14px] sm:text-[15px] font-semibold text-brand-dark leading-tight">Active vs Revoked</h3>
                    <p className="text-[11px] sm:text-[12px] text-brand-secondary mt-1">Current credential status</p>
                </div>

                <div className="flex-1 flex flex-col p-4 sm:p-5 items-center justify-center relative min-h-[220px]">
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie
                                data={donutChartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={75}
                                outerRadius={95}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                                isAnimationActive={true}
                                animationDuration={800}
                            >
                                {donutChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '4px' }}/>
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-2">
                        <span className="text-[11px] font-semibold text-brand-secondary">Total:</span>
                        <span className="text-[24px] sm:text-[28px] font-normal text-brand-dark leading-none">
                            {currentDonutStats.total.toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pb-4 sm:pb-5 mt-auto px-2">
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C48C]"></span>
                        <span className="text-brand-secondary">Active:</span>
                        <span className="font-semibold text-brand-dark">{currentDonutStats.active.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E7000B]"></span>
                        <span className="text-brand-secondary">Revoked:</span>
                        <span className="font-semibold text-brand-dark">{currentDonutStats.revoked.toLocaleString()}</span>
                    </div>
                </div>

            </div>

        </div>
    );
};