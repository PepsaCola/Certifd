"use client";

import { useState, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const AuthInput = ({ label, type = "text", ...props }: AuthInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    const currentType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="flex flex-col gap-1.5 w-full font-sans">
            {label && (
                <label className="text-[13px] font-semibold text-brand-dark">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={currentType}
                    className={`w-full border border-brand-section-border px-4 py-2.5 text-sm text-brand-dark placeholder:text-neutral-400 focus:outline-none focus:border-brand-btn focus:ring-1 focus:ring-brand-btn transition-colors ${isPassword ? 'pr-10' : ''}`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-secondary hover:text-brand-dark transition-colors cursor-pointer"
                    >
                        <img src="/icons/eye.svg" alt="Toggle visibility" />
                    </button>
                )}
            </div>
        </div>
    );
};

interface AuthSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
}

export const AuthSelect = ({ label, options, placeholder, ...props }: AuthSelectProps) => {
    return (
        <div className="flex flex-col gap-1.5 w-full font-sans">
            {label && (
                <label className="text-[13px] font-semibold text-brand-dark">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    className="w-full appearance-none border border-brand-section-border px-4 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-btn focus:ring-1 focus:ring-brand-btn transition-colors bg-white cursor-pointer invalid:text-neutral-400"
                    {...props}
                >
                    <option value="" disabled hidden>{placeholder}</option>

                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-secondary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
            </div>
        </div>
    );
};

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export const AuthButton = ({ children, ...props }: AuthButtonProps) => (
    <button
        className="cursor-pointer w-full bg-brand-btn hover:bg-brand-btn/90 text-white text-[15px] font-medium py-3 transition-colors"
        {...props}
    >
        {children}
    </button>
);

export const StepIndicator = ({ current, total }: { current: number; total: number }) => (
    <div className="mb-6">
        <span className="text-xs font-normal font-sans text-brand-secondary leading-5">
            Step {current} of {total}
        </span>
        <div className="flex gap-1 mt-[2px] max-w-[108px]">
            {Array.from({ length: total }).map((_, index) => (
                <div
                    key={index}
                    className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ease-in-out ${
                        index < current ? 'bg-brand-btn' : 'bg-neutral-200'
                    }`}
                />
            ))}
        </div>
    </div>
);