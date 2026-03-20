"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";

interface UploadStateProps {
    onUpload: (file: File) => void;
}

export const UploadState = ({ onUpload }: UploadStateProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            onUpload(files[0]); // Передаємо перший файл
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onUpload(files[0]);
        }
    };

    return (
        <div className="w-full flex flex-col animate-in fade-in duration-300">
            <div className=" mb-10">
                <h1 className="font-serif text-[24px] text-brand-dark mb-3">
                    Verify a Certificate
                </h1>
                <p className="font-sans text-[14px] text-brand-secondary">
                    Instantly verify any credential issued through Certifd
                </p>
            </div>

            <div className="w-full max-w-[880px] bg-white border border-[#D9DEE7] p-6 sm:p-[40px]  mb-12">

                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed transition-all cursor-pointer rounded-sm p-5 pt-[80px] flex flex-col items-center text-center mb-8 
                        ${isDragging ? "border-brand-accent bg-brand-accent/5" : "border-[#A8C5DA] bg-[#F8FAFC]/50 hover:bg-[#F0F5FA]"}`
                    }
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.json,.vc"
                    />

                    <div className="flex gap-4 mb-6 pointer-events-none">
                        <img src="/icons/pdf.svg" alt="PDF" />
                        <img src="/icons/json.svg" alt="JSON" />
                        <img src="/icons/vc.svg" alt="VC" />
                    </div>

                    <p className="text-sm text-brand-dark font-medium mb-1 pointer-events-none">
                        Drag and drop a credential file here
                    </p>
                    <p className="text-sm text-brand-secondary mb-[62px]  pointer-events-none">
                        or <span className="underline text-brand-dark">click to browse</span>
                    </p>

                    <div className="flex flex-col items-center pointer-events-none">
                        <span className="text-[10px] text-brand-secondary  uppercase leading-4 tracking-tight mb-[8px]">Support:</span>
                        <div className="flex gap-2">
                            <span className="border border-neutral-200 text-brand-secondary text-xs px-2 py-1 rounded-sm">.pdf</span>
                            <span className="border border-neutral-200 text-brand-secondary text-xs px-2 py-1 rounded-sm">.json</span>
                            <span className="border border-neutral-200 text-brand-secondary text-xs px-2 py-1 rounded-sm">.vc</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-[24px] mb-8">
                    <div className="flex-1 h-px bg-neutral-200"></div>
                    <span className="text-[13px] text-brand-secondary">or</span>
                    <div className="flex-1 h-px bg-neutral-200"></div>
                </div>

                <button className="w-full flex items-center justify-between border border-neutral-200 hover:border-brand-accent hover:shadow-sm transition-all p-[20px] group text-left">
                    <div className="flex items-center gap-4">
                        <div className="w-[36px] h-[36px] bg-[#F5FBFF] flex items-center justify-center">
                            <img src="/icons/qr.svg" alt=""/>
                        </div>
                        <div>
                            <h4 className="text-brand-dark font-medium text-sm leading-5">Scan QR Code</h4>
                            <p className="text-brand-secondary text-xs leading-4">Use your camera to scan the QR code on a certificate.</p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};