"use client";

import { useEffect, useRef } from "react";

interface UploadTemplateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const UploadTemplateModal = ({ isOpen, onClose }: UploadTemplateModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <div
                className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-[520px] bg-white shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">

                <div className="flex items-start justify-between px-7 py-5">
                    <div>
                        <h2 className="text-xl font-medium text-brand-dark">Upload Template</h2>
                        <p className="text-xs text-brand-secondary mt-1">Upload a .docx or .pptx file to get started</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-brand-dark "
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="px-7 py-5">
                    <div
                        className="w-full bg-white flex flex-col items-center justify-center transition-colors hover:bg-[#F0F9FF]/30 cursor-pointer"
                        style={{
                            minHeight: "320px",
                            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%233B82F6' stroke-width='2' stroke-dasharray='6, 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                        }}
                        onClick={handleBrowseClick}
                    >

                        <div className="flex items-center gap-2 mb-6 pointer-events-none">
                            <img src="/icons/docx.svg" alt="DOCX Icon" className="w-12 h-14" />
                            <img src="/icons/pptx.svg" alt="PPTX Icon" className="w-12 h-14" />
                        </div>

                        <div className="text-center pointer-events-none">
                            <p className="text-[13px]  text-brand-dark mb-1">
                                Drag & drop your file here
                            </p>
                            <p className="text-[13px] text-brand-secondary">
                                or <span className="text-brand-dark underline ">click to browse</span>
                            </p>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".doc,.docx,.pptx"
                        />

                        <div className="mt-10 flex flex-col items-center gap-2.5 pointer-events-none">
                            <span className="text-[10px] font-imb text-brand-secondary tracking-widest uppercase">Support:</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-brand-secondary border border-[#E5E7EB] bg-white px-2.5 py-1 ">.docx</span>
                                <span className="text-xs text-brand-secondary border border-[#E5E7EB] bg-white px-2.5 py-1 ">.doc</span>
                                <span className="text-xs text-brand-secondary border border-[#E5E7EB] bg-white px-2.5 py-1 ">.pptx</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="px-7 py-5 flex items-center justify-between gap-2 border-t border-[#E5E7EB] bg-[#F8F9FA] ">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 border border-[#E5E7EB] bg-white text-brand-dark font-medium text-[14px]  hover:bg-neutral-50 transition-colors "
                    >
                        Cancel
                    </button>
                    <button className="flex-1 py-3 bg-[#00C48C] hover:bg-[#00C48C]/90 text-white font-medium text-[14px]  transition-colors ">
                        Upload Template
                    </button>
                </div>

            </div>
        </div>
    );
};