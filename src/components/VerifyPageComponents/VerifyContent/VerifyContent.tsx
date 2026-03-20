"use client";

import { useState } from "react";
import { UploadState } from "./UploadState";
import { VerifyingState, ChecklistItemType, CheckStatus } from "./VerifyingState";
import { SuccessState } from "./SuccessState";
import { ErrorState } from "./ErrorState";

// Визначаємо всі можливі екрани нашої стейт-машини
type VerifyStep = "upload" | "verifying" | "success" | "revoked" | "invalid";

// Ідеальні 5 етапів, що відповідають скріншоту з Figma
const INITIAL_CHECKLIST: ChecklistItemType[] = [
    { id: "signature", label: "Checking cryptographic signature", status: "pending" },
    { id: "did", label: "Resolving issuer DID", status: "pending" },
    { id: "status", label: "Validating credential status", status: "pending" },
    { id: "format", label: "Confirming W3C VC format", status: "pending" },
    { id: "issuer", label: "Verifying issuer signatures", status: "pending" }
];

export const VerifyContent = () => {
    const [currentStep, setCurrentStep] = useState<VerifyStep>("upload");
    const [progress, setProgress] = useState(0);
    const [checklist, setChecklist] = useState<ChecklistItemType[]>(INITIAL_CHECKLIST);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const updateChecklistStatus = (id: string, status: CheckStatus) => {
        setChecklist(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    };

    const startVerificationFlow = async (file: File) => {
        setUploadedFile(file);
        setCurrentStep("verifying");
        setProgress(0);
        setChecklist(INITIAL_CHECKLIST);

        let currentProcessId = "";

        try {

            currentProcessId = "signature";
            updateChecklistStatus(currentProcessId, "processing");
            await new Promise(r => setTimeout(r, 1200));
            updateChecklistStatus(currentProcessId, "verified");
            setProgress(20);

            currentProcessId = "did";
            updateChecklistStatus(currentProcessId, "processing");
            await new Promise(r => setTimeout(r, 1000));
            updateChecklistStatus(currentProcessId, "verified");
            setProgress(40);

            currentProcessId = "status";
            updateChecklistStatus(currentProcessId, "processing");
            await new Promise(r => setTimeout(r, 1500));
            updateChecklistStatus(currentProcessId, "verified");
            setProgress(60);

            currentProcessId = "format";
            updateChecklistStatus(currentProcessId, "processing");
            await new Promise(r => setTimeout(r, 1000));
            updateChecklistStatus(currentProcessId, "verified");
            setProgress(80);

            currentProcessId = "issuer";
            updateChecklistStatus(currentProcessId, "processing");
            await new Promise(r => setTimeout(r, 1200));
            updateChecklistStatus(currentProcessId, "verified");
            setProgress(100);

            setTimeout(() => setCurrentStep("success"), 500);

        } catch (error: any) {
            updateChecklistStatus(currentProcessId, "error");

            await new Promise(r => setTimeout(r, 1000));

            if (error.message === "REVOKED") {
                setCurrentStep("revoked");
            } else {
                setCurrentStep("invalid");
            }
        }
    };

    const resetFlow = () => {
        setUploadedFile(null);
        setCurrentStep("upload");
    };

    return (
        <section className="min-h-screen bg-[#F8F9FA] flex flex-col items-center pt-[48px] pb-[64px] px-4">

            <div className='max-w-[880px] w-full flex flex-col items-center justify-center flex-1'>

                {currentStep === "upload" && (
                    <UploadState onUpload={startVerificationFlow} />
                )}
                {currentStep === "verifying" && (
                    <VerifyingState progress={progress} checklist={checklist} />
                )}

                {currentStep === "success" && (
                    <SuccessState onReset={resetFlow} />
                )}

                {currentStep === "revoked" && (
                    <ErrorState type="revoked" onReset={resetFlow} />
                )}

                {currentStep === "invalid" && (
                    <ErrorState type="invalid" onReset={resetFlow} />
                )}
            </div>

            <div className="mt-auto flex items-center justify-center gap-[8px] text-[11px] text-brand-secondary/70 max-w-[880px] w-full text-center py-[24px] ">
                <img src="/icons/shild.svg" alt="Shield icon" className="opacity-70" />
                <span>All credentials are issued as W3C Verifiable Credentials (VC) and stored on a tamper-evident ledger. Certifd complies with ISO/IEC 18013-5 and GDPR.</span>
            </div>

        </section>
    );
};