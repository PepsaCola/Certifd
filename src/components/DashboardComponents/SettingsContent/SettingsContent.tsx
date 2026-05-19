"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ProfileSettings } from "@/components/DashboardComponents/SettingsContent/ProfileSettings/ProfileSettings";
import { InstitutionSettings } from "@/components/DashboardComponents/SettingsContent/InstitutionSettings/InstitutionSettings";
import { SecuritySettings } from "@/components/DashboardComponents/SettingsContent/SecuritySettings/SecuritySettings";
import { ApiSettings } from "@/components/DashboardComponents/SettingsContent/ApiSettings/ApiSettings";

export const SettingsContent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeTab = searchParams.get("subtab") || "Profile";

    const updateUrl = (tab: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("subtab", tab);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const navItems = [
        {
            id: "Profile",
            label: "Profile",
            desc: "Personal information",
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                    <path d="M6.83334 6.04167C6.83334 6.88152 7.16697 7.68697 7.76083 8.28084C8.3547 8.8747 9.16015 9.20833 10 9.20833C10.8399 9.20833 11.6453 8.8747 12.2392 8.28084C12.833 7.68697 13.1667 6.88152 13.1667 6.04167C13.1667 5.20181 12.833 4.39636 12.2392 3.8025C11.6453 3.20863 10.8399 2.875 10 2.875C9.16015 2.875 8.3547 3.20863 7.76083 3.8025C7.16697 4.39636 6.83334 5.20181 6.83334 6.04167Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.25 17.125V15.5417C5.25 14.7018 5.58363 13.8964 6.1775 13.3025C6.77136 12.7086 7.57681 12.375 8.41667 12.375H11.5833C12.4232 12.375 13.2286 12.7086 13.8225 13.3025C14.4164 13.8964 14.75 14.7018 14.75 15.5417V17.125" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: "Institution",
            label: "Institution",
            desc: "Details & branding",
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                    <path d="M17.9167 7.62504L10 4.45837L2.08334 7.62504L10 10.7917L17.9167 7.62504ZM17.9167 7.62504V12.375" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.25 8.89172V13.1667C5.25 13.7966 5.75045 14.4007 6.64124 14.8461C7.53204 15.2915 8.74022 15.5417 10 15.5417C11.2598 15.5417 12.468 15.2915 13.3588 14.8461C14.2496 14.4007 14.75 13.7966 14.75 13.1667V8.89172" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: "Security",
            label: "Security",
            desc: "Password & sessions",
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                    <path d="M4.45834 10.7917C4.45834 10.3718 4.62515 9.96905 4.92208 9.67212C5.21902 9.37519 5.62174 9.20837 6.04167 9.20837H13.9583C14.3783 9.20837 14.781 9.37519 15.0779 9.67212C15.3749 9.96905 15.5417 10.3718 15.5417 10.7917V15.5417C15.5417 15.9616 15.3749 16.3644 15.0779 16.6613C14.781 16.9582 14.3783 17.125 13.9583 17.125H6.04167C5.83374 17.125 5.62785 17.0841 5.43575 17.0045C5.24366 16.9249 5.06911 16.8083 4.92208 16.6613C4.77506 16.5143 4.65843 16.3397 4.57886 16.1476C4.49929 15.9555 4.45834 15.7496 4.45834 15.5417V10.7917Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.20834 13.1667C9.20834 13.3766 9.29174 13.578 9.44021 13.7265C9.58868 13.8749 9.79004 13.9583 10 13.9583C10.21 13.9583 10.4113 13.8749 10.5598 13.7265C10.7083 13.578 10.7917 13.3766 10.7917 13.1667C10.7917 12.9567 10.7083 12.7553 10.5598 12.6069C10.4113 12.4584 10.21 12.375 10 12.375C9.79004 12.375 9.58868 12.4584 9.44021 12.6069C9.29174 12.7553 9.20834 12.9567 9.20834 13.1667Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.83334 9.20833V6.04167C6.83334 5.20181 7.16697 4.39636 7.76083 3.8025C8.3547 3.20863 9.16015 2.875 10 2.875C10.8399 2.875 11.6453 3.20863 12.2392 3.8025C12.833 4.39636 13.1667 5.20181 13.1667 6.04167V9.20833" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            id: "API",
            label: "API & Integrations",
            desc: "Connect your systems",
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                    <path d="M13.606 3.54234L16.4576 6.39393C16.6692 6.60543 16.837 6.85653 16.9514 7.13288C17.0659 7.40924 17.1248 7.70544 17.1248 8.00457C17.1248 8.3037 17.0659 8.59991 16.9514 8.87626C16.837 9.15262 16.6692 9.40372 16.4576 9.61522L14.3652 11.7076C14.1537 11.9191 13.9026 12.0869 13.6263 12.2014C13.3499 12.3159 13.0537 12.3748 12.7546 12.3748C12.4555 12.3748 12.1593 12.3159 11.8829 12.2014C11.6066 12.0869 11.3555 11.9191 11.144 11.7076L10.9057 11.4693L5.71392 16.6611C5.45086 16.9241 5.1036 17.0861 4.73304 17.1186L4.5945 17.125H3.66667C3.47276 17.1249 3.28561 17.0538 3.14071 16.9249C2.9958 16.7961 2.90323 16.6185 2.88054 16.4259L2.875 16.3333V15.4055C2.87509 15.0337 3.00597 14.6739 3.24471 14.389L3.33892 14.2861L3.66667 13.9583H5.25V12.375H6.83333V10.7916L8.53067 9.0943L8.29238 8.85601C8.08084 8.64451 7.91304 8.39341 7.79856 8.11705C7.68408 7.8407 7.62515 7.5445 7.62515 7.24537C7.62515 6.94623 7.68408 6.65003 7.79856 6.37368C7.91304 6.09732 8.08084 5.84622 8.29238 5.63472L10.3848 3.54234C10.5963 3.33081 10.8474 3.16301 11.1237 3.04853C11.4001 2.93405 11.6963 2.87512 11.9954 2.87512C12.2945 2.87512 12.5907 2.93405 12.8671 3.04853C13.1434 3.16301 13.3945 3.33081 13.606 3.54234Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.375 7.625H12.3829" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
    ];

    return (
        <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-8 w-full mt-2">

            <div className="w-full md:w-[240px] shrink-0 flex flex-row md:flex-col gap-2 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => updateUrl(item.id)}
                            className={`flex items-center md:items-start gap-2 md:gap-3 w-auto md:w-full text-left px-3 py-2.5 md:p-4 transition-colors shrink-0 ${
                                isActive
                                    ? "bg-white border border-[#D9DEE7] border-b-[3px] md:border-b md:border-b-[#D9DEE7] border-b-[#00C48C] md:border-l-[3px] md:border-l-[#00C48C]"
                                    : "border-b-[3px] md:border-b-0 md:border-l-[3px] border-transparent hover:bg-neutral-50"
                            }`}
                        >
                            <div className={`mt-0 md:mt-0.5 shrink-0 ${isActive ? "text-[#0F1A2E]" : "text-[#5A6C7D]"}`}>
                                {item.icon}
                            </div>
                            <div className="flex flex-col">
                                <p className={`text-[13px] md:text-sm font-medium whitespace-nowrap md:whitespace-normal ${isActive ? "text-brand-dark" : "text-brand-secondary"}`}>
                                    {item.label}
                                </p>
                                <p className="text-xs text-brand-secondary mt-0.5 hidden md:block">
                                    {item.desc}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="flex-1 w-full max-w-[800px]">
                {activeTab === "Profile" && <ProfileSettings />}
                {activeTab === "Institution" && <InstitutionSettings />}
                {activeTab === "Security" && <SecuritySettings />}
                {activeTab === "API" && <ApiSettings />}
            </div>

        </div>
    );
};