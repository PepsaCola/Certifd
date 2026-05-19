"use client";

import { useState } from "react";
import { ActionMenu } from "@/components/common/ActionMenu";
import { DataTable } from "@/components/common/DataTable";

interface IssuanceSuccessDetailedProps {
    credentials: any[];
    onArchive: (cred: any) => void;
    onRevoke: (cred: any) => void;
}

const GRID_COLUMNS = "grid-cols-[2.5fr_3fr_1fr_20px]";

const StatusBadge = ({ status }: { status: string }) => {
    return status === "Revoked" ? (
        <span className="inline-flex w-fit max-w-full px-2 py-1 items-center gap-1.5 text-xs font-medium bg-[#FEF2F2] text-[#EF4444] rounded-sm leading-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shrink-0"></span>
            Revoked
        </span>
    ) : (
        <span className="inline-flex w-fit max-w-full px-2 py-1 items-center gap-1.5 text-xs font-medium bg-[#E7FFF7] text-[#10B981] rounded-sm leading-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0"></span>
            Signed
        </span>
    );
};

const StatCard = ({
                      value,
                      label,
                  }: {
    value: string | number;
    label: string;
}) => (
    <div className="flex-1 min-w-0 px-4 py-3 text-center">
        <p className="text-[14px] font-semibold text-brand-dark break-words">{value}</p>
        <p className="text-[10px] text-[#8C9BB0] uppercase mt-0.5">{label}</p>
    </div>
);

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
        <p className="text-[13px] text-brand-dark break-words">{value}</p>
    </div>
);

export const IssuanceSuccessDetailed = ({
                                            credentials,
                                            onArchive,
                                            onRevoke,
                                        }: IssuanceSuccessDetailedProps) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const totalIssued = credentials.length;

    return (
        <div
            className="flex-1 flex flex-col animate-in fade-in duration-500"
            onClick={() => setOpenMenuId(null)}
        >
            <div className="flex flex-col items-center justify-center pt-8 sm:pt-10 pb-6 sm:pb-8 px-5 sm:px-6 text-center">
                <div className="w-[32px] h-[32px] bg-[#00C48C] rounded-full flex items-center justify-center mb-5">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <h2 className="text-[17px] sm:text-lg font-medium text-brand-dark mb-1.5">
                    Certificates Issued Successfully
                </h2>

                <p className="text-sm text-brand-secondary text-center max-w-[560px]">
                    All credentials were signed using the W3C Verifiable Credentials standard.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-5 sm:px-6 md:px-10 py-2 gap-5 sm:gap-6 mb-6">
                <p className="text-sm text-brand-secondary max-w-[320px] leading-relaxed">
                    Each recipient will receive an email containing their digital certificate and QR verification code.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch border border-[#E5E7EB] bg-white text-center w-full lg:w-auto">
                    <StatCard value={totalIssued} label="Credentials Issued" />
                    <div className="border-t sm:border-t-0 sm:border-x border-[#E5E7EB]">
                        <StatCard value="0" label="Failed" />
                    </div>
                    <StatCard value="ECDSA-SD-2023" label="Signature" />
                </div>
            </div>

            <div className="px-5 sm:px-6 md:px-10 pb-8">
                <div className="border border-[#E5E7EB] flex flex-col">
                    <DataTable
                        gridClass={GRID_COLUMNS}
                        items={credentials}
                        emptyMessage="No credentials found."
                        headerContent={
                            <>
                                <div>Recipient Name</div>
                                <div>Credential Type</div>
                                <div>Status</div>
                                <div></div>
                            </>
                        }
                        renderRow={(cred, index) => {
                            const rowBg = index % 2 === 0 ? "bg-white" : "bg-[#FAFBFC]";

                            return (
                                <>

                                    <div
                                        key={`desktop-${cred.id}`}
                                        className={`hidden lg:grid ${GRID_COLUMNS} gap-4 items-center px-4 py-4 border-b border-[#E5E7EB] hover:bg-neutral-50/50 transition-colors relative ${
                                            index === credentials.length - 1 ? "border-b-0" : ""
                                        } ${openMenuId === cred.id ? "z-20" : "z-0"} ${rowBg}`}
                                    >
                                        <div className="flex flex-col gap-0.5 min-w-0">
                                            <span className="text-sm font-medium text-brand-dark break-words">
                                                {cred.name}
                                            </span>
                                            <span className="text-xs font-menlo text-brand-secondary break-all">
                                                {cred.recId}
                                            </span>
                                        </div>

                                        <div className="text-sm text-brand-secondary truncate pr-4">
                                            {cred.type}
                                        </div>

                                        <div>
                                            <StatusBadge status={cred.status} />
                                        </div>

                                        <div
                                            className="flex justify-center"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <ActionMenu
                                                type="valid"
                                                onToggle={(isOpen) =>
                                                    setOpenMenuId(isOpen ? cred.id : null)
                                                }
                                                onArchive={() => onArchive(cred)}
                                                onRevoke={() => onRevoke(cred)}
                                            />
                                        </div>
                                    </div>

                                    <div
                                        key={`mobile-${cred.id}`}
                                        className={`lg:hidden px-4 py-4 sm:px-5 sm:py-5 border-b border-[#E5E7EB] hover:bg-neutral-50/50 transition-colors relative ${
                                            index === credentials.length - 1 ? "border-b-0" : ""
                                        } ${openMenuId === cred.id ? "z-20" : "z-0"} ${rowBg}`} // Додали rowBg сюди
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-[14px] font-medium text-brand-dark break-words">
                                                    {cred.name}
                                                </p>
                                                <p className="text-[12px] font-menlo text-brand-secondary mt-1 break-all">
                                                    {cred.recId}
                                                </p>
                                            </div>

                                            <div
                                                className="shrink-0"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ActionMenu
                                                    type="valid"
                                                    onToggle={(isOpen) =>
                                                        setOpenMenuId(isOpen ? cred.id : null)
                                                    }
                                                    onArchive={() => onArchive(cred)}
                                                    onRevoke={() => onRevoke(cred)}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center gap-2">
                                            <StatusBadge status={cred.status} />
                                        </div>

                                        <div className="mt-4 grid grid-cols-1 gap-3">
                                            <MobileMetaItem
                                                label="Credential Type"
                                                value={cred.type}
                                            />
                                        </div>
                                    </div>
                                </>
                            );
                        }}
                        footerLeft={
                            <span className="font-medium text-brand-dark text-[12px] sm:text-[13px]">
                                {totalIssued} credentials - W3C VC 1.1 - ECDSA-SD-2023
                            </span>
                        }
                        footerRight={
                            <span className="block text-left sm:text-right leading-relaxed sm:leading-normal text-[11px] sm:text-[13px]">
                                12 March 2026 at 10:35
                            </span>
                        }
                    />
                </div>
            </div>

            <div className="px-5 sm:px-6 md:px-10 pb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 bg-white rounded-b-sm">
                <button className="px-6 py-2.5 border border-[#E5E7EB] bg-white text-brand-dark font-medium text-[13px] hover:bg-neutral-50 transition-colors w-full sm:w-auto">
                    Issue More
                </button>

                <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#00C48C] text-white text-[14px] font-medium hover:bg-[#00C48C]/90 transition-colors w-full sm:w-auto">
                    <img src="/icons/verifying.svg" alt=""/>
                    Try Verifying One
                </button>
            </div>
        </div>
    );
};