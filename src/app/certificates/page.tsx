"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/VerifyPageComponents/Header/Header";
import { IssueContent } from "@/components/VerifyPageComponents/IssueContent/IssueContent";
import { VerifyContent } from "@/components/VerifyPageComponents/VerifyContent/VerifyContent";

function CertificatesPageContent() {
    const searchParams = useSearchParams();

    const initialTab = (searchParams.get("tab") as "issue" | "verify") || "issue";

    const [activeTab, setActiveTab] = useState<"issue" | "verify">(initialTab);

    useEffect(() => {
        const tabFromUrl = searchParams.get("tab") as "issue" | "verify";
        if (tabFromUrl) setActiveTab(tabFromUrl);
    }, [searchParams]);

    return (
        <>
            <Header activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

            <main className="flex-1 flex flex-col w-full max-w-[1248px] mx-auto animate-in fade-in duration-300">
                {activeTab === "issue" ? <IssueContent /> : <VerifyContent />}
            </main>
        </>
    );
}

export default function CertificatesPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
            <Suspense
                fallback={
                    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] gap-4">
                        <div className="w-10 h-10 border-4 border-[#E5E7EB] border-t-[#00C48C] rounded-full animate-spin"></div>
                        <span className="text-[14px] font-medium text-brand-secondary">Loading workspace...</span>
                    </div>
                }
            >
                <CertificatesPageContent />
            </Suspense>
        </div>
    );
}