"use client";

import { BatchRow, BatchData } from "./BatchRow";
import { DataTable } from "@/components/common/DataTable";

const generateMockBatches = (): BatchData[] => {
    const baseData: BatchData[] = [
        {
            id: "1",
            name: "graduates_june_2026.csv",
            date: "10 Mar 2026",
            credentials: 5,
            signers: "1/2",
            status: "approving",
            issuedBy: "Ms. Priya Kapoor",
            recipients: [
                {
                    name: "Sarah Chen Wei Lin",
                    id: "SC2026001",
                    type: "Bachelor of Science in Computer Science",
                },
                {
                    name: "Ahmed bin Ibrahim",
                    id: "A12026002",
                    type: "Master of Business Administration",
                },
            ],
            signerDetails: [
                {
                    org: "Oxford University",
                    role: "Your Organisation",
                    status: "approved",
                },
                {
                    org: "European Accreditation Council",
                    role: "External Verifier",
                    status: "pending",
                },
            ],
        },
        {
            id: "2",
            name: "masters_march_2026.csv",
            date: "08 Mar 2026",
            credentials: 3,
            signers: "1/2",
            status: "approving",
            issuedBy: "Ms. Priya Kapoor",
            recipients: [],
            signerDetails: [],
        },
        {
            id: "3",
            name: "graduates_dec_2025.csv",
            date: "10 Dec 2025",
            credentials: 8,
            signers: "2/2",
            status: "approved",
            issuedBy: "Ms. Priya Kapoor",
            recipients: [],
            signerDetails: [],
        },
        {
            id: "4",
            name: "phd_graduates_sep_2025.csv",
            date: "20 Sept 2025",
            credentials: 4,
            signers: "1/1",
            status: "issued",
            issuedBy: "Ms. Priya Kapoor",
            recipients: [],
            signerDetails: [],
        },
    ];

    const expanded: BatchData[] = [];
    for (let i = 0; i < 15; i++) {
        const item = baseData[i % baseData.length];
        expanded.push({
            ...item,
            id: (i + 1).toString(),
            name: `${item.name.replace(".csv", "")}_v${i + 1}.csv`,
        });
    }

    return expanded;
};

export const mockBatches = generateMockBatches();

const GRID_COLUMNS = "grid-cols-[20px_4fr_1fr_1fr_2fr_1.5fr_20px]";

interface BatchesTableProps {
    currentItems: BatchData[];
    filteredItems: BatchData[];
}

export const BatchesTable = ({ currentItems, filteredItems }: BatchesTableProps) => {
    const totalItems = filteredItems.length;
    const pendingCount = filteredItems.filter((b) => b.status === "approving").length;
    const approvedCount = filteredItems.filter((b) => b.status === "approved").length;
    const issuedCount = filteredItems.filter((b) => b.status === "issued").length;

    return (
        <DataTable
            gridClass={GRID_COLUMNS}
            items={currentItems}
            emptyMessage="No batches found for this filter."
            headerContent={
                <>
                    <div className="col-span-2">Batch Name</div>
                    <div>Credentials</div>
                    <div>Signers</div>
                    <div>Status</div>
                    <div>Issued By</div>
                    <div></div>
                </>
            }
            renderRow={(batch, index) => (
                <BatchRow
                    key={batch.id ?? index}
                    data={batch}
                    gridClass={GRID_COLUMNS}
                />
            )}
            footerLeft={
                <span className="font-medium text-brand-dark text-[12px] sm:text-[13px]">
                    {totalItems} batches
                </span>
            }
            footerRight={
                <span className="block text-left sm:text-right leading-relaxed sm:leading-normal text-[11px] sm:text-[13px]">
                    {pendingCount} pending · {approvedCount} approvals received · {issuedCount} issued
                </span>
            }
        />
    );
};