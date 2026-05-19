"use client";

import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

type ActivityType = 'issue' | 'verify' | 'revoke' | 'staff' | 'approve';

export interface Activity {
    id: string;
    type: ActivityType;
    title: string;
    desc: string;
    time: string;
    user: string;
}

const mockActivities: Activity[] = [
    { id: '1', type: 'issue', title: 'Batch issued', desc: 'graduates_june_2026.csv · 5 credentials', time: '2 hours ago', user: 'John Smith' },
    { id: '2', type: 'verify', title: 'Certificate verified', desc: 'CRT-2025-0090 · Lucas Ferreira · Medicine', time: '4 hours ago', user: 'Emily Chen' },
    { id: '3', type: 'revoke', title: 'Certificate revoked', desc: 'CRT-2026-0003 · Priya Sharma · Eng.', time: 'Yesterday', user: 'John Smith' },
    { id: '4', type: 'staff', title: 'Staff added', desc: 'Mr. David Okonkwo · Verifier', time: '2 days ago', user: 'John Smith' },
    { id: '5', type: 'approve', title: 'Request approved', desc: 'REQ-2026-0043', time: '3 days ago', user: 'Ravi Krishnamurthy' },
];

const barData = [
    { name: "Mon", value: 32 },
    { name: "Tue", value: 62 },
    { name: "Wed", value: 30 },
    { name: "Thu", value: 65 },
    { name: "Fri", value: 45 },
    { name: "Sat", value: 33 },
    { name: "Sun", value: 45 },
];


export const ActivityRow = () => {
    const [isRefreshingBar, setIsRefreshingBar] = useState(false);
    const [isRefreshingList, setIsRefreshingList] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleRefreshBar = () => {
        setIsRefreshingBar(true);
        setTimeout(() => setIsRefreshingBar(false), 800);
    };

    const handleRefreshList = () => {
        setIsRefreshingList(true);
        setTimeout(() => setIsRefreshingList(false), 800);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 pb-6 sm:pb-10">

            <div className="flex-1 bg-white border border-[#E5E7EB] flex flex-col min-h-[320px] sm:min-h-[400px]">
                <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-[#D9DEE7]">
                    <div>
                        <h3 className="text-[14px] sm:text-[15px] font-semibold text-brand-dark leading-tight">Verification Activity</h3>
                        <p className="text-[11px] sm:text-[12px] text-brand-secondary mt-1">Daily verifications - this week</p>
                    </div>
                    <button
                        onClick={handleRefreshBar}
                        className={`flex items-center gap-1.5 text-[11px] sm:text-[12px] font-medium text-brand-secondary transition-colors ${isRefreshingBar ? "opacity-50" : ""}`}
                    >
                        <img className={isRefreshingBar ? "animate-[spin_1s_linear_infinite_reverse]" : ""} src="/icons/refresh.svg" alt="Refresh"/>
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                </div>

                <div className="flex-1 w-full relative min-w-0 min-h-[250px] mt-2 sm:mt-4 p-2 sm:p-5 pr-4 sm:pr-5">
                    <div className="absolute inset-0 px-2 sm:px-5 pb-2 pt-2 sm:pt-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} margin={{top: 0, right: 0, left: -25, bottom: 0}} barSize={isMobile ? 20 : 60}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8C9BB0' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8C9BB0' }} ticks={[0, 25, 50, 75, 100]} />
                                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '4px', border: '1px solid #E5E7EB', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontSize: '12px' }} />
                                <Bar dataKey="value" fill="#2563EB" radius={[2, 2, 0, 0]}>
                                    {barData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill="#1D70B8" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white border border-[#E5E7EB] flex flex-col min-h-[320px] sm:min-h-[400px]">

                <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-[#D9DEE7]">
                    <div>
                        <h3 className="text-[14px] sm:text-[15px] font-semibold text-brand-dark leading-tight">Recent Activity</h3>
                        <p className="text-[11px] sm:text-[12px] text-brand-secondary mt-1">Daily verifications - this week</p>
                    </div>
                    <button
                        onClick={handleRefreshList}
                        className={`flex items-center gap-1.5 text-[11px] sm:text-[12px] font-medium text-brand-secondary transition-colors ${isRefreshingList ? "opacity-50" : ""}`}
                    >
                        <img className={isRefreshingList ? "animate-[spin_1s_linear_infinite_reverse]" : ""} src="/icons/refresh.svg" alt="Refresh"/>
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                </div>

                <div className="flex flex-col gap-0 flex-1 overflow-x-hidden">
                    {mockActivities.map((activity, index) => (
                        <ActivityItem
                            key={activity.id}
                            type={activity.type}
                            title={activity.title}
                            desc={activity.desc}
                            time={activity.time}
                            user={activity.user}
                            isLast={index === mockActivities.length - 1}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

const getActivityIcon = (type: ActivityType) => {
    switch (type) {
        case 'issue':
            return <img src="/icons/issue-blue.svg" alt="Issue"/>
        case 'verify':
            return <img src="/icons/verified.svg" alt="Verify"/>
        case 'revoke':
            return <img src="/icons/revoke.svg" alt="Revoke"/>
        case 'staff':
            return <img src="/icons/staff.svg" alt="Staff"/>
        case 'approve':
            return <img src="/icons/verified.svg" alt="Approve"/>
        default:
            return null;
    }
};

interface ActivityItemProps {
    type: ActivityType;
    title: string;
    desc: string;
    time: string;
    user: string;
    isLast?: boolean;
}

const ActivityItem = ({ type, title, desc, time, user, isLast = false }: ActivityItemProps) => {
    return (
        <div className={`flex items-start gap-3 sm:gap-4 py-3 sm:py-[18px] px-4 sm:px-5 ${!isLast ? 'border-b border-[#E5E7EB]' : ''}`}>

            <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 border border-[#E5E7EB] bg-white flex items-center justify-center mt-0.5">
                {getActivityIcon(type)}
            </div>

            <div className="flex-1 min-w-0 pr-2">
                <h4 className="text-[13px] sm:text-sm font-normal text-brand-dark leading-tight truncate">{title}</h4>
                <p className="text-[11px] sm:text-xs font-normal text-brand-secondary mt-1 truncate">{desc}</p>
            </div>

            <div className="text-right shrink-0">
                <p className="text-[11px] sm:text-xs text-brand-secondary">{time}</p>
                <p className="text-[11px] sm:text-xs text-brand-secondary mt-1">{user}</p>
            </div>

        </div>
    );
};