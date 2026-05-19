"use client";

import { useState } from "react";
import { ActionMenu } from "@/components/common/ActionMenu";
import { DataTable } from "@/components/common/DataTable";
import { ArchiveCertificateModal } from "@/components/DashboardComponents/DigitalCertificatesContent/ArchiveCertificateModal";
import { RevokeCertificateModal } from "@/components/DashboardComponents/DigitalCertificatesContent/RevokeCertificateModal";

export interface CredentialData {
    id: string;
    name: string;
    type: string;
    inst: string;
    recId: string;
    status: "Valid" | "Revoked" | "Unsigned";
    time: string;
}

const generateMockData = (): CredentialData[] => {
    const baseData: Omit<CredentialData, "id">[] = [
        {
            name: "Sarah Chen Wei Lin",
            type: "Bachelor of Science in Computer Science",
            inst: "Oxford University",
            recId: "SC2026001",
            status: "Valid",
            time: "2h ago",
        },
        {
            name: "Ahmed bin Ibrahim",
            type: "Master of Business Administration",
            inst: "Oxford University",
            recId: "A12026002",
            status: "Valid",
            time: "2h ago",
        },
        {
            name: "Priya Sharma",
            type: "Bachelor of Engineering (Mechanical)",
            inst: "Oxford University",
            recId: "PS2026003",
            status: "Valid",
            time: "3h ago",
        },
        {
            name: "James Tan Yew Kee",
            type: "Doctor of Philosophy in Chemistry",
            inst: "Oxford University",
            recId: "JT2026004",
            status: "Valid",
            time: "3h ago",
        },
        {
            name: "Maria Santos Garcia",
            type: "Bachelor of Arts in Psychology",
            inst: "Oxford University",
            recId: "MS2026005",
            status: "Valid",
            time: "4h ago",
        },
        {
            name: "Isabella Romano",
            type: "Bachelor of Fine Arts",
            inst: "Oxford University",
            recId: "IR2026006",
            status: "Revoked",
            time: "4h ago",
        },
        {
            name: "Unverified Holder",
            type: "Bachelor of Commerce",
            inst: "Oxford University",
            recId: "UH2026007",
            status: "Unsigned",
            time: "5h ago",
        },
    ];

    const expandedData: CredentialData[] = [];

    for (let i = 0; i < 15; i++) {
        const item = baseData[i % baseData.length];
        expandedData.push({
            ...item,
            id: (i + 1).toString(),
            recId: `${item.recId.slice(0, -1)}${i + 1}`,
        });
    }

    return expandedData;
};

export const mockCredentials = generateMockData();

const GRID_COLUMNS = "grid-cols-[2fr_2.5fr_1.5fr_1fr_1fr_1fr_20px]";

interface CredentialsTableProps {
    currentItems: CredentialData[];
    filteredItems: CredentialData[];
    onArchiveConfirm: (id: string) => void;
    onRevokeConfirm: (id: string) => void;
}

export const CredentialsTable = ({
                                     currentItems,
                                     filteredItems,
                                     onArchiveConfirm,
                                     onRevokeConfirm,
                                 }: CredentialsTableProps) => {
    const [archivingCredential, setArchivingCredential] = useState<CredentialData | null>(null);
    const [revokingCredential, setRevokingCredential] = useState<CredentialData | null>(null);

    const totalItems = filteredItems.length;
    const validCount = filteredItems.filter((c) => c.status === "Valid").length;
    const revokedCount = filteredItems.filter((c) => c.status === "Revoked").length;
    const unsignedCount = filteredItems.filter((c) => c.status === "Unsigned").length;

    const handleConfirmArchive = (id: string) => {
        onArchiveConfirm(id);
        setArchivingCredential(null);
    };

    const handleConfirmRevoke = (id: string) => {
        onRevokeConfirm(id);
        setRevokingCredential(null);
    };

    return (
        <>
            <DataTable
                gridClass={GRID_COLUMNS}
                items={currentItems}
                emptyMessage="No credentials found for this filter."
                headerContent={
                    <>
                        <div>Recipient Name</div>
                        <div>Credential Type</div>
                        <div>Institution</div>
                        <div>Recipient ID</div>
                        <div>Status</div>
                        <div>Verified At</div>
                        <div></div>
                    </>
                }
                renderRow={(cred) => (
                    <CredentialRow
                        key={cred.id}
                        data={cred}
                        gridClass={GRID_COLUMNS}
                        onArchive={() => setArchivingCredential(cred)}
                        onRevoke={() => setRevokingCredential(cred)}
                    />
                )}
                footerLeft={
                    <span className="font-medium text-brand-dark text-[12px] sm:text-[13px]">
                        {totalItems} verifications
                    </span>
                }
                footerRight={
                    <span className="block text-left sm:text-right leading-relaxed sm:leading-normal text-[11px] sm:text-[13px]">
                        {validCount} valid · {revokedCount} revoked · {unsignedCount} invalid
                    </span>
                }
            />

            <ArchiveCertificateModal
                isOpen={!!archivingCredential}
                onClose={() => setArchivingCredential(null)}
                onConfirm={handleConfirmArchive}
                credentialData={archivingCredential}
            />

            <RevokeCertificateModal
                isOpen={!!revokingCredential}
                onClose={() => setRevokingCredential(null)}
                onConfirm={handleConfirmRevoke}
                credentialData={revokingCredential}
            />
        </>
    );
};

const StatusBadge = ({ status }: { status: CredentialData["status"] }) => {
    switch (status) {
        case "Valid":
            return (
                <span className="inline-flex w-fit max-w-full px-2 py-1 items-center gap-1.5 text-xs font-medium bg-valid-bg text-valid-main leading-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-valid-main shrink-0"></span>
                    Valid
                </span>
            );

        case "Revoked":
            return (
                <span className="inline-flex w-fit max-w-full px-2 py-1 items-center gap-1.5 text-xs font-medium bg-error-bg text-error-main leading-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] shrink-0"></span>
                    Revoked
                </span>
            );

        case "Unsigned":
            return (
                <span className="inline-flex w-fit max-w-full px-2 py-1 items-center gap-1.5 text-xs font-medium bg-invalid-bg text-invalid-secondary leading-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-invalid-secondary shrink-0"></span>
                    Unsigned
                </span>
            );

        default:
            return null;
    }
};

const MobileMetaItem = ({
                            label,
                            value,
                        }: {
    label: string;
    value: string;
}) => (
    <div className=" bg-[#FAFBFC] border border-[#E5E7EB] p-3">
        <p className="text-[10px] uppercase tracking-wide text-brand-secondary mb-1">
            {label}
        </p>
        <p className="text-[13px] text-brand-dark break-words">
            {value}
        </p>
    </div>
);

const CredentialRow = ({
                           data,
                           gridClass,
                           onArchive,
                           onRevoke,
                       }: {
    data: CredentialData;
    gridClass: string;
    onArchive: () => void;
    onRevoke: () => void;
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuType = data.status === "Unsigned" ? "unsigned" : "valid";

    return (
        <>
            <div
                className={`hidden lg:grid ${gridClass} gap-4 items-center px-4 py-3 border-b border-[#E5E7EB] last:border-b-0 hover:bg-neutral-50/50 transition-colors bg-white relative ${
                    isMenuOpen ? "z-20" : "z-0"
                }`}
            >
                <div className="text-sm text-brand-dark break-words min-w-0">
                    {data.name}
                </div>

                <div className="text-sm text-brand-secondary break-words min-w-0">
                    {data.type}
                </div>

                <div className="text-sm text-brand-secondary break-words min-w-0">
                    {data.inst}
                </div>

                <div className="text-xs font-menlo text-[#2880B9] break-all min-w-0">
                    {data.recId}
                </div>

                <div>
                    <StatusBadge status={data.status} />
                </div>

                <div className="text-[12px] text-brand-secondary">
                    {data.time}
                </div>

                <div className="flex justify-center">
                    <ActionMenu
                        type={menuType}
                        onToggle={(isOpen) => setIsMenuOpen(isOpen)}
                        onArchive={onArchive}
                        onRevoke={onRevoke}
                    />
                </div>
            </div>

            <div
                className={`lg:hidden px-4 py-4 sm:px-5 sm:py-5 border-b border-[#E5E7EB] last:border-b-0 bg-white relative ${
                    isMenuOpen ? "z-20" : "z-0"
                }`}
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-medium text-brand-dark break-words">
                            {data.name}
                        </p>
                        <p className="text-[13px] text-brand-secondary mt-1 break-words">
                            {data.type}
                        </p>
                    </div>

                    <div className="shrink-0">
                        <ActionMenu
                            type={menuType}
                            onToggle={(isOpen) => setIsMenuOpen(isOpen)}
                            onArchive={onArchive}
                            onRevoke={onRevoke}
                        />
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <StatusBadge status={data.status} />
                    <span className="text-[12px] text-brand-secondary">
                        {data.time}
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <MobileMetaItem label="Institution" value={data.inst} />
                    <MobileMetaItem label="Recipient ID" value={data.recId} />
                </div>
            </div>
        </>
    );
};