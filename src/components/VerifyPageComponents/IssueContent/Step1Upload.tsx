"use client";

import { useState } from "react";

interface Step1UploadProps {
    onNext: (file?: any) => void;
}

export const Step1Upload = ({ onNext }: Step1UploadProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [hasTemplates, setHasTemplates] = useState(false);

    const handleFileDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        onNext();
    };

    return (
        <div className="bg-white border border-[#E5E7EB] p-5 md:p-10 flex flex-col gap-8 md:gap-10 animate-in fade-in duration-300">
            <div className="flex flex-col gap-2.5">
                <label className="text-[13px] font-semibold text-brand-dark">
                    Certificate Template
                </label>

                {!hasTemplates ? (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full bg-[#FAFBFC] border border-[#E5E7EB] px-4 py-3.5 gap-3 sm:gap-4">
                        <span className="text-[14px] text-brand-secondary">
                            No certificate templates yet
                        </span>

                        <button
                            onClick={() => setHasTemplates(true)}
                            className="flex items-center gap-1.5 text-[14px] font-medium text-brand-dark hover:text-[#00C48C] transition-colors self-start sm:self-auto shrink-0"
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Create Template
                        </button>
                    </div>
                ) : (
                    <div className="relative animate-in fade-in duration-200">
                        <select
                            defaultValue=""
                            className="w-full appearance-none border border-[#E5E7EB] px-4 py-3.5 pr-10 text-[14px] text-brand-dark focus:outline-none focus:border-[#00C48C] transition-colors bg-white cursor-pointer"
                        >
                            <option value="" disabled hidden>
                                Select a certificate template
                            </option>
                            <option value="1">
                                Bachelor of Science in Computer Science
                            </option>
                            <option value="2">
                                Master of Business Administration
                            </option>
                        </select>

                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8C9BB0]">
                            <svg
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
                    </div>
                )}
            </div>

            <div className="flex flex-col">
                <div
                    className={`w-full border-2 border-dashed transition-colors py-8 px-4 sm:py-12 sm:px-6 flex flex-col items-center justify-center cursor-pointer ${
                        isDragging
                            ? "border-[#00C48C] bg-[#E7FFF7]/50"
                            : "border-[#CBD5E1] bg-white hover:bg-[#FAFBFC]"
                    }`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleFileDrop}
                    onClick={() => onNext()}
                >
                    <div className="flex items-center gap-3 mb-5">
                        <div className="relative flex flex-col items-center">
                            <img
                                src="/icons/csv.svg"
                                alt=""
                                className="w-10 h-10 sm:w-auto sm:h-auto"
                            />
                        </div>
                        <div className="relative flex flex-col items-center">
                            <img
                                src="/icons/xlsx.svg"
                                alt=""
                                className="w-10 h-10 sm:w-auto sm:h-auto"
                            />
                        </div>
                    </div>

                    <p className="text-[14px] text-brand-dark font-medium mb-1 text-center">
                        Drag and drop your CSV file here
                    </p>

                    <p className="text-[13px] text-brand-secondary mb-8 sm:mb-10 text-center">
                        or{" "}
                        <span className="text-brand-dark underline cursor-pointer hover:text-[#00C48C] transition-colors">
                            click to browse
                        </span>
                    </p>

                    <div className="flex flex-col items-center w-full max-w-[480px]">
                        <span className="text-[10px] font-ibm text-brand-secondary uppercase tracking-widest mb-3 text-center">
                            Expected CSV Format
                        </span>

                        <div className="w-full sm:w-fit bg-white border border-[#E5E7EB] py-2 px-3 text-center">
                            <span className="text-[13px] text-[#8C9BB0] break-words">
                                Recipient Name, Credential Type, Graduation Date, Recipient ID
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 px-1 text-[12px] text-[#8C9BB0] gap-1 sm:gap-4">
                    <span>Supported format: .csv, .xlsx</span>
                    <span>Maximum size: 25MB</span>
                </div>
            </div>

            <div className="w-full bg-[#F4F9FF] p-4 sm:p-5 flex items-start gap-3 mt-[-4px] md:mt-[-8px]">
                <div className="text-[#3B82F6] shrink-0 mt-0.5">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                </div>

                <p className="text-[13px] text-[#6B7FA3] leading-relaxed">
                    <span className="font-semibold text-[#3B82F6]">Tip:</span> Export your
                    data from your Student Information System (SIS) such as Banner or
                    PeopleSoft and upload it directly. Most exports require no reformatting.
                </p>
            </div>
        </div>
    );
};