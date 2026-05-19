"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { ApprovalTabContent } from "./ApprovalTabContent";
import { ArchiveCertificateModal } from "@/components/DashboardComponents/DigitalCertificatesContent/ArchiveCertificateModal";
import { RevokeCertificateModal } from "@/components/DashboardComponents/DigitalCertificatesContent/RevokeCertificateModal";
import { BatchHeader } from "@/components/DashboardComponents/BatchDetailsContent/BatchHeader";
import { IssuanceSuccessDetailed } from "@/components/DashboardComponents/BatchDetailsContent/IssuanceSuccessDetailed";
import { IssuanceSuccessSimple } from "@/components/DashboardComponents/BatchDetailsContent/IssuanceSuccessSimple";
import { IssuanceProgress } from "@/components/DashboardComponents/BatchDetailsContent/IssuanceProgress";
import { SignaturesTabContent } from "@/components/DashboardComponents/BatchDetailsContent/SignaturesTabContent";

interface RequestDetailsContentProps {
    mockBatches: any[];
    mockIssuedCredentials: any[];
}

export const RequestDetailsContent = ({
                                          mockBatches,
                                          mockIssuedCredentials,
                                      }: RequestDetailsContentProps) => {
    const router = useRouter();
    const params = useParams();

    const batchId = (params?.id as string) || "1";
    const currentBatch = mockBatches.find((b) => b.id === batchId) || mockBatches[0];

    const initialApproved =
        currentBatch.status === "approved" || currentBatch.status === "issued";

    const [isApproved, setIsApproved] = useState(initialApproved);
    const [activeTab, setActiveTab] = useState(
        initialApproved ? "Signatures" : "Approval"
    );
    const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);

    const [isIssuing, setIsIssuing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showDetailedSuccess, setShowDetailedSuccess] = useState(false);

    const [archivedIds, setArchivedIds] = useState<string[]>([]);
    const [revokedIds, setRevokedIds] = useState<string[]>([]);
    const [archivingCred, setArchivingCred] = useState<any>(null);
    const [revokingCred, setRevokingCred] = useState<any>(null);

    const processedCredentials = mockIssuedCredentials
        .filter((c) => !archivedIds.includes(c.id))
        .map((c) => ({
            ...c,
            status: revokedIds.includes(c.id) ? "Revoked" : "Signed",
        }));

    const handleGoBack = () => router.back();

    const handleApprove = () => {
        setIsApproved(true);
        setActiveTab("Signatures");
    };

    const handleCompleteIssuance = () => {
        setIsIssuing(true);
        setProgress(0);
        setShowDetailedSuccess(false);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setShowDetailedSuccess(true), 1500);
                    return 100;
                }

                return Math.min(prev + Math.floor(Math.random() * 15) + 5, 100);
            });
        }, 150);
    };

    const tabs = isApproved ? ["Signatures", "Credentials"] : ["Approval", "Credentials"];

    return (
        <div
            className="flex flex-col w-full pb-8 sm:pb-10"
            onClick={() => setIsTopMenuOpen(false)}
        >
            <BatchHeader
                batch={currentBatch}
                isIssuing={isIssuing}
                progress={progress}
                isFullyApproved={isApproved}
                isTopMenuOpen={isTopMenuOpen}
                setIsTopMenuOpen={setIsTopMenuOpen}
            />

            <div className="bg-white border border-[#E5E7EB] flex flex-col min-h-[380px] md:min-h-[450px] w-full max-w-[800px] mx-auto">
                {isIssuing ? (
                    progress >= 100 ? (
                        showDetailedSuccess ? (
                            <IssuanceSuccessDetailed
                                credentials={processedCredentials}
                                onArchive={setArchivingCred}
                                onRevoke={setRevokingCred}
                            />
                        ) : (
                            <IssuanceSuccessSimple />
                        )
                    ) : (
                        <IssuanceProgress progress={progress} />
                    )
                ) : (
                    <>
                        <div className="flex border-b border-[#E5E7EB] overflow-x-auto custom-scrollbar">
                            <div className="flex w-max min-w-full sm:min-w-0">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-4 px-5 sm:px-8 text-[13px] sm:text-[14px] font-medium relative transition-colors whitespace-nowrap shrink-0 ${
                                            activeTab === tab
                                                ? "text-brand-dark"
                                                : "text-[#8C9BB0] hover:text-brand-dark"
                                        }`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00C48C] rounded-t-sm"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {activeTab === "Approval" && !isApproved && (
                            <ApprovalTabContent
                                onGoBack={handleGoBack}
                                onApprove={handleApprove}
                                onReject={() => alert("Batch Rejected!")}
                            />
                        )}

                        {activeTab === "Signatures" && isApproved && (
                            <SignaturesTabContent
                                batch={currentBatch}
                                isFullyApproved={true}
                                onCompleteIssuance={handleCompleteIssuance}
                                onGoBack={handleGoBack}
                            />
                        )}

                        {activeTab === "Credentials" && (
                            <div className="p-5 sm:p-8 flex items-center justify-center text-[13px] text-brand-secondary h-full min-h-[260px] sm:min-h-[300px] text-center">
                                Credentials list will be displayed here.
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-center gap-2.5 text-[11px] text-[#8C9BB0] text-left sm:text-center px-4">
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

            <ArchiveCertificateModal
                isOpen={!!archivingCred}
                onClose={() => setArchivingCred(null)}
                onConfirm={(id) => {
                    setArchivedIds((p) => [...p, id]);
                    setArchivingCred(null);
                }}
                credentialData={archivingCred}
            />

            <RevokeCertificateModal
                isOpen={!!revokingCred}
                onClose={() => setRevokingCred(null)}
                onConfirm={(id) => {
                    setRevokedIds((p) => [...p, id]);
                    setRevokingCred(null);
                }}
                credentialData={revokingCred}
            />
        </div>
    );
};