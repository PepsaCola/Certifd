"use client";

import { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { ActionMenu } from "@/components/common/ActionMenu";

export interface TemplateData {
    id: string;
    name: string;
    author: string;
    status: "Active" | "Inactive";
    date: string;
}

export const mockTemplates: TemplateData[] = [
    { id: "1", name: "Bachelor of Science Diploma", author: "John Smith", status: "Active", date: "08 Jan 2026" },
    { id: "2", name: "Master of Arts Certificate", author: "John Smith", status: "Active", date: "22 Jan 2026" },
    { id: "3", name: "Honorary Doctorate", author: "John Smith", status: "Active", date: "10 Feb 2026" },
    { id: "4", name: "Postgraduate Diploma in Law", author: "David Okonkwo", status: "Active", date: "18 Feb 2026" },
    { id: "5", name: "Foundation Year Completion", author: "David Okonkwo", status: "Inactive", date: "03 Nov 2025" }
];

const GRID_COLUMNS = "grid-cols-[3fr_2fr_1.5fr_1.5fr_20px]";

interface TemplatesTableProps {
    currentItems: TemplateData[];
    filteredItems: TemplateData[];
}

export const TemplatesTable = ({ currentItems, filteredItems }: TemplatesTableProps) => {
    const totalItems = filteredItems.length;
    const activeCount = filteredItems.filter((t) => t.status === "Active").length;
    const inactiveCount = filteredItems.filter((t) => t.status === "Inactive").length;

    return (
        <DataTable
            gridClass={GRID_COLUMNS}
            items={currentItems}
            emptyMessage="No templates found."
            headerContent={
                <>
                    <div>Template</div>
                    <div>Author</div>
                    <div>Status</div>
                    <div>Created At</div>
                    <div></div>
                </>
            }
            renderRow={(template) => (
                <TemplateRow key={template.id} data={template} gridClass={GRID_COLUMNS} />
            )}
            footerLeft={
                <span className="font-medium text-brand-dark text-[12px] sm:text-[13px]">
                    {totalItems} templates
                </span>
            }
            footerRight={
                <span className="block text-left sm:text-right leading-relaxed sm:leading-normal text-[11px] sm:text-[13px]">
                    {activeCount} active · {inactiveCount} inactive
                </span>
            }
        />
    );
};

const StatusBadge = ({ status }: { status: TemplateData["status"] }) => {
    return status === "Active" ? (
        <span className="inline-flex w-fit max-w-full px-2 py-1 items-center gap-1.5 text-[12px] font-medium bg-valid-bg text-valid-main leading-4">
            <span className="w-1.5 h-1.5 rounded-full bg-valid-main shrink-0"></span>
            Active
        </span>
    ) : (
        <span className="inline-flex w-fit max-w-full px-2 py-1 items-center gap-1.5 text-[12px] font-medium bg-error-bg text-error-main leading-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] shrink-0"></span>
            Inactive
        </span>
    );
};

const MobileMetaItem = ({
                            label,
                            value,
                        }: {
    label: string;
    value: string;
}) => (
    <div className="rounded-sm bg-[#FAFBFC] border border-[#E5E7EB] p-3">
        <p className="text-[10px] uppercase tracking-wide text-brand-secondary mb-1">
            {label}
        </p>
        <p className="text-[13px] text-brand-dark break-words">
            {value}
        </p>
    </div>
);

const TemplateRow = ({
                         data,
                         gridClass,
                     }: {
    data: TemplateData;
    gridClass: string;
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div
                className={`hidden lg:grid ${gridClass} gap-4 items-center p-4 border-b border-[#E5E7EB] last:border-b-0 hover:bg-neutral-50/50 transition-colors bg-white relative ${
                    isMenuOpen ? "z-20" : "z-0"
                }`}
            >
                <div className="min-w-0">
                    <p className="text-sm text-brand-dark break-words">{data.name}</p>
                </div>

                <div className="text-sm text-brand-dark break-words min-w-0">
                    {data.author}
                </div>

                <div>
                    <StatusBadge status={data.status} />
                </div>

                <div className="text-sm text-brand-secondary">
                    {data.date}
                </div>

                <div className="flex justify-center">
                    <ActionMenu
                        type="template"
                        onToggle={(isOpen) => setIsMenuOpen(isOpen)}
                    />
                </div>
            </div>

            <div
                className={`lg:hidden px-4 py-4 sm:px-5 sm:py-5 border-b border-[#E5E7EB] last:border-b-0 hover:bg-neutral-50/50 transition-colors bg-white relative ${
                    isMenuOpen ? "z-20" : "z-0"
                }`}
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-medium text-brand-dark break-words">
                            {data.name}
                        </p>
                        <p className="text-[13px] text-brand-secondary mt-1 break-words">
                            {data.author}
                        </p>
                    </div>

                    <div className="shrink-0">
                        <ActionMenu
                            type="template"
                            onToggle={(isOpen) => setIsMenuOpen(isOpen)}
                        />
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <StatusBadge status={data.status} />
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <MobileMetaItem label="Created at" value={data.date} />
                </div>
            </div>
        </>
    );
};