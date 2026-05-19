"use client";

interface SignaturesTabContentProps {
    batch: any;
    isFullyApproved: boolean;
    onCompleteIssuance: () => void;
    onGoBack: () => void;
}

export const SignaturesTabContent = ({ batch, isFullyApproved, onCompleteIssuance, onGoBack }: SignaturesTabContentProps) => {

    if (isFullyApproved) {
        return (
            <div className="p-4 sm:p-8 md:px-10 flex flex-col gap-6 sm:gap-8">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                        <h3 className="text-lg font-medium text-brand-dark">All Approvals Received</h3>
                        <p className="text-sm text-brand-secondary leading-5">
                            Ready to issue {batch.credentials} credentials.
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center border border-[#E5E7EB] bg-white w-[80px] h-[62px] shrink-0">
                        <span className="text-sm font-medium text-brand-dark">{batch.signers}</span>
                        <span className="text-[10.40px] text-[#8C9BB0] mt-0.5">Approved</span>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="bg-[#0F172A] px-4 py-2">
                        <span className="text-[11px] leading-4 text-white/80 uppercase tracking-wide">Signer Status</span>
                    </div>

                    <div className="flex flex-col border-x border-b border-[#E5E7EB] bg-[#FAFBFC]">
                        {batch.signerDetails.map((signer: any, idx: number) => (
                            <div key={idx}
                                 className="flex items-center justify-between px-4 min-h-[68px] py-3 border-b border-[#E5E7EB] last:border-0 bg-white last:bg-[#FAFBFC] gap-4">
                                <div className="flex flex-col gap-0.5 min-w-0">
                                    <span className="text-[14px] font-medium text-brand-dark break-words">{signer.org}</span>
                                    {signer.role && <span className="text-[13px] text-[#8C9BB0]">{signer.role}</span>}
                                </div>
                                <span className="inline-flex px-3 py-1.5 items-center gap-1.5 text-[12px] font-medium bg-[#E7FFF7] text-[#00C48C] shrink-0 whitespace-nowrap">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C48C]"></span> Approved
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#E7FFF7] px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <svg className="text-[#00C48C] shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 24 24"
                             fill="none" stroke="#004F3B" strokeWidth="2.5" strokeLinecap="round"
                             strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <div className="flex flex-col gap-1 min-w-0">
                            <span className="text-[14px] font-medium text-[#004F3B]">Ready to issue {batch.credentials} credentials.</span>
                            <span className="text-[13px] text-[#007A55] break-words">
                                Signed by: {batch.signerDetails.map((s: any) => s.org).join(', ')}
                            </span>
                        </div>
                    </div>
                </div>

                <button onClick={onCompleteIssuance}
                        className="w-full sm:w-fit sm:self-end px-8 py-3 bg-[#00C48C] hover:bg-[#00C48C]/90 text-white font-medium text-[14px] transition-colors inline-flex items-center justify-center gap-2">
                    Complete Issuance
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 md:px-10 flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-medium text-brand-dark">Waiting for Approvals</h3>
                    <p className="text-sm text-brand-secondary leading-5">
                        Signing requests have been sent.<br className="hidden sm:block"/>
                        Credentials will be signed once all organizations approve the request.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center border border-[#E5E7EB] bg-white w-[80px] h-[62px] shrink-0">
                    <span className="text-sm font-medium text-brand-dark">{batch.signers}</span>
                    <span className="text-[10.40px] text-[#8C9BB0] mt-0.5">Approved</span>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="bg-[#0F172A] px-4 py-2">
                    <span className="text-[11px] leading-4 text-white/80 uppercase tracking-wide">Signer Status</span>
                </div>

                <div className="flex flex-col border-x border-b border-[#E5E7EB] bg-[#FAFBFC]">
                    {batch.signerDetails.map((signer: any, idx: number) => (
                        <div key={idx}
                             className="flex items-center justify-between px-4 min-h-[68px] py-3 border-b border-[#E5E7EB] last:border-0 bg-white last:bg-[#FAFBFC] gap-4">
                            <div className="flex flex-col gap-0.5 min-w-0">
                                <span className="text-[14px] font-medium text-brand-dark break-words">{signer.org}</span>
                                {signer.role && <span className="text-[13px] text-[#8C9BB0]">{signer.role}</span>}
                            </div>
                            {signer.status === 'approved' ? (
                                <span className="inline-flex px-3 py-1.5 items-center gap-1.5 text-[12px] font-medium bg-[#E7FFF7] text-[#00C48C] shrink-0 whitespace-nowrap">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C48C]"></span> Approved
                                </span>
                            ) : (
                                <span className="inline-flex px-3 py-1.5 items-center gap-1.5 text-[12px] font-medium bg-[#FFFBEB] text-[#D97706] shrink-0 whitespace-nowrap">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span> Pending approval
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-start gap-6 sm:gap-8">
                <div className="w-full bg-[#F4F9FF] p-4 sm:p-5 flex items-start gap-3">
                    <img src="/icons/note.svg" alt="" className="shrink-0 mt-0.5"/>
                    <p className="text-[13px] sm:text-[14px] text-[#6B7FA3] leading-relaxed">
                        You can leave this page and return later.<br className="hidden sm:block"/>
                        Credential issuance will complete automatically once all signatures are received.
                    </p>
                </div>

                <button onClick={onGoBack} className="w-full sm:w-fit px-7 py-3 border border-brand-dark bg-white text-brand-dark font-medium text-[14px] hover:bg-neutral-50 transition-colors">
                    Return to Dashboard
                </button>
            </div>
        </div>
    );
};