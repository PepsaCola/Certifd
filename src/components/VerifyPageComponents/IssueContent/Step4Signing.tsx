"use client";

import { useState } from "react";

interface Step4SigningProps {
    onNext: () => void;
    onBack: () => void;
}

export const Step4Signing = ({ onNext, onBack }: Step4SigningProps) => {
    const [signingMethod, setSigningMethod] = useState<"direct" | "cosign">("direct");
    const [partners, setPartners] = useState([
        { id: 1, value: "European Accreditation Council" }
    ]);

    const addPartner = () => {
        setPartners([...partners, { id: Date.now(), value: "" }]);
    };

    const removePartner = (id: number) => {
        setPartners(partners.filter((p) => p.id !== id));
    };

    return (
        <div className="bg-white border border-[#E5E7EB] flex flex-col animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-8 gap-4">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <div className="text-[#3B82F6] mt-0.5 shrink-0">
                        <img src="/icons/file.svg" alt="" className="w-8 h-8 sm:w-auto sm:h-auto" />
                    </div>

                    <div className="flex flex-col min-w-0">
                        <span className="text-[14px] text-brand-dark break-words">
                            graduates_june_2026.csv
                        </span>
                        <span className="text-[12px] text-brand-secondary mt-0.5">
                            5 credentials selected
                        </span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    <button className="px-4 py-2 border border-brand-dark text-[14px] font-medium text-brand-dark hover:bg-neutral-50 transition-colors w-full sm:w-auto">
                        Preview PDF
                    </button>
                    <button className="px-4 py-2 border border-brand-dark text-[14px] font-medium text-brand-dark hover:bg-neutral-50 transition-colors w-full sm:w-auto">
                        Upload different file
                    </button>
                </div>
            </div>

            <div className="px-5 md:px-8 pb-5 md:pb-6">
                <h2 className="text-[16px] font-semibold text-brand-dark">Signing Method</h2>
                <p className="text-[13px] text-brand-secondary mt-1">
                    Choose how these credentials will be authorised and signed before issuance.
                </p>
            </div>

            <div className="px-5 md:px-8 pb-8 flex flex-col gap-6 md:gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        onClick={() => setSigningMethod("direct")}
                        className={`relative flex items-start gap-4 p-4 sm:p-5 border-2 cursor-pointer transition-all duration-200 ${
                            signingMethod === "direct"
                                ? "border-[#00C48C] bg-[#F0FDF9]"
                                : "border-[#E5E7EB] bg-white hover:border-[#C4CCD6]"
                        }`}
                    >
                        <div
                            className={`w-10 h-10 flex items-center justify-center border shrink-0 transition-colors ${
                                signingMethod === "direct"
                                    ? "bg-white border-[#00C48C]/40 text-[#00C48C]"
                                    : "bg-[#F1F5F9] border border-[#E5E7EB] text-brand-secondary"
                            }`}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                stroke={"currentColor"}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_137_4115)">
                                    <path
                                        d="M5.36914 6.57907L9.00025 4.76367L12.6314 6.57907V17.4727H5.36914V6.57907Z"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10.2107 15.0507C10.2107 14.7299 10.0833 14.4223 9.85638 14.1953C9.62948 13.9685 9.32173 13.8408 9.00086 13.8408C9.00054 13.8408 9.00022 13.8408 8.99991 13.8408C8.67904 13.8408 8.37128 13.9685 8.14438 14.1953C7.91748 14.4223 7.79004 14.7299 7.79004 15.0507C7.79004 16.107 7.79004 17.4722 7.79004 17.4722H10.2108V15.0507H10.2107Z"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M5.36889 9H0.527344V17.4727H5.36889V9Z"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M17.4724 9H12.6309V17.4727H17.4724V9Z"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M2.94824 12.0261V11.4209"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M2.94824 15.0515V14.4463"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M15.0518 12.0261V11.4209"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10.21 12.0261V11.4209"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M10.21 8.99975V8.39453"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.79004 12.0261V11.4209"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.79004 8.99975V8.39453"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M15.0518 15.0515V14.4463"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M5.36889 9.00003H0.527344V6.5791H5.36889V9.00003Z"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12.6309 9.00003H17.4724V6.5791H12.6309V9.00003Z"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M9 4.76367V0.527344"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12.6311 2.94799H9V0.527344H12.6311L11.4208 1.73753L12.6311 2.94799Z"
                                        strokeMiterlimit="10"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_137_4115">
                                        <rect width="18" height="18" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                        <div className="flex flex-col pr-10 sm:pr-8 min-w-0">
                            <span className="text-[14px] font-medium text-brand-dark mb-1">
                                Issue Directly
                            </span>
                            <span className="text-[13px] text-brand-secondary leading-relaxed">
                                Your organisation signs and issues all credentials immediately upon
                                submission.
                            </span>
                        </div>

                        <div className="absolute top-4 sm:top-5 right-4 sm:right-5 flex items-center justify-center">
                            <div
                                className={`w-5 h-5 rounded-full transition-all duration-200 ${
                                    signingMethod === "direct"
                                        ? "border-[6px] border-[#00C48C] bg-white"
                                        : "border-2 border-[#C4CCD6] bg-transparent"
                                }`}
                            ></div>
                        </div>
                    </div>

                    <div
                        onClick={() => setSigningMethod("cosign")}
                        className={`relative flex items-start gap-4 p-4 sm:p-5 border-2 cursor-pointer transition-all duration-200 ${
                            signingMethod === "cosign"
                                ? "border-[#00C48C] bg-[#F0FDF9]"
                                : "border-[#E5E7EB] bg-white hover:border-[#C4CCD6]"
                        }`}
                    >
                        <div
                            className={`w-10 h-10 flex items-center justify-center border shrink-0 transition-colors ${
                                signingMethod === "cosign"
                                    ? "bg-white border-[#00C48C]/40 text-[#00C48C]"
                                    : "bg-[#F1F5F9] border border-[#E5E7EB] text-brand-secondary"
                            }`}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>

                        <div className="flex flex-col pr-10 sm:pr-8 min-w-0">
                            <span className="text-[14px] font-medium text-brand-dark mb-1">
                                Co-Sign with Partners
                            </span>
                            <span className="text-[13px] text-brand-secondary leading-relaxed">
                                Other institutions must also approve before credentials are issued.
                            </span>
                        </div>

                        <div className="absolute top-4 sm:top-5 right-4 sm:right-5 flex items-center justify-center">
                            <div
                                className={`w-5 h-5 rounded-full transition-all duration-200 ${
                                    signingMethod === "cosign"
                                        ? "border-[6px] border-[#00C48C] bg-white"
                                        : "border-2 border-[#C4CCD6] bg-transparent"
                                }`}
                            ></div>
                        </div>
                    </div>
                </div>

                {signingMethod === "cosign" && (
                    <div className="flex flex-col animate-in fade-in slide-in-from-top-4 duration-300">
                        <span className="text-[11px] text-brand-secondary uppercase tracking-tight mb-2.5">
                            Signing Organisations
                        </span>

                        <div className="border border-[#E5E7EB] bg-[#FAFBFC] flex flex-col">
                            <div className="p-4 border-b border-[#E5E7EB] bg-white/50">
                                <p className="text-[14px] font-medium text-brand-dark">
                                    Oxford University
                                </p>
                                <p className="text-[12px] text-brand-secondary mt-0.5">
                                    Your organisation - always signing
                                </p>
                            </div>

                            <div className="px-4 py-3 flex flex-col gap-4 bg-[#FAFBFC]">
                                {partners.map((partner) => (
                                    <div
                                        key={partner.id}
                                        className="flex flex-col sm:flex-row sm:items-center gap-3 animate-in fade-in duration-200"
                                    >
                                        <div className="relative flex-1">
                                            <select
                                                defaultValue={partner.value}
                                                className="w-full appearance-none border border-[#E5E7EB] px-4 py-2.5 text-[14px] text-brand-dark focus:outline-none focus:border-brand-btn bg-white cursor-pointer pr-10"
                                            >
                                                <option value="" disabled hidden>
                                                    Select partner organisation...
                                                </option>
                                                <option value="European Accreditation Council">
                                                    European Accreditation Council
                                                </option>
                                                <option value="Cambridge Institute">
                                                    Cambridge Institute
                                                </option>
                                                <option value="London School of Economics">
                                                    London School of Economics
                                                </option>
                                            </select>

                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-secondary">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removePartner(partner.id)}
                                            className="w-10 h-10 flex items-center justify-center text-[#8C9BB0] hover:text-[#EF4444] transition-colors shrink-0 self-end sm:self-auto"
                                            title="Remove partner"
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                stroke={"currentColor"}
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M3.2998 5.4375H14.6998"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M4.0127 5.4375L4.7252 13.9875C4.7252 14.3654 4.87533 14.7279 5.14257 14.9951C5.40981 15.2624 5.77226 15.4125 6.1502 15.4125H11.8502C12.0373 15.4125 12.2226 15.3756 12.3955 15.304C12.5684 15.2324 12.7255 15.1275 12.8578 14.9951C12.9901 14.8628 13.0951 14.7057 13.1667 14.5328C13.2383 14.3599 13.2752 14.1746 13.2752 13.9875L13.9877 5.4375"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M6.8623 5.4375V3.3C6.8623 3.20643 6.88073 3.11378 6.91654 3.02734C6.95235 2.9409 7.00483 2.86235 7.07099 2.79619C7.13715 2.73003 7.2157 2.67754 7.30214 2.64174C7.38859 2.60593 7.48124 2.5875 7.5748 2.5875H10.4248C10.6138 2.5875 10.795 2.66257 10.9286 2.79619C11.0622 2.92981 11.1373 3.11103 11.1373 3.3V5.4375"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M7.5752 9L10.4252 11.85M10.4252 9L7.5752 11.85"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="py-5 px-4 border border-t-0 border-[#E5E7EB]">
                            <button
                                onClick={addPartner}
                                className="flex items-center gap-1.5 text-[14px] font-medium text-[#00C48C] hover:opacity-80 transition-opacity w-fit mt-1"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Add signing organisation
                            </button>
                        </div>
                    </div>
                )}

                <div className="bg-[#F5FBFF] p-4 flex items-start gap-3 transition-all duration-300">
                    <div className="text-[#0284C7] shrink-0 mb-0.5">
                        <img src="/icons/note.svg" width={20} height={20} alt="" />
                    </div>

                    <p className="text-[14px] text-[#6B7FA3] leading-relaxed">
                        {signingMethod === "direct" ? (
                            <>
                                <span className="font-semibold">Oxford University</span> will sign
                                and issue all <span className="font-semibold">5 credentials</span>{" "}
                                immediately when you click "Issue Credentials".
                            </>
                        ) : (
                            <>
                                <span className="font-semibold">Tip:</span> Each organisation will
                                receive a signing request and can review and approve credentials
                                using their digital identity. Credentials are issued once all
                                parties have signed.
                            </>
                        )}
                    </p>
                </div>
            </div>

            <div className="px-5 md:px-8 pb-5 md:pb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <button
                    onClick={onBack}
                    className="px-6 py-2.5 border border-brand-dark bg-white text-brand-dark font-medium text-[15px] hover:bg-neutral-50 transition-colors w-full sm:w-auto"
                >
                    Back to Credentials
                </button>

                <button
                    onClick={onNext}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#00C48C] hover:bg-[#00C48C]/90 text-white font-medium text-[15px] transition-colors w-full sm:w-auto"
                >
                    {signingMethod === "direct"
                        ? "Issue Credentials"
                        : "Send Signing Requests"}
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </div>
    );
};