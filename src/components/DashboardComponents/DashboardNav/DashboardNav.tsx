"use client";

import { useRouter } from "next/navigation";

interface DashboardNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const DashboardNav = ({ activeTab, onTabChange }: DashboardNavProps) => {
    const router = useRouter();

    return (
        <div className="bg-white border-b border-[#E5E7EB] z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between max-w-[1248px] w-full m-auto md:px-6 lg:px-0">

                <div className="flex gap-5 md:gap-8 overflow-x-auto custom-scrollbar px-4 md:px-0 w-full lg:w-auto">
                    <TabItem label="Overview" icon="overview" active={activeTab === "Overview"}
                             onClick={() => onTabChange("Overview")}/>
                    <TabItem label="Digital Certificates" icon="certificates"
                             active={activeTab === "Digital Certificates"}
                             onClick={() => onTabChange("Digital Certificates")}/>
                    <TabItem label="Requests" badge={3} active={activeTab === "Requests"}
                             onClick={() => onTabChange("Requests")}/>
                    <TabItem label="Team & Roles" icon="team" active={activeTab === "Team & Roles"}
                             onClick={() => onTabChange("Team & Roles")}/>
                    <TabItem label="Templates" icon="templates" active={activeTab === "Templates"}
                             onClick={() => onTabChange("Templates")}/>
                    <TabItem label="Settings" icon="settings" active={activeTab === "Settings"}
                             onClick={() => onTabChange("Settings")}/>
                </div>

                <div className="flex gap-0 w-full lg:w-auto lg:ml-8 shrink-0 px-4 md:px-0 py-3 lg:py-0 border-t border-[#E5E7EB] lg:border-t-0">
                    <button
                        onClick={() => router.push('/certificates?tab=issue')}
                        className="flex-1 lg:flex-none bg-brand-btn hover:bg-brand-btn/90 text-white text-[13px] md:text-sm font-medium py-3 md:py-[14px] px-2 md:px-6 transition-colors text-center"
                    >
                        Issue Certificates
                    </button>
                    <button
                        onClick={() => router.push('/certificates?tab=verify')}
                        className="flex-1 lg:flex-none bg-brand-dark hover:bg-brand-dark/90 text-white text-[13px] md:text-sm font-medium py-3 md:py-[14px] px-2 md:px-6 transition-colors border-l border-white/20 text-center"
                    >
                        Verify Certificate
                    </button>
                </div>
            </div>
        </div>
    );
};

const TabItem = ({label, icon, badge, active, onClick}: any) => (
    <button
        onClick={onClick}
        className={`relative flex items-center py-[14px] gap-2 text-[13px] md:text-[14px] font-medium transition-colors whitespace-nowrap shrink-0
            ${active ? "text-brand-dark" : "text-brand-secondary hover:text-brand-dark"}
        `}
    >
        {badge && (
            <span
                className="bg-brand-dark text-white text-[10px] md:text-xs flex justify-center items-center font-bold w-4 h-4 md:w-5 md:h-5 rounded-full">
                {badge}
            </span>
        )}
        {icon && <img src={`/icons/${icon}.svg`} alt={icon} className="w-4 h-4 md:w-auto md:h-auto" />}
        {label}

        {active && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-btn rounded-t-sm"></div>
        )}
    </button>
);