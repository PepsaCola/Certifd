"use client";

import { useState, useEffect } from "react";

interface PipelineSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PipelineSidebar = ({ isOpen, onClose }: PipelineSidebarProps) => {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const [steps, setSteps] = useState([
        { id: '1', role: 'Reviewer', user: 'Priya Kapoor' },
        { id: '2', role: 'Approver', user: 'David Okonkwo' },
        { id: '3', role: '', user: '' }
    ]);

    const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
    const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIdx(index);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (dragOverIdx !== index) {
            setDragOverIdx(index);
        }
    };

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault();

        if (draggedIdx !== null && draggedIdx !== index) {
            const newSteps = [...steps];
            const draggedItem = newSteps[draggedIdx];

            newSteps.splice(draggedIdx, 1);
            newSteps.splice(index, 0, draggedItem);

            setSteps(newSteps);
        }

        setDraggedIdx(null);
        setDragOverIdx(null);
    };

    const handleDragEnd = () => {
        setDraggedIdx(null);
        setDragOverIdx(null);
    };

    const addStep = () => {
        setSteps([...steps, { id: Date.now().toString(), role: '', user: '' }]);
    };

    const removeStep = (indexToRemove: number) => {
        setSteps(steps.filter((_, idx) => idx !== indexToRemove));
    };

    const updateStep = (index: number, field: 'role' | 'user', value: string) => {
        const newSteps = [...steps];
        newSteps[index][field] = value;
        setSteps(newSteps);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                className="absolute inset-0 bg-brand-dark/20 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div
                className={`relative w-full max-w-[420px] bg-white h-full flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex items-start justify-between px-7 py-5 shrink-0">
                    <div>
                        <h2 className="text-[18px] font-semibold text-brand-dark">New Approval Pipeline</h2>
                        <p className="text-[13px] text-brand-secondary mt-1">Configure the internal approval workflow.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-brand-dark"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-7 pb-5 flex flex-col gap-5 custom-scrollbar">

                    <div>
                        <label className="block text-sm font-medium text-brand-dark mb-2">Pipeline Name</label>
                        <input
                            type="text"
                            placeholder="e.g., Standard Approval"
                            className="w-full border border-[#E5E7EB]  px-3 py-2.5 text-[15px] text-brand-dark placeholder:text-brand-dark/50 focus:outline-none focus:border-brand-btn focus:ring-1 focus:ring-brand-btn transition-colors"
                        />
                    </div>

                    <div className="bg-[#F5FBFF] border border-[#C7D7F0] px-4 py-3 flex items-start gap-2.5">
                        <img src="/icons/note.svg" alt=""/>
                        <p className="text-xs font-medium text-[#2880B9] leading-tight">
                            Credentials are only sent for signing after all steps complete in sequence.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                className={`flex items-start gap-3 relative  border border-transparent transition-all cursor-grab active:cursor-grabbing after:content-[''] after:w-full after:h-px after:absolute after:-bottom-[17px] not-last:after:bg-[#E5E7EB] ${
                                    draggedIdx === index ? 'opacity-40 bg-neutral-100' : ''
                                } ${
                                    dragOverIdx === index && draggedIdx !== index
                                        ? 'bg-[#00C48C]/10 border border-[#00C48C]/30 outline-dashed outline-1 outline-[#00C48C]'
                                        : ''
                                }`}
                            >
                                <div className="w-6 h-6 rounded-full bg-brand-dark text-white text-xs font-medium flex items-center justify-center shrink-0 mt-1 transition-all">
                                    {index + 1}
                                </div>

                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="relative">
                                        <select
                                            value={step.role}
                                            onChange={(e) => updateStep(index, 'role', e.target.value)}
                                            className="w-full appearance-none border border-[#E5E7EB] px-4 py-2.5 text-[13px] text-brand-dark focus:outline-none focus:border-brand-btn bg-white cursor-pointer"
                                        >
                                            <option value="" disabled hidden>Select role</option>
                                            <option value="Reviewer">Reviewer</option>
                                            <option value="Approver">Approver</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-secondary">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={step.user}
                                            onChange={(e) => updateStep(index, 'user', e.target.value)}
                                            className="w-full appearance-none border border-[#E5E7EB] px-4 py-2.5 text-[13px] text-brand-dark focus:outline-none focus:border-brand-btn bg-white cursor-pointer"
                                        >
                                            <option value="" disabled hidden>Select user</option>
                                            <option value="Priya Kapoor">Priya Kapoor</option>
                                            <option value="David Okonkwo">David Okonkwo</option>
                                            <option value="John Smith">John Smith</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-secondary">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex  gap-2 mt-2 shrink-0">
                                    <button className="text-[#8C9BB0] hover:text-brand-dark transition-colors cursor-grab pointer-events-none">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>
                                    </button>
                                    <button
                                        onClick={() => removeStep(index)}
                                        className="text-[#8C9BB0] hover:text-[#EF4444] transition-colors p-1 "
                                    >
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
                                            <path d="M7.5752 9L10.4252 11.85M10.4252 9L7.5752 11.85"  stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={addStep}
                        className="w-full flex items-center justify-center gap-2 border border-brand-dark text-brand-dark font-medium text-[13px] py-2.5 hover:bg-neutral-50 transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Add Step
                    </button>

                    <div className="bg-[#F5FBFF] border border-[#C7D7F0] px-4 py-3 flex items-center gap-2 flex-wrap">
                        <span className="text-[13px] font-medium text-[#2880B9]">Pipeline:</span>
                        <div className="flex flex-wrap items-center gap-2 text-[12px] text-brand-dark overflow-hidden">
                            {steps.filter(s => s.role).length > 0 ? (
                                steps.filter(s => s.role).map((step, idx, arr) => (
                                    <div key={idx} className="flex items-center gap-2 ">
                                        <span className={'px-2 py-1 border border-[#E5E7EB] rounded-sm bg-white'}>{step.role}</span>
                                        {idx < arr.length - 1 && (
                                            <img src="/icons/arrow-right-long.svg" height={20} width={20} alt=""/>                                        )}
                                    </div>
                                ))
                            ) : (
                                <span className="px-2 py-1 text-brand-secondary italic text-[11px]">Empty</span>
                            )}
                        </div>
                    </div>

                </div>

                <div className="px-7 py-4 border-t border-[#E5E7EB] bg-[#F8F9FA]  shrink-0 bg-white">
                    <button
                        onClick={onClose}
                        className="w-full bg-brand-btn hover:bg-brand-btn/90 text-white text-sm font-medium py-3 transition-colors"
                    >
                        Save Changes
                    </button>
                    <p className="text-xs text-brand-secondary text-center mt-3">
                        Unsaved changes will be lost if you navigate away.
                    </p>
                </div>
            </div>
        </div>
    );
};