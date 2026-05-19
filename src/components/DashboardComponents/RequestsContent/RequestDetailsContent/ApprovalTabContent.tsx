"use client";

interface ApprovalTabContentProps {
    onGoBack: () => void;
    onApprove: () => void;
    onReject: () => void;
}

export const ApprovalTabContent = ({ onGoBack, onApprove, onReject }: ApprovalTabContentProps) => {
    return (
        <div className="p-5 sm:p-8 md:px-10 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8 h-full">

            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-medium text-brand-dark">Your Approval Required</h3>
                    <p className="text-sm text-brand-secondary leading-5">
                        This batch needs your approval to proceed to the next step.<br className="hidden sm:block"/>
                        Please review and approve or reject this credential batch.
                    </p>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="bg-[#0F172A] px-4 py-2 ">
                    <span className="text-[11px] leading-4 text-white/80 uppercase tracking-wide">Signer Status</span>
                </div>

                <div className="flex flex-col border-x border-b border-[#E5E7EB] bg-[#FAFBFC]">
                    <div className="flex items-center justify-between px-4 min-h-[68px] py-3 sm:py-0 border-b border-[#E5E7EB] last:border-0 bg-white last:bg-[#FAFBFC] gap-3">
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-[14px] font-medium text-brand-dark break-words">Your Approval Step</span>
                            <span className="text-[13px] text-[#8C9BB0]">Internal Review</span>
                        </div>
                        <span className="inline-flex px-3 py-1.5 items-center gap-1.5 text-[12px] font-medium bg-[#FFFBEB] text-[#D97706] shrink-0 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span> Pending
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#F4F9FF] p-4 sm:p-5 flex items-start gap-3">
                <img src="/icons/note.svg" alt="" className="shrink-0 mt-0.5" />
                <p className="text-[13px] sm:text-[14px] text-[#6B7FA3] leading-relaxed">
                    After your approval, the batch will proceed to the next step in the pipeline.<br className="hidden sm:block"/>
                    You can leave this page and return later if needed.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-auto gap-4">
                <button
                    onClick={onGoBack}
                    className="px-7 py-3 border border-brand-dark bg-white text-brand-dark font-medium text-[14px] hover:bg-neutral-50 transition-colors w-full sm:w-auto text-center order-2 sm:order-1"
                >
                    Return to Dashboard
                </button>
                <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
                    <button
                        onClick={onReject}
                        className="flex-1 sm:flex-none px-6 sm:px-8 py-3 bg-[#EF4444] hover:bg-[#DC2626] text-white font-medium text-[14px] transition-colors"
                    >
                        Reject
                    </button>
                    <button
                        onClick={onApprove}
                        className="flex-1 sm:flex-none px-6 sm:px-8 py-3 bg-[#00C48C] hover:bg-[#00C48C]/90 text-white font-medium text-[14px] transition-colors"
                    >
                        Approve
                    </button>
                </div>
            </div>

        </div>
    );
};