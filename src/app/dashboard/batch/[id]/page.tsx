"use client";

import { useParams, useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/DashboardComponents/DashboardHeader/DashboardHeader";
import {
    BatchDetailsContent,
    BatchData,
    IssuedCredential,
} from "@/components/DashboardComponents/BatchDetailsContent/BatchDetailsContent";

const mockBatches: BatchData[] = [
    {
        id: "1",
        name: "graduates_june_2026.csv",
        date: "10 Mar 2026",
        credentials: 5,
        signers: "1/2",
        status: "approving",
        issuedBy: "Ms. Priya Kapoor",
        signerDetails: [
            { org: "Oxford University", role: "Your Organisation", status: "approved" },
            { org: "European Accreditation Council", status: "pending" },
        ],
    },
    {
        id: "3",
        name: "graduates_dec_2025.csv",
        date: "10 Dec 2025",
        credentials: 8,
        signers: "2/2",
        status: "approved",
        issuedBy: "Ms. Priya Kapoor",
        signerDetails: [
            { org: "Oxford University", role: "Your Organisation", status: "approved" },
            { org: "European Accreditation Council", status: "approved" },
        ],
    },
];

const mockIssuedCredentials: IssuedCredential[] = [
    {
        id: "1",
        name: "Sarah Chen Wei Lin",
        type: "Bachelor of Science in Computer Science",
        recId: "SC2026001",
    },
    {
        id: "2",
        name: "Ahmad bin Ibrahim",
        type: "Master of Business Administration",
        recId: "AB2026002",
    },
    {
        id: "3",
        name: "Priya Sharma",
        type: "Bachelor of Engineering (Mechanical)",
        recId: "PS2026003",
    },
];

export default function BatchDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const batchId = (params?.id as string) || "1";
    const batchName =
        mockBatches.find((b) => b.id === batchId)?.name || "graduates_june_2026.csv";

    return (
        <div className="min-h-screen w-full bg-[#F8F9FA] font-sans flex flex-col justify-start">
            <DashboardHeader />

            <div className="w-full bg-white border-b border-[#E5E7EB]">
                <div className="max-w-[1248px] mx-auto px-4 sm:px-5 md:px-0 py-3 md:py-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] sm:text-[13px]">
                    <button
                        onClick={() => router.back()}
                        className="text-[#8C9BB0] hover:text-brand-dark transition-colors shrink-0"
                    >
                        Digital Certificates
                    </button>

                    <span className="text-[#8C9BB0] shrink-0">/</span>

                    <span className="text-brand-dark font-medium break-words min-w-0">
                        {batchName}
                    </span>
                </div>
            </div>

            <div className="flex-1 w-full max-w-[1248px] mx-auto py-6 md:py-8 px-4 sm:px-5 md:px-8">
                <BatchDetailsContent
                    mockBatches={mockBatches}
                    mockIssuedCredentials={mockIssuedCredentials}
                />
            </div>
        </div>
    );
}