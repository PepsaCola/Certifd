"use client";

import { useState } from "react";
import { Step1Upload } from "./Step1Upload";
import { Step2Mapping } from "./Step2Mapping";
import { Step4Signing } from "./Step4Signing";
import { StepProgress } from "@/components/VerifyPageComponents/IssueContent/StepProgress.tsx/StepProgress";
import { Step3Preview } from "@/components/VerifyPageComponents/IssueContent/Step3Preview/Step3Preview";

export const IssueContent = () => {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <section className="min-h-[calc(100vh-140px)] bg-[#F8F9FA] flex flex-col items-center pt-8 pb-10 px-4 sm:pt-[48px] sm:pb-[64px]">
            <div className="max-w-[880px] w-full flex flex-col flex-1">
                <StepProgress currentStep={currentStep} totalSteps={4} />

                <div className="mt-6 mb-6 sm:mt-8 sm:mb-8 flex flex-col gap-2">
                    <h1 className="text-[24px] sm:text-[28px] leading-tight font-serif font-normal text-brand-dark tracking-tight">
                        Issue Digital Certificates
                    </h1>

                    <p className="text-[14px] text-[#8C9BB0] max-w-[640px]">
                        Upload a CSV file containing recipient data to issue W3C verifiable credentials.
                    </p>
                </div>

                {currentStep === 1 && (
                    <Step1Upload onNext={() => setCurrentStep(2)} />
                )}

                {currentStep === 2 && (
                    <Step2Mapping
                        onNext={() => setCurrentStep(3)}
                        onBack={() => setCurrentStep(1)}
                    />
                )}

                {currentStep === 3 && (
                    <Step3Preview
                        onNext={() => setCurrentStep(4)}
                        onBack={() => setCurrentStep(2)}
                    />
                )}

                {currentStep === 4 && (
                    <Step4Signing
                        onNext={() => alert("Success! Launching Issuance Animation!")}
                        onBack={() => setCurrentStep(3)}
                    />
                )}
            </div>

            <div className="mt-10 sm:mt-16 flex items-start sm:items-center justify-center gap-2.5 text-[11px] text-[#8C9BB0] max-w-[880px] w-full text-left sm:text-center">
                <svg
                    className="shrink-0 mt-[1px] sm:mt-0"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>

                <span>
                    All credentials are issued as W3C Verifiable Credentials (VC) and stored on a tamper-evident ledger. Certifd complies with ISO/IEC 18013-5 and GDPR.
                </span>
            </div>
        </section>
    );
};