"use client";

interface IssuanceProgressProps {
    progress: number;
}

export const IssuanceProgress = ({ progress }: IssuanceProgressProps) => {
    const circleRadius = 50;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const strokeDashoffset = circleCircumference - (progress / 100) * circleCircumference;

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 animate-in fade-in duration-300">
            <div className="relative w-[120px] h-[120px] mb-6 sm:mb-8">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={circleRadius} fill="none" stroke="#F8FAFC" strokeWidth="6" />
                    <circle
                        cx="60" cy="60" r={circleRadius} fill="none" stroke="#00C48C" strokeWidth="6"
                        strokeDasharray={circleCircumference} strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round" className="transition-all duration-300 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
                    <span className="text-[22px] sm:text-[26px] font-semibold text-brand-dark leading-none tracking-tight">
                        {progress}
                    </span>
                    <span className="text-[11px] sm:text-[12px] text-brand-secondary mt-0.5 font-medium">%</span>
                </div>
            </div>

            <h2 className="text-[15px] sm:text-[16px] font-semibold text-brand-dark mb-2 text-center">
                Signing Credentials...
            </h2>

            <p className="text-[12px] sm:text-[13px] text-brand-secondary text-center max-w-[280px] sm:max-w-[320px] leading-relaxed">
                Applying ECDSA-SD-2023 digital signatures with selective disclosure
            </p>
        </div>
    );
};