"use client";

import { useEffect, useState } from "react";

interface ArchiveCertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (id: string) => void;
    credentialData?: {
        id: string;
        name: string;
        type: string;
        recId: string;
    } | null;
}

export const ArchiveCertificateModal = ({ isOpen, onClose, onConfirm, credentialData }: ArchiveCertificateModalProps) => {
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsConfirmed(false);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen || !credentialData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <div
                className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-[500px] bg-white shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">

                <div className="flex items-start justify-between p-6 pb-4 border-b border-transparent">
                    <h2 className="text-[18px] font-semibold text-brand-dark">Archive Certificate</h2>
                    <button
                        onClick={onClose}
                        className="text-brand-dark"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className=" flex flex-col ">

                    <div className="bg-error-bg px-7 py-3 flex items-start gap-2.5 ">
                        <img src="/icons/attention.svg" alt=""/>
                        <p className="text-xs text-[#991B1B] ">
                            <span className="font-bold">Archive removes from active view and public verification.</span> The full record and audit trail will be retained in the database for compliance purposes.
                        </p>
                    </div>

                    <div className="flex items-start justify-between px-7 py-3 border-y border-[#E5E7EB]">
                        <div className="flex flex-col gap-0.5">
                            <p className="text-sm text-brand-dark">{credentialData.name}</p>
                            <p className="text-xs text-brand-secondary">{credentialData.type}</p>
                        </div>
                        <span className="text-xs font-menlo text-[#2880b9]">{credentialData.recId}</span>
                    </div>

                    <div className={'px-7 py-3'}>
                        <label className="block text-[13px] font-medium text-brand-dark mb-2">Archive Reason</label>
                        <div className="relative">
                            <select
                                defaultValue=""
                                className="w-full appearance-none border border-[#E5E7EB] px-3 py-2.5 text-[13px] text-brand-dark focus:outline-none focus:border-brand-btn bg-white cursor-pointer"
                            >
                                <option value="" disabled hidden>Select reason</option>
                                <option value="error">Issued in error</option>
                                <option value="duplicate">Duplicate record</option>
                                <option value="requested">Holder requested removal</option>
                                <option value="other">Other</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-secondary">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={'px-7 pb-5 pt-1'}>
                        <div className="bg-[#F8FAFC] border border-[#E5E7EB]  p-4 ">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={isConfirmed}
                                        onChange={(e) => setIsConfirmed(e.target.checked)}
                                    />
                                    <div
                                        className="w-[16px] h-[16px] border border-[#C4CCD6] bg-white peer-checked:bg-[#EF4444] peer-checked:border-[#EF4444] transition-colors flex items-center justify-center group-hover:border-brand-dark/30">
                                        <svg
                                            className={`w-3 h-3 text-white transition-opacity ${isConfirmed ? 'opacity-100' : 'opacity-0'}`}
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-[12px] text-brand-dark leading-snug select-none">
                                    I understand this will <span className="font-bold">remove the certificate from active view and public verification</span>,
                                    but the record will be retained in the database with a full audit trail.
                                </p>
                            </label>
                        </div>
                    </div>


                </div>

                <div
                    className="p-4 border-t border-[#E5E7EB] bg-[#F8F9FA]  flex items-center justify-start gap-2 flex-row-reverse">
                    <button
                        disabled={!isConfirmed}
                        onClick={() => onConfirm(credentialData.id)}
                        className="flex-1 px-6 py-2.5 bg-[#EF4444] hover:bg-[#DC2626] disabled:bg-[#FCA5A5] disabled:cursor-not-allowed text-white font-medium text-[13px]  transition-colors"
                    >
                        Archive Certificate
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 border border-[#E5E7EB] text-brand-dark font-medium text-[13px]  hover:bg-neutral-50 transition-colors"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
};