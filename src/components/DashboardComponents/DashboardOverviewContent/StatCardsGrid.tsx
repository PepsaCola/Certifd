"use client";

import { ReactNode } from "react";

const mockData: Record<string, any> = {
    "7d": {
        issued: "420", issuedTrend: "+5.2%",
        pending: "12",
        requests: "8",
        revoked: "5", revokedTrend: "-0.5%"
    },
    "30d": {
        issued: "2,847", issuedTrend: "+18.4%",
        pending: "6",
        requests: "4",
        revoked: "115", revokedTrend: "+2.3%"
    },
    "90d": {
        issued: "8,102", issuedTrend: "+22.1%",
        pending: "45",
        requests: "14",
        revoked: "340", revokedTrend: "+1.2%"
    },
    "1y": {
        issued: "34,500", issuedTrend: "+45.0%",
        pending: "120",
        requests: "55",
        revoked: "1,200", revokedTrend: "-5.0%"
    }
};

interface StatCardsGridProps {
    period: string;
}

export const StatCardsGrid = ({ period }: StatCardsGridProps) => {
    const currentData = mockData[period] || mockData["30d"];

    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatCard
            icon={<img src="/icons/stat-1.svg" alt="Total Issued" className="w-5 h-5 md:w-auto md:h-auto" />}
            value={currentData.issued}
            label="Total Credentials Issued"
            trend={{ value: currentData.issuedTrend, isPositive: currentData.issuedTrend.includes("+") }}
        />

        <StatCard
            icon={<img src="/icons/stat-2.svg" alt="Pending" className="w-5 h-5 md:w-auto md:h-auto" />}
            value={currentData.pending}
            label="Pending Certificates"
        />

        <StatCard
            icon={<img src="/icons/stat-3.svg" alt="Requests" className="w-5 h-5 md:w-auto md:h-auto" />}
            value={currentData.requests}
            label="Approval Requests"
        />

        <StatCard
            icon={<img src="/icons/stat-4.svg" alt="Revoked" className="w-5 h-5 md:w-auto md:h-auto" />}
            value={currentData.revoked}
            label="Revoked Credentials"
            trend={{ value: currentData.revokedTrend, isPositive: !currentData.revokedTrend.includes("+") }}
        />
    </div>
);
};

interface StatCardProps {
    icon: ReactNode;
    value: string;
    label: string;
    trend?: { value: string; isPositive: boolean; };
}

const StatCard = ({ icon, value, label, trend }: StatCardProps) => (
    <div className="bg-white border border-[#E5E7EB] flex flex-col justify-between min-h-[120px] md:min-h-[140px] transition-shadow hover:shadow-sm">

        <div className="flex items-center border-b border-[#E5E7EB] h-[48px] md:h-[52px]">
            <div className="w-[48px] md:w-[52px] h-full flex items-center justify-center border-r border-[#E5E7EB] text-brand-secondary shrink-0">
                {icon}
            </div>

            <div className="flex-1 flex justify-end pr-4 md:pr-5">
                {trend && (
                    <div className={`flex items-center gap-1.5 text-[11px] md:text-[12px] font-semibold ${trend.isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                        {trend.isPositive ? (
                            <img src="/icons/progress-up.svg" alt="Up" className="w-3 h-3 md:w-auto md:h-auto" />
                        ) : (
                            <img src="/icons/progress-down.svg" alt="Down" className="w-3 h-3 md:w-auto md:h-auto" />
                        )}
                        {trend.value}
                    </div>
                )}
            </div>
        </div>

        <div className="p-4 md:p-5 flex-1 flex flex-col justify-center">
            <div className="text-[24px] md:text-[28px] font-normal text-brand-dark leading-none mb-1.5 md:mb-2">{value}</div>
            <div className="text-[12px] md:text-[13px] text-brand-secondary font-medium leading-tight">{label}</div>
        </div>
    </div>
);