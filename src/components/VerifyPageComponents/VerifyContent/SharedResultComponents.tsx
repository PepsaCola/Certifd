"use client";

import { ReactNode } from "react";

export const ResultCard = ({ children }: { children: ReactNode }) => (
    <div className="w-full max-w-[640px] bg-white border border-neutral-200/80   overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        {children}
    </div>
);

interface ResultHeaderProps {
    variant: "success" | "revoked" | "invalid";
    icon: ReactNode;
    title: string;
    desc: string;
}

export const ResultHeader = ({ variant, icon, title, desc }: ResultHeaderProps) => {
    const styles = {
        success: { bg: "bg-[#ECFDF5]",  title: "text-brand-dark", desc: "text-brand-secondary" },
        revoked: { bg: "bg-error-bg",  title: "text-error-main", desc: "text-error-secondary" },
        invalid: { bg: "bg-invalid-bg",  title: "text-invalid-main", desc: "text-invalid-secondary" },
    }[variant];

    return (
        <div className={`${styles.bg} px-8 py-10 flex flex-col items-center text-center  `}>
            <div className="mb-5 flex items-center justify-center">
                {icon}
            </div>
            <h2 className={`text-lg font-medium mb-2 ${styles.title}`}>
                {title}
            </h2>
            <p className={`text-sm font-normal ${styles.desc}`}>
                {desc}
            </p>
        </div>
    );
};


export const SectionTitle = ({ children }: { children: ReactNode }) => (
    <h3 className="text-slate-500 text-xs font-normal font-ibm uppercase leading-4 tracking-tight mb-6">
        {children}
    </h3>
);


interface DetailRowProps {
    label: string;
    value: string;
    isLink?: boolean;
    valueClass?: string;
}

export const DetailRow = ({ label, value, isLink = false, valueClass = "text-brand-dark" }: DetailRowProps) => (
    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-4 items-start">
        <span className="text-xs font-ibm text-brand-secondary sm:pt-0.5">{label}</span>
        <span className={`text-sm font-normal break-all ${isLink ? "text-[#3B82F6] hover:underline cursor-pointer" : valueClass}`}>
            {value}
        </span>
    </div>
);

export const StatusRow = ({ status, dotBgClass, textClass }: { status: string, dotBgClass: string, textClass: string }) => (
    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-4 items-start">
        <span className="text-xs font-ibm text-brand-secondary">Status</span>
        <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${dotBgClass}`}></span>
            <span className={`text-sm font-medium ${textClass}`}>{status}</span>
        </div>
    </div>
);

export const ResultFooter = ({ onReset, buttonText = "Verify Another" }: { onReset: () => void, buttonText?: any }) => (
    <div className="py-[32px] px-[40px] border-[#E5E7EB] border-t">
        <button
            onClick={onReset}
            className="cursor-pointer w-full border border-brand-dark text-brand-dark font-medium hover:bg-brand-dark/10 transition-colors py-3.5"
        >
            {buttonText}
        </button>
    </div>
);