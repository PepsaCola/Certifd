"use client";

import React from "react";

export const FormSectionTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <h3 className={`text-xs text-brand-secondary font-ibm uppercase tracking-wider mb-2 ${className}`}>
        {children}
    </h3>
);

export const FormLabel = ({ children, className = "", ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label className={`block text-sm font-medium text-brand-dark mb-2 ${className}`} {...props}>
        {children}
    </label>
);

export const FormInput = ({ disabled, className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {

    const activeClass = "w-full border border-[#E5E7EB] px-4 py-3 text-[14px] text-brand-dark focus:outline-none focus:border-brand-btn transition-colors";
    const disabledClass = "w-full border border-[#E5E7EB] px-4 py-3 text-[14px] text-brand-secondary bg-[#FAFBFC] focus:outline-none cursor-default";

    return (
        <input
            disabled={disabled}
            className={`${disabled ? disabledClass : activeClass} ${className}`}
            {...props}
        />
    );
};

export const FormSelect = ({ children, disabled, className = "", ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => {

    const baseClass = "w-full appearance-none border border-[#E5E7EB] px-4 py-3 text-[14px] text-brand-dark bg-white focus:outline-none";
    const stateClass = disabled ? "cursor-default" : "focus:border-brand-btn transition-colors cursor-pointer";

    return (
        <div className="relative">
            <select
                disabled={disabled}
                className={`${baseClass} ${stateClass} ${className}`}
                {...props}
            >
                {children}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
        </div>
    );
};

export const FormHelperText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <p className={`text-xs text-brand-secondary mt-2 ${className}`}>
        {children}
    </p>
);