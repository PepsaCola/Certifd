"use client";

export const IssuanceSuccessSimple = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 animate-in zoom-in-95 duration-500">

            <div className="w-20 h-20 sm:w-[88px] sm:h-[88px] bg-[#00C48C] rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-sm">
                <svg width="32" height="32" className="sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>

            <h2 className="text-[17px] sm:text-[18px] font-semibold text-brand-dark mb-2 text-center">
                Certificates Issued Successfully
            </h2>

            <p className="text-[12px] sm:text-[13px] text-brand-secondary text-center max-w-[280px] sm:max-w-[380px] leading-relaxed">
                All credentials were signed using the W3C Verifiable Credentials standard.
            </p>
        </div>
    );
};