"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { BatchesTable, mockBatches } from "@/components/DashboardComponents/DigitalCertificatesContent/BatchesTable/BatchesTable";
import { CredentialsTable, mockCredentials } from "@/components/DashboardComponents/DigitalCertificatesContent/CredentialsTable/CredentialsTable";
import { DashboardTitle } from "@/components/DashboardComponents/DashboardTitle/DashboardTitle";
import { DashboardSubtitle } from "@/components/DashboardComponents/DashboardSubtitle/DashboardSubtitle";
import { Pagination } from "@/components/common/Pagination";

const isWithinPeriod = (dateStr: string, period: string) => {
    if (dateStr.includes("ago") || dateStr.includes("Yesterday")) return true;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return true;

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (period === "7d") return diffDays <= 7;
    if (period === "30d") return diffDays <= 30;
    if (period === "90d") return diffDays <= 90;
    if (period === "1y") return diffDays <= 365;

    return true;
};

export const DigitalCertificatesContent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [archivedIds, setArchivedIds] = useState<string[]>([]);
    const [revokedIds, setRevokedIds] = useState<string[]>([]);

    const activeTab = searchParams.get("subtab") || "Issuance Batches";
    const statusFilter = searchParams.get("status") || "All";
    const activePeriod = searchParams.get("period") || "30d";
    const currentPage = Number(searchParams.get("page")) || 1;

    const itemsPerPage = 10;
    const periods = ["7d", "30d", "90d", "1y"];

    const updateUrl = (updates: Record<string, string | number | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value === null) params.delete(key);
            else params.set(key, String(value));
        });

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleTabChange = (tab: string) => {
        updateUrl({ subtab: tab, status: "All", page: 1 });
    };

    const handleStatusFilter = (status: string) => {
        updateUrl({ status, page: 1 });
    };

    const handlePeriodChange = (period: string) => {
        updateUrl({ period, page: 1 });
    };

    const handlePageChange = (page: number) => {
        updateUrl({ page });
    };

    const getFilteredBatches = () => {
        let filtered = mockBatches;

        if (statusFilter === "Pending") filtered = filtered.filter((b) => b.status === "approving");
        else if (statusFilter === "Approvals Received") filtered = filtered.filter((b) => b.status === "approved");
        else if (statusFilter === "Issued") filtered = filtered.filter((b) => b.status === "issued");

        filtered = filtered.filter((b) => isWithinPeriod(b.date, activePeriod));
        return filtered;
    };

    const getFilteredCredentials = () => {
        let filtered = mockCredentials;

        filtered = filtered.filter((c) => !archivedIds.includes(c.id));

        filtered = filtered.map((c) =>
            revokedIds.includes(c.id) ? { ...c, status: "Revoked" } : c
        );

        if (statusFilter !== "All") {
            if (statusFilter === "Invalid") {
                filtered = filtered.filter((c) => c.status === "Unsigned");
            } else {
                filtered = filtered.filter((c) => c.status === statusFilter);
            }
        }

        filtered = filtered.filter((c) => isWithinPeriod(c.time, activePeriod));
        return filtered;
    };

    const filteredBatches = getFilteredBatches();
    const filteredCredentials = getFilteredCredentials();

    const currentFilteredData =
        activeTab === "Issuance Batches" ? filteredBatches : filteredCredentials;
    const currentTotalItems = currentFilteredData.length;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedBatches = filteredBatches.slice(startIndex, endIndex);
    const paginatedCredentials = filteredCredentials.slice(startIndex, endIndex);

    const handleArchive = (id: string) => {
        setArchivedIds((prev) => [...prev, id]);
    };

    const handleRevoke = (id: string) => {
        setRevokedIds((prev) => [...prev, id]);
    };

    const batchStatuses = [
        { label: "All", dot: null },
        { label: "Pending", dot: "bg-[#F59E0B]" },
        { label: "Approvals Received", dot: "bg-[#3B82F6]" },
        { label: "Issued", dot: "bg-[#10B981]" },
    ];

    const credentialStatuses = [
        { label: "All", dot: null },
        { label: "Invalid", dot: "bg-[#F59E0B]" },
        { label: "Revoked", dot: "bg-[#EF4444]" },
        { label: "Valid", dot: "bg-[#10B981]" },
    ];

    const currentStatuses =
        activeTab === "Issuance Batches" ? batchStatuses : credentialStatuses;

    return (
        <div className="animate-in fade-in duration-300">
            <div className="mb-5 sm:mb-6">
                <DashboardTitle>Digital Certificates</DashboardTitle>
                <DashboardSubtitle>
                    Manage credential issuance batches and credential verification activity.
                </DashboardSubtitle>
            </div>

            <div className="bg-white border border-[#E5E7EB] flex flex-col">
                <div className="flex border-b border-[#E5E7EB] overflow-x-auto custom-scrollbar">
                    {["Issuance Batches", "Credentials"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`py-4 px-4 sm:px-5 text-[14px] relative transition-colors whitespace-nowrap shrink-0 ${
                                activeTab === tab
                                    ? "text-brand-dark"
                                    : "text-brand-secondary hover:text-brand-dark"
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0B9F75] "></div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-3 sm:p-4 border-b border-[#E5E7EB] gap-4 w-full">
                    <div className="flex flex-col gap-3 w-full lg:w-auto">
                        <div className="w-full overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
                            <div className="flex bg-white border border-[#E5E7EB] text-brand-secondary w-fit sm:min-w-0">
                                {currentStatuses.map((status, index) => {
                                    const isActive = statusFilter === status.label;

                                    return (
                                        <button
                                            key={status.label}
                                            onClick={() => handleStatusFilter(status.label)}
                                            className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-1.5 relative transition-colors text-[12px] sm:text-[13px] whitespace-nowrap ${
                                                index !== currentStatuses.length - 1
                                                    ? "border-r border-[#E5E7EB]"
                                                    : ""
                                            } ${
                                                isActive
                                                    ? "text-brand-dark font-medium outline outline-1 outline-brand-dark z-10 bg-neutral-50"
                                                    : "hover:text-brand-dark hover:bg-neutral-50"
                                            }`}
                                        >
                                            {status.dot && (
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                                                ></span>
                                            )}
                                            {status.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="text-[12px] sm:text-[13px] text-brand-secondary">
                            Total:{" "}
                            <span className="text-brand-dark font-medium">
                                {currentTotalItems}{" "}
                                {activeTab === "Issuance Batches"
                                    ? "batches"
                                    : "credentials"}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-stretch sm:items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
                        <div className="flex bg-white border border-[#E5E7EB] text-[12px] sm:text-[13px] font-medium text-brand-secondary flex-1 lg:flex-none min-w-0">
                            {periods.map((period) => (
                                <button
                                    key={period}
                                    onClick={() => handlePeriodChange(period)}
                                    className={`flex-1 lg:w-[57px] py-2 relative transition-colors border-r border-[#E5E7EB] last:border-r-0 text-center ${
                                        activePeriod === period
                                            ? "text-brand-dark font-semibold outline outline-1 outline-brand-dark z-10 bg-neutral-50"
                                            : "hover:text-brand-dark hover:bg-neutral-50"
                                    }`}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>

                        <button className="flex items-center justify-center gap-1.5 bg-white border border-[#E5E7EB] px-3 py-2 sm:px-3 sm:py-[9px] text-[12px] sm:text-[13px] font-medium text-brand-dark hover:bg-neutral-50 transition-colors shrink-0 min-w-[44px] sm:min-w-0">
                            <img
                                width={16}
                                height={16}
                                src="/icons/export.svg"
                                alt="Export"
                                className="sm:w-[18px] sm:h-[18px]"
                            />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                    </div>
                </div>

                {activeTab === "Issuance Batches" ? (
                    <BatchesTable
                        currentItems={paginatedBatches}
                        filteredItems={filteredBatches}
                    />
                ) : (
                    <CredentialsTable
                        currentItems={paginatedCredentials}
                        filteredItems={filteredCredentials}
                        onArchiveConfirm={handleArchive}
                        onRevokeConfirm={handleRevoke}
                    />
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalItems={currentTotalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};