"use client";

import { useEffect, useState } from "react";

interface ApprovalPipelineModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStart: () => void;
    batchName?: string;
}

export const ApprovalPipelineModal = ({ isOpen, onClose, onStart, batchName }: ApprovalPipelineModalProps) => {
    const [selectedPipeline, setSelectedPipeline] = useState<string>("standard");

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setSelectedPipeline("standard");
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200" onClick={onClose}></div>

            <div className="relative w-full max-w-[500px] bg-white  shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">

                <div className="flex items-start justify-between px-7 py-5 border-b border-transparent">
                    <div>
                        <h2 className="text-xl font-medium text-brand-dark">Select Approval Pipeline</h2>
                        <p className="text-xs text-brand-secondary mt-1">Batch: {batchName || "Unknown Batch"}</p>
                    </div>
                    <button onClick={onClose} className="text-brand-dark   ">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className=" flex flex-col gap-0 border-y border-[#E5E7EB] ">

                    <label className={`flex items-start gap-4 px-7 py-5 cursor-pointer transition-colors border-b border-[#E5E7EB] ${selectedPipeline === "standard" ? "bg-white" : "hover:bg-white"}`}>
                        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                            <input type="radio" name="pipeline" value="standard" checked={selectedPipeline === "standard"} onChange={(e) => setSelectedPipeline(e.target.value)} className="peer sr-only" />
                            <div className="w-[18px] h-[18px] rounded-full border border-[#D9E0EA] bg-white peer-checked:border-trasparent peer-checked:bg-[#00C48C] transition-colors flex items-center justify-center">
                                <div className={`w-[9px] h-[9px] rounded-full bg-white transition-opacity ${selectedPipeline === "standard" ? "opacity-100" : "opacity-0"}`}></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[14px] font-medium text-brand-dark">Standard Credential Approval</span>
                            <div className="flex items-center gap-2 text-[11px]">
                                <span className="px-2 py-1 bg-[#F5F8FF] border border-[#E5E7EB] rounded-sm text-brand-secondary">Reviewer</span>
                                <img src="/icons/arrow-right.svg" alt=""/>
                                <span className="px-2 py-1 bg-[#F5F8FF] border border-[#E5E7EB] rounded-sm text-brand-secondary">Approver</span>
                            </div>
                        </div>
                    </label>

                    <label className={`flex items-start gap-4 px-7 py-5 cursor-pointer transition-colors ${selectedPipeline === "phd" ? "bg-white" : "hover:bg-white"}`}>
                        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                            <input type="radio" name="pipeline" value="phd" checked={selectedPipeline === "phd"} onChange={(e) => setSelectedPipeline(e.target.value)} className="peer sr-only" />
                            <div className="w-[18px] h-[18px] rounded-full border border-[#D9E0EA]  bg-white peer-checked:border-trasparent peer-checked:bg-[#00C48C] peer-checked:border-[#00C48C] transition-colors flex items-center justify-center">
                                <div className={`w-[9px] h-[9px] rounded-full bg-white transition-opacity ${selectedPipeline === "phd" ? "opacity-100" : "opacity-0"}`}></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[14px] font-medium text-brand-dark">PhD Thesis Approval</span>
                            <div className="flex items-center gap-2 text-[11px]">
                                <span
                                    className="px-2 py-1 bg-[#F5F8FF] border border-[#E5E7EB] rounded-sm text-brand-secondary">Admin</span>
                                <img src="/icons/arrow-right.svg" alt=""/>
                                <span
                                    className="px-2 py-1 bg-[#F5F8FF] border border-[#E5E7EB] rounded-sm text-brand-secondary">Reviewer</span>
                                <img src="/icons/arrow-right.svg" alt=""/>
                                <span
                                    className="px-2 py-1 bg-[#F5F8FF] border border-[#E5E7EB] rounded-sm text-brand-secondary">Approver</span>
                            </div>
                        </div>
                    </label>
                </div>

                <div className="py-5 px-7 bg-[#F8F9FA] flex items-center justify-start gap-2 flex-row-reverse ">
                    <button
                        onClick={onStart}
                        className=" flex-1 px-6 py-2.5 bg-[#00C48C] hover:bg-[#00C48C]/90 text-white text-sm font-medium  transition-colors"
                    >
                        Start Pipeline
                    </button>
                    <button onClick={onClose} className="px-6 py-2.5 border border-[#E5E7EB] text-brand-dark font-medium text-sm  hover:bg-neutral-50 transition-colors">
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
};