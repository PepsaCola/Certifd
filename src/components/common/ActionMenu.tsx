"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ActionMenuProps {
    type: 'valid' | 'unsigned' | 'batch' | 'role' | 'template' | 'member'|'batchDetails';
    onEdit?: () => void;
    onToggle?: (isOpen: boolean) => void;
    onArchive?: () => void;
    onRevoke?: () => void;
    onRemove?: () => void;
    infoId?: string;
}

export const ActionMenu = ({ type, onEdit, onToggle, onArchive, onRevoke, infoId,onRemove }: ActionMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleToggle = (newOpenState: boolean) => {
        setIsOpen(newOpenState);
        if (onToggle) onToggle(newOpenState);
    };

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleToggle(!isOpen);
    };

    return (
        <div className={`relative flex justify-center ${isOpen ? "z-50" : "z-0"}`}>

            <button
                onClick={toggleMenu}
                className={`rounded-full transition-colors relative z-10 ${
                    isOpen ? ' text-[#0B9F75]' : 'text-brand-dark hover:text-[#0B9F75] '
                }`}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleToggle(false);
                        }}
                    ></div>

                    <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#E5E7EB] rounded-sm shadow-[0_4px_20px_rgb(0,0,0,0.08)] z-50  animate-in fade-in zoom-in-95 duration-100">

                        {type === 'valid' && (
                            <>
                                <button className="w-full text-left px-4 py-2 text-[13px] text-brand-dark hover:bg-neutral-50 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                    <img src="/icons/downloadPDF.svg" alt=""/>
                                    Download PDF
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 text-[13px] text-brand-dark border-y
                                    border-[#E5E7EB]  hover:bg-neutral-50 flex items-center gap-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggle(false);
                                        if (onRevoke) onRevoke();
                                    }}
                                >
                                    <img src="/icons/revoke-certificate.svg" alt=""/>
                                    Revoke Certificate
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 text-[13px] text-[#EF4444] hover:bg-red-50 flex items-center gap-2  pt-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggle(false);
                                        if (onArchive) onArchive();
                                    }}
                                >
                                    <img src="/icons/archive.svg" alt=""/>
                                    Archive
                                </button>
                            </>
                        )}

                        {type === 'unsigned' && (
                            <button
                                className="w-full text-left px-4 py-2 text-[13px] text-[#EF4444] hover:bg-red-50 flex items-center gap-2"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img src="/icons/delete.svg" alt=""/>
                                Delete
                            </button>
                        )}

                        {type === 'batch' && (
                            <>
                                <button className="w-full text-left px-4 py-2 text-[13px] text-brand-dark hover:bg-neutral-50 flex items-center gap-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`/dashboard/batch/${infoId}`);
                                        }}>
                                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke={'currentColor'}
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.99984 18.3333C14.6022 18.3333 18.3332 14.6024 18.3332 10C18.3332 5.39763 14.6022 1.66667 9.99984 1.66667C5.39746 1.66667 1.6665 5.39763 1.6665 10C1.6665 14.6024 5.39746 18.3333 9.99984 18.3333Z"
                                             stroke-width="1.25" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                        <path d="M10 6.66667V10"  stroke-width="1.25"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10 13.3333H10.0083"  stroke-width="1.25"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    More info
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 text-[13px] text-[#EF4444] hover:bg-red-50 flex items-center gap-2 border-t border-[#E5E7EB] pt-2"
                                    onClick={(e) => e.stopPropagation()}>
                                    <img src="/icons/delete.svg" width={18} height={18} alt=""/>
                                    Delete Batch
                                </button>
                            </>
                        )}
                        {type === 'batchDetails' && (
                            <>
                                <button className="w-full text-left px-4 py-2 text-[13px] text-brand-dark hover:bg-neutral-50 flex items-center gap-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`/dashboard/batch/${infoId}`);
                                        }}>
                                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke={'currentColor'}
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.99984 18.3333C14.6022 18.3333 18.3332 14.6024 18.3332 10C18.3332 5.39763 14.6022 1.66667 9.99984 1.66667C5.39746 1.66667 1.6665 5.39763 1.6665 10C1.6665 14.6024 5.39746 18.3333 9.99984 18.3333Z"
                                            stroke-width="1.25" stroke-linecap="round"
                                            stroke-linejoin="round"/>
                                        <path d="M10 6.66667V10"  stroke-width="1.25"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10 13.3333H10.0083"  stroke-width="1.25"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    More info
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 text-[13px] text-[#EF4444] hover:bg-red-50 flex items-center gap-2 border-t border-[#E5E7EB] pt-2"
                                    onClick={(e) => e.stopPropagation()}>
                                    <img src="/icons/delete.svg" width={18} height={18} alt=""/>
                                    Delete Batch
                                </button>
                            </>
                        )}

                        {type === 'role' && (
                            <>
                                <button
                                    className="w-full text-left px-4 py-2 text-[13px] text-brand-dark hover:bg-neutral-50 flex items-center gap-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggle(false);
                                        if (onEdit) onEdit();
                                    }}
                                >
                                    <img src="/icons/pencil.svg" alt=""/>
                                    Edit Role
                                </button>
                                <button className="w-full text-left px-4 py-2 text-[13px] text-brand-dark hover:bg-neutral-50 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                    <img src="/icons/duplicate.svg" alt=""/>
                                    Duplicate
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 text-[13px] text-brand-dark hover:bg-neutral-50 flex items-center gap-2 border-t border-[#E5E7EB] pt-2"
                                    onClick={(e) => e.stopPropagation()}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={'currentColor'}
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.2998 5.4375H14.6998"  stroke-linecap="round"
                                              stroke-linejoin="round"/>
                                        <path
                                            d="M4.0127 5.4375L4.7252 13.9875C4.7252 14.3654 4.87533 14.7279 5.14257 14.9951C5.40981 15.2624 5.77226 15.4125 6.1502 15.4125H11.8502C12.0373 15.4125 12.2226 15.3756 12.3955 15.304C12.5684 15.2324 12.7255 15.1275 12.8578 14.9951C12.9901 14.8628 13.0951 14.7057 13.1667 14.5328C13.2383 14.3599 13.2752 14.1746 13.2752 13.9875L13.9877 5.4375"
                                             stroke-linecap="round" stroke-linejoin="round"/>
                                        <path
                                            d="M6.8623 5.4375V3.3C6.8623 3.20643 6.88073 3.11378 6.91654 3.02734C6.95235 2.9409 7.00483 2.86235 7.07099 2.79619C7.13715 2.73003 7.2157 2.67754 7.30214 2.64174C7.38859 2.60593 7.48124 2.5875 7.5748 2.5875H10.4248C10.6138 2.5875 10.795 2.66257 10.9286 2.79619C11.0622 2.92981 11.1373 3.11103 11.1373 3.3V5.4375"
                                             stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M7.5752 9L10.4252 11.85M10.4252 9L7.5752 11.85"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>

                                    Delete
                                </button>
                            </>
                        )}

                        {type === 'template' && (
                            <>
                                <button
                                    className="w-full text-left px-4 py-2 text-[13px] text-brand-dark hover:bg-neutral-50 flex items-center gap-2"
                                    onClick={(e) => e.stopPropagation()}>
                                    <img src="/icons/pencil.svg" alt=""/>
                                    Edit Template
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 text-[13px] text-brand-dark hover:bg-neutral-50 flex items-center gap-2"
                                    onClick={(e) => e.stopPropagation()}>
                                    <img src="/icons/duplicate.svg" alt=""/>
                                    Duplicate
                                </button>
                                <button className="w-full text-left px-4 py-2 text-[13px] text-[#EF4444] hover:bg-red-50 flex items-center gap-2 border-t border-[#E5E7EB]  pt-2" onClick={(e) => e.stopPropagation()}>
                                    <img src="/icons/delete.svg" alt=""/>
                                    Delete
                                </button>
                            </>
                        )}
                        {type === 'member' && (
                            <>
                                <button
                                    className="w-full text-left px-4 py-2 text-[13px] text-brand-dark hover:bg-neutral-50 flex items-center gap-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggle(false);
                                        if (onEdit) onEdit();
                                    }}
                                >
                                    <img src="/icons/pencil.svg" width={18} height={18} alt=""/>
                                    Edit Member
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 text-[13px] text-[#EF4444] hover:bg-red-50 flex items-center gap-2 border-t border-[#E5E7EB] pt-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggle(false);
                                        if (onRemove) onRemove();
                                    }}
                                >
                                    <img src="/icons/delete.svg" width={18} height={18} alt=""/>
                                    Remove
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};