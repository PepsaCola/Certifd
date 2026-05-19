"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DashboardHeader } from "@/components/DashboardComponents/DashboardHeader/DashboardHeader";
import { DashboardNav } from "@/components/DashboardComponents/DashboardNav/DashboardNav";
import { DashboardOverviewContent } from "@/components/DashboardComponents/DashboardOverviewContent/DashboardOverviewContent";
import { DigitalCertificatesContent } from "@/components/DashboardComponents/DigitalCertificatesContent/DigitalCertificatesContent";
import { Suspense } from "react";
import { RequestsContent } from "@/components/DashboardComponents/RequestsContent/RequestsContent";
import { TeamAndRolesContent } from "@/components/DashboardComponents/TeamAndRolesContent/TeamAndRolesContent";
import { TemplatesContent } from "@/components/DashboardComponents/TemplatesContent/TemplatesContent";
import { SettingsContent } from "@/components/DashboardComponents/SettingsContent/SettingsContent";

function DashboardContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeMainTab = searchParams.get("tab") || "Overview";

    const handleTabChange = (tab: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", tab);

        params.delete("subtab");
        params.delete("status");
        params.delete("period");
        params.delete("page");

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="min-h-screen w-full bg-[#F8F9FA] font-sans flex flex-col justify-start">
            <DashboardHeader />

            <DashboardNav activeTab={activeMainTab} onTabChange={handleTabChange} />

            <div className="flex-1 w-full max-w-[1248px] mx-auto py-6 md:py-8 px-4 lg:px-0">
                {activeMainTab === "Overview" && <DashboardOverviewContent />}
                {activeMainTab === "Digital Certificates" && <DigitalCertificatesContent />}
                {activeMainTab === "Requests" && <RequestsContent />}
                {activeMainTab === "Team & Roles" && <TeamAndRolesContent />}
                {activeMainTab === "Templates" && <TemplatesContent />}
                {activeMainTab === "Settings" && <SettingsContent />}
            </div>

        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] gap-4">
                    <div className="w-10 h-10 border-4 border-[#E5E7EB] border-t-[#00C48C] rounded-full animate-spin"></div>
                    <span className="text-[14px] font-medium text-brand-secondary">Loading dashboard...</span>
                </div>
            }
        >
            <DashboardContent />
        </Suspense>
    );
}