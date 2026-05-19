"use client";

import { useState } from "react";
import { ActionMenu } from "@/components/common/ActionMenu";

export interface BatchData {
    id: string;
    name: string;
    date: string;
    credentials: number;
    signers: string;
    status: "approving" | "approved" | "issued";
    issuedBy: string;
    recipients: { name: string; id: string; type: string }[];
    signerDetails: { org: string; role: string; status: "approved" | "pending" }[];
}

interface BatchRowProps {
    data: BatchData;
    gridClass: string;
}

const StatusBadge = ({ status }: { status: BatchData["status"] }) => {
    switch (status) {
        case "approving":
            return (
                <span className="inline-flex w-fit max-w-full items-center gap-1.5 text-[12px] font-medium text-[#F59E0B] bg-[#FFFBEB] px-[8px] py-[4px] leading-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0"></span>
                    <span className="break-words">Approving in Progress</span>
                </span>
            );
        case "approved":
            return (
                <span className="inline-flex w-fit max-w-full items-center gap-1.5 text-[12px] font-medium text-[#3B82F6] bg-[#EFF6FF] px-[8px] py-[4px] leading-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0"></span>
                    <span className="break-words">All approvals received</span>
                </span>
            );
        case "issued":
            return (
                <span className="inline-flex w-fit max-w-full items-center gap-1.5 text-[12px] font-medium text-[#10B981] bg-[#ECFDF5] px-[8px] py-[4px] leading-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0"></span>
                    <span className="break-words">Certificate Issued</span>
                </span>
            );
        default:
            return null;
    }
};

const MobileMetaItem = ({
                            label,
                            value,
                            className = "",
                        }: {
    label: string;
    value: string;
    className?: string;
}) => (
    <div className={` bg-[#FAFBFC] border border-[#E5E7EB] p-3 ${className}`}>
        <p className="text-[10px] uppercase tracking-wide text-brand-secondary mb-1">{label}</p>
        <p className="text-[13px] text-brand-dark break-words">{value}</p>
    </div>
);

export const BatchRow = ({ data, gridClass }: BatchRowProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex flex-col border-b border-[#E5E7EB] last:border-b-0 bg-white">
            <div
                className={`hidden lg:grid ${gridClass} gap-4 items-center p-4 cursor-pointer hover:bg-neutral-50/50 transition-colors border-[#E5E7EB] ${
                    isExpanded ? "border-b" : ""
                }`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex justify-center text-brand-secondary">
                    <svg
                        className={`transition-transform duration-300 ease-in-out ${isExpanded ? "rotate-180" : ""}`}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>

                <div className="break-words pr-2 min-w-0">
                    <p className="text-sm text-brand-dark">{data.name}</p>
                    <p className="text-xs text-brand-secondary mt-0.5">{data.date}</p>
                </div>

                <div className="text-sm text-brand-dark">{data.credentials}</div>
                <div className="text-sm text-brand-dark">{data.signers}</div>
                <div>
                    <StatusBadge status={data.status} />
                </div>
                <div className="text-sm text-brand-dark break-words">{data.issuedBy}</div>

                <div onClick={(e) => e.stopPropagation()} className="flex justify-end">
                    <ActionMenu type="batch" infoId={data.id} />
                </div>
            </div>

            <div
                className={`lg:hidden p-4 sm:p-5 cursor-pointer hover:bg-neutral-50/50 transition-colors ${
                    isExpanded ? "border-b border-[#E5E7EB]" : ""
                }`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-2.5">
                            <div className="pt-[2px] text-brand-secondary shrink-0">
                                <svg
                                    className={`transition-transform duration-300 ease-in-out ${isExpanded ? "rotate-180" : ""}`}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-[14px] font-medium text-brand-dark break-words">
                                    {data.name}
                                </p>
                                <p className="text-[12px] text-brand-secondary mt-0.5">
                                    {data.date}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="shrink-0"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ActionMenu type="batch" infoId={data.id} />
                    </div>
                </div>

                <div className="mt-4">
                    <StatusBadge status={data.status} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <MobileMetaItem label="Credentials" value={String(data.credentials)} />
                    <MobileMetaItem label="Signers" value={data.signers} />
                    <MobileMetaItem label="Issued by" value={data.issuedBy} className="col-span-2" />
                </div>
            </div>

            <div
                className={`grid transition-all duration-300 ease-in-out bg-[#FAFBFC] ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 sm:px-5 lg:px-12 pb-5 pt-4 grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4 md:gap-6">
                        <div className="border border-[#E5E7EB] bg-white">
                            <div className="hidden sm:grid grid-cols-2 p-3 border-b border-[#E5E7EB] text-[11px] text-brand-secondary uppercase leading-4 tracking-tight bg-neutral-50/50">
                                <div>Recipient Name</div>
                                <div>Credential Type</div>
                            </div>

                            {data.recipients.length > 0 ? (
                                data.recipients.map((rec, idx) => (
                                    <div
                                        key={idx}
                                        className="border-b border-[#E5E7EB] last:border-0 hover:bg-neutral-50 transition-colors"
                                    >
                                        <div className="hidden sm:grid grid-cols-2 p-3 sm:p-4">
                                            <div className="pr-2 break-words">
                                                <p className="text-[13px] sm:text-sm text-brand-dark">
                                                    {rec.name}
                                                </p>
                                                <p className="text-[11px] sm:text-xs font-menlo text-brand-secondary mt-0.5 break-all">
                                                    {rec.id}
                                                </p>
                                            </div>
                                            <div className="text-[13px] sm:text-sm text-brand-dark flex items-center break-words pr-2">
                                                {rec.type}
                                            </div>
                                        </div>

                                        <div className="sm:hidden p-3">
                                            <p className="text-[10px] uppercase tracking-wide text-brand-secondary mb-1">
                                                Recipient
                                            </p>
                                            <p className="text-[13px] text-brand-dark break-words">
                                                {rec.name}
                                            </p>
                                            <p className="text-[11px] font-menlo text-brand-secondary mt-0.5 break-all">
                                                {rec.id}
                                            </p>

                                            <div className="mt-3">
                                                <p className="text-[10px] uppercase tracking-wide text-brand-secondary mb-1">
                                                    Credential Type
                                                </p>
                                                <p className="text-[13px] text-brand-dark break-words">
                                                    {rec.type}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-[12px] text-brand-secondary italic">
                                    No recipients available.
                                </div>
                            )}
                        </div>

                        <div className="border border-[#E5E7EB] bg-white h-fit">
                            <div className="p-3 border-b border-[#E5E7EB] text-[11px] text-brand-secondary uppercase leading-4 tracking-tight bg-neutral-50/50">
                                Signer Status
                            </div>

                            {data.signerDetails.length > 0 ? (
                                data.signerDetails.map((signer, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 p-3 sm:p-4 border-b border-[#E5E7EB] last:border-0 hover:bg-neutral-50 transition-colors"
                                    >
                                        <div className="break-words pr-2 min-w-0">
                                            <p className="text-[13px] sm:text-sm text-brand-dark">
                                                {signer.org}
                                            </p>
                                            <p className="text-[11px] sm:text-xs text-brand-secondary mt-0.5">
                                                {signer.role}
                                            </p>
                                        </div>

                                        <div className="shrink-0">
                                            {signer.status === "approved" ? (
                                                <span className="px-[8px] py-[4px] bg-[#E7FFF7] inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[#10B981] leading-4">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                                                    Approved
                                                </span>
                                            ) : (
                                                <span className="px-[8px] py-[4px] bg-[#FFFBEB] inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[#F59E0B] leading-4">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                                                    Pending approval
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-[12px] text-brand-secondary italic">
                                    No signers info.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};