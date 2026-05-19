"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { RequestsTable, mockRequests } from "./RequestsTable/RequestsTable";
import { DashboardTitle } from "@/components/DashboardComponents/DashboardTitle/DashboardTitle";
import { DashboardSubtitle } from "@/components/DashboardComponents/DashboardSubtitle/DashboardSubtitle";
import { Pagination } from "@/components/common/Pagination";
import { ApprovalPipelines } from "@/components/DashboardComponents/RequestsContent/ApprovalPipelines/ApprovalPipelines";

const isWithinPeriod = (dateStr: string, period: string) => {
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

export const RequestsContent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeTab = searchParams.get("subtab") || "Requests";
    const statusFilter = searchParams.get("status") || "All";
    const activePeriod = searchParams.get("period") || "30d";
    const isMyTurn = searchParams.get("myturn") === "true";
    const currentPage = Number(searchParams.get("page")) || 1;

    const itemsPerPage = 10;
    const periods = ["7d", "30d", "90d", "1y"];

    const updateUrl = (updates: Record<string, string | number | boolean | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === false) params.delete(key);
            else params.set(key, String(value));
        });

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const statuses = [
        { label: "All", dot: null },
        { label: "Pending", dot: "bg-[#F59E0B]" },
        { label: "Rejected", dot: "bg-[#EF4444]" },
        { label: "Approved", dot: "bg-[#10B981]" },
    ];

    const getFilteredRequests = () => {
        let filtered = mockRequests;

        if (statusFilter !== "All") {
            if (statusFilter === "Pending") {
                filtered = filtered.filter(
                    (r) =>
                        r.status.includes("Pending") ||
                        (r.status.includes("approved") && r.status !== "Approved")
                );
            } else {
                filtered = filtered.filter((r) => r.status === statusFilter);
            }
        }

        filtered = filtered.filter((r) => isWithinPeriod(r.date, activePeriod));

        if (isMyTurn) {
            filtered = filtered.filter((r) => r.status === "Pending");
        }

        return filtered;
    };

    const filteredRequests = activeTab === "Requests" ? getFilteredRequests() : [];
    const totalItems = filteredRequests.length;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <div className="mb-5 sm:mb-6">
                <DashboardTitle>Requests</DashboardTitle>
                <DashboardSubtitle>
                    Review credential signing requests and manage approval pipelines.
                </DashboardSubtitle>
            </div>

            <div className="bg-white border border-[#E5E7EB] flex flex-col">
                <div className="flex border-b border-[#E5E7EB] overflow-x-auto custom-scrollbar">
                    <div className="flex w-max min-w-full sm:min-w-0">
                        {["Requests", "Approval Pipelines"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() =>
                                    updateUrl({
                                        subtab: tab,
                                        status: "All",
                                        page: 1,
                                        myturn: null,
                                    })
                                }
                                className={`py-4 px-4 sm:px-5 text-[14px] relative transition-colors flex items-center whitespace-nowrap shrink-0 ${
                                    activeTab === tab
                                        ? "text-brand-dark"
                                        : "text-brand-secondary hover:text-brand-dark"
                                }`}
                            >
                                {tab === "Requests" && (
                                    <span className="mr-2 bg-brand-dark text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                                        3
                                    </span>
                                )}

                                {tab}

                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0B9F75] rounded-t-sm"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {activeTab === "Requests" ? (
                    <>
                        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between p-3 sm:p-4 border-b border-[#E5E7EB] gap-4">
                            <div className="flex flex-col gap-3 w-full xl:w-auto">
                                <div className="w-full overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
                                    <div className="flex bg-white border border-[#E5E7EB] text-brand-secondary w-fit sm:min-w-0">
                                        {statuses.map((status, index) => {
                                            const isActive = statusFilter === status.label;

                                            return (
                                                <button
                                                    key={status.label}
                                                    onClick={() =>
                                                        updateUrl({
                                                            status: status.label,
                                                            page: 1,
                                                        })
                                                    }
                                                    className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-1.5 relative transition-colors text-[12px] sm:text-[13px] whitespace-nowrap ${
                                                        index !== statuses.length - 1
                                                            ? "border-r border-[#E5E7EB]"
                                                            : ""
                                                    } ${
                                                        isActive
                                                            ? "text-brand-dark font-medium outline outline-1 outline-brand-dark z-10 bg-neutral-50"
                                                            : "hover:text-brand-dark hover:bg-neutral-50"
                                                    }`}
                                                >
                                                    {status.dot && (
                                                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
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
                                        {totalItems} requests
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 w-full xl:w-auto">
                                <label className="flex items-center gap-2 text-[12px] sm:text-[13px] font-medium text-brand-dark cursor-pointer select-none w-fit">
                                    <div
                                        className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                                            isMyTurn
                                                ? "bg-[#00C48C] border-[#00C48C]"
                                                : "border-[#C4CCD6] bg-white"
                                        }`}
                                    >
                                        {isMyTurn && (
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        )}
                                    </div>

                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={isMyTurn}
                                        onChange={(e) =>
                                            updateUrl({
                                                myturn: e.target.checked ? true : null,
                                                page: 1,
                                            })
                                        }
                                    />
                                    My turn
                                </label>

                                <div className="flex items-stretch gap-3 w-full sm:w-auto">
                                    <div className="flex bg-white border border-[#E5E7EB] text-[12px] sm:text-[13px] font-medium text-brand-secondary flex-1 sm:flex-none min-w-0">
                                        {periods.map((period) => (
                                            <button
                                                key={period}
                                                onClick={() => updateUrl({ period, page: 1 })}
                                                className={`flex-1 sm:w-[57px] py-2 relative transition-colors border-r border-[#E5E7EB] last:border-r-0 text-center ${
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
                                            width={18}
                                            height={18}
                                            src="/icons/export.svg"
                                            alt="Export"
                                            className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
                                        />
                                        <span className="hidden sm:inline">Export</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <RequestsTable
                            currentItems={currentItems}
                            filteredItems={filteredRequests}
                        />
                    </>
                ) : (
                    <ApprovalPipelines />
                )}
            </div>

            {activeTab === "Requests" && (
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(page) => updateUrl({ page })}
                />
            )}
        </>
    );
};