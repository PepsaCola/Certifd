"use client";

import { useEffect, useState } from "react";

export type CheckStatus = "pending" | "processing" | "verified" | "error";

export interface ChecklistItemType {
    id: string;
    label: string;
    status: CheckStatus;
}

interface VerifyingStateProps {
    progress: number;
    checklist: ChecklistItemType[];
}

export const VerifyingState = ({ progress, checklist }: VerifyingStateProps) => {
    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const duration = 600;
        const startValue = displayProgress;
        const endValue = progress;

        if (startValue === endValue) return;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const ratio = Math.min(timeElapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - ratio, 3);
            const currentValue = startValue + (endValue - startValue) * easeOut;
            setDisplayProgress(currentValue);
            if (timeElapsed < duration) {
                requestAnimationFrame(animate);
            } else {
                setDisplayProgress(endValue);
            }
        };

        const animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [progress]);

    const circleRadius = 54;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const strokeDashoffset = circleCircumference - (displayProgress / 100) * circleCircumference;

    return (
        <div className="w-full flex flex-col items-center pt-[48px] pb-[100px] animate-in fade-in duration-500">

            <div className="relative flex items-center justify-center w-[120px] h-[120px] mb-[24px]">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={circleRadius} fill="none" stroke="#F1F5F9" strokeWidth="6" />
                    <circle
                        cx="60" cy="60" r={circleRadius}
                        fill="none"
                        stroke="#00D1A0"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={strokeDashoffset}
                    />
                </svg>
                <div className="flex flex-col items-center justify-center z-10">
                    <span className="text-[32px] font-serif text-brand-dark leading-none">
                        {Math.round(displayProgress)}
                    </span>
                    <span className="text-[11px] text-brand-secondary font-medium uppercase mt-[4px] tracking-wide">%</span>
                </div>
            </div>

            <div className="text-center mb-[32px]">
                <h1 className="font-serif text-2xl font-normal text-brand-dark mb-[8px]">
                    Verifying Credential
                </h1>
                <p className="font-sans text-sm font-normal text-brand-secondary">
                    Validating credential authenticity and issuer identity.
                </p>
            </div>

            <div className="w-full max-w-[540px] bg-white border border-neutral-200/80 p-[40px] rounded-sm">
                <div className="flex flex-col">
                    {checklist.map((item) => (
                        <ChecklistItem key={item.id} label={item.label} status={item.status} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ChecklistItem = ({ label, status }: { label: string, status: CheckStatus }) => {
    return (
        <div className={`flex items-center justify-between transition-opacity py-[16px] border-[#D9DEE7] duration-300 ${status === "pending" ? "opacity-30" : "opacity-100"} not-last:border-b`}>
            <div className="flex items-center gap-[12px]">

                <div className="w-[18px] h-[18px] flex items-center justify-center">
                    {status === "verified" && (
                        <img src="/icons/verified.svg" alt=""/>
                    )}
                    {status === "processing" && (
                        <div className="w-[16px] h-[16px] border-2 border-[#00D1A0] border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {status === "error" && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    )}
                    {status === "pending" && (
                        <div className="w-[1.5px] h-[1.5px] bg-neutral-300 rounded-full"></div>
                    )}
                </div>

                <span className={`text-sm font-normal ${status === "processing" ? "text-brand-dark font-medium" : "text-brand-dark"}`}>
                    {label}
                </span>
            </div>

            <div>
                {status === "verified" && <span className="text-xs  text-[#00D1A0] font-medium">verified</span>}
                {status === "processing" && <span className="text-xs  text-brand-secondary">processing...</span>}
                {status === "error" && <span className="text-xs  text-[#EF4444] font-medium">failed</span>}
            </div>
        </div>
    );
};