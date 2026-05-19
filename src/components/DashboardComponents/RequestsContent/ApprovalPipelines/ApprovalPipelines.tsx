"use client";

import { useState } from "react";
import { PipelineSidebar } from "./PipelineSidebar";

const mockPipelines = [
    { id: "1", name: "Standard Credential Approval", steps: ["Reviewer", "Approver"] },
    { id: "2", name: "PhD Thesis Approval", steps: ["Admin", "Reviewer", "Approver"] },
];

export const ApprovalPipelines = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-5 py-4 border-b border-[#E5E7EB] gap-4">
                <div className="min-w-0">
                    <h2 className="text-[15px] font-semibold text-brand-dark">
                        Approval Pipelines
                    </h2>
                    <p className="text-[13px] text-brand-secondary mt-1 max-w-[680px]">
                        Define sequential sign-off workflows applied before credentials are signed.
                    </p>
                </div>

                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="bg-brand-btn hover:bg-brand-btn/90 text-white text-xs font-medium px-3 py-[9px] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shrink-0"
                >
                    <img width={18} height={18} src="/icons/plus.svg" alt="" />
                    New Pipeline
                </button>
            </div>

            <div className="flex flex-col">
                {mockPipelines.map((pipeline) => (
                    <div
                        key={pipeline.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-5 py-4 sm:py-3.5 border-b border-[#E5E7EB] hover:bg-neutral-50/50 transition-colors gap-4"
                    >
                        <div className="flex flex-col gap-3 min-w-0 flex-1">
                            <h3 className="text-[14px] font-medium text-brand-dark break-words">
                                {pipeline.name}
                            </h3>

                            <div className="flex flex-wrap items-center gap-2">
                                {pipeline.steps.map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-2 min-w-0">
                                        <span className="bg-[#F8FAFC] border border-[#E5E7EB] text-brand-secondary text-[12px] font-medium px-2.5 py-1 rounded-sm whitespace-nowrap">
                                            {step}
                                        </span>

                                        {idx < pipeline.steps.length - 1 && (
                                            <img
                                                src="/icons/arrow-right.svg"
                                                width={16}
                                                height={16}
                                                alt=""
                                                className="shrink-0"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                            <button className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 border border-[#E5E7EB] text-xs font-medium text-brand-dark hover:bg-neutral-50 transition-colors bg-white flex-1 sm:flex-none">
                                <img width={18} height={18} src="/icons/pencil.svg" alt="" />
                                Edit
                            </button>

                            <button className="p-2 text-brand-secondary hover:text-[#EF4444] transition-colors shrink-0">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    stroke="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3.2998 5.4375H14.6998"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M4.0127 5.4375L4.7252 13.9875C4.7252 14.3654 4.87533 14.7279 5.14257 14.9951C5.40981 15.2624 5.77226 15.4125 6.1502 15.4125H11.8502C12.0373 15.4125 12.2226 15.3756 12.3955 15.304C12.5684 15.2324 12.7255 15.1275 12.8578 14.9951C12.9901 14.8628 13.0951 14.7057 13.1667 14.5328C13.2383 14.3599 13.2752 14.1746 13.2752 13.9875L13.9877 5.4375"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.8623 5.4375V3.3C6.8623 3.20643 6.88073 3.11378 6.91654 3.02734C6.95235 2.9409 7.00483 2.86235 7.07099 2.79619C7.13715 2.73003 7.2157 2.67754 7.30214 2.64174C7.38859 2.60593 7.48124 2.5875 7.5748 2.5875H10.4248C10.6138 2.5875 10.795 2.66257 10.9286 2.79619C11.0622 2.92981 11.1373 3.11103 11.1373 3.3V5.4375"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.5752 9L10.4252 11.85M10.4252 9L7.5752 11.85"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-4 sm:px-5 py-3 text-[12px] text-brand-secondary bg-[#FAFBFC] rounded-b-sm">
                {mockPipelines.length} pipelines
            </div>

            <PipelineSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </div>
    );
};