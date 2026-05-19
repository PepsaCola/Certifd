"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { TemplatesTable, mockTemplates } from "./TemplatesTable";
import { DashboardTitle } from "@/components/DashboardComponents/DashboardTitle/DashboardTitle";
import { DashboardSubtitle } from "@/components/DashboardComponents/DashboardSubtitle/DashboardSubtitle";
import { Pagination } from "@/components/common/Pagination";
import { useState } from "react";
import { UploadTemplateModal } from "@/components/DashboardComponents/TemplatesContent/UploadTemplateModal";

export const TemplatesContent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const statusFilter = searchParams.get("status") || "All";
    const currentPage = Number(searchParams.get("page")) || 1;
    const itemsPerPage = 10;

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const updateUrl = (updates: Record<string, string | number | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value === null) params.delete(key);
            else params.set(key, String(value));
        });

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const getFilteredTemplates = () => {
        if (statusFilter === "All") return mockTemplates;
        return mockTemplates.filter((t) => t.status === statusFilter);
    };

    const filteredTemplates = getFilteredTemplates();
    const totalItems = filteredTemplates.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredTemplates.slice(startIndex, startIndex + itemsPerPage);

    const statuses = [
        { label: "All", dot: null },
        { label: "Inactive", dot: "bg-[#EF4444]" },
        { label: "Active", dot: "bg-[#10B981]" },
    ];

    return (
        <>
            <div className="mb-5 sm:mb-6">
                <DashboardTitle>Templates</DashboardTitle>
                <DashboardSubtitle>
                    Manage reusable credential document templates for issuance.
                </DashboardSubtitle>
            </div>

            <div className="bg-white border border-[#E5E7EB] flex flex-col">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b border-[#E5E7EB] gap-4">
                    <div className="flex flex-col gap-3 w-full sm:w-auto">
                        <div className="w-full overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
                            <div className="flex bg-white border border-[#E5E7EB] text-brand-secondary rounded-sm w-fit sm:min-w-0">
                                {statuses.map((status, index) => {
                                    const isActive = statusFilter === status.label;

                                    return (
                                        <button
                                            key={status.label}
                                            onClick={() =>
                                                updateUrl({ status: status.label, page: 1 })
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
                                {totalItems} templates
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="bg-[#00C48C] hover:bg-[#00C48C]/90 text-white text-[12px] sm:text-[13px] font-medium px-4 py-2 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shrink-0"
                    >
                        <img src="/icons/upload.svg" alt="" />
                        Upload Template
                    </button>
                </div>

                <TemplatesTable
                    currentItems={currentItems}
                    filteredItems={filteredTemplates}
                />
            </div>

            <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => updateUrl({ page })}
            />

            <UploadTemplateModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
            />
        </>
    );
};