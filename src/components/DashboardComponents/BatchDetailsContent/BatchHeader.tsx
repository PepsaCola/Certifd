"use client";

interface BatchHeaderProps {
    batch: any;
    isIssuing: boolean;
    progress: number;
    isFullyApproved: boolean;
    isTopMenuOpen: boolean;
    setIsTopMenuOpen: (val: boolean) => void;
}

export const BatchHeader = ({ batch, isIssuing, progress, isFullyApproved, isTopMenuOpen, setIsTopMenuOpen }: BatchHeaderProps) => {

    const renderBadge = () => {
        const baseClasses = "inline-flex px-3 py-1.5 items-center gap-1.5 text-[12px] font-medium rounded-sm whitespace-nowrap";

        if (batch.status === 'issued' || (isIssuing && progress >= 100)) {
            return (
                <span className={`${baseClasses} bg-[#E7FFF7] text-[#00C48C]`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C48C]"></span> Certificate Issued
                </span>
            );
        }
        if (isIssuing && progress < 100) {
            return (
                <span className={`${baseClasses} bg-[#FFF7ED] text-[#F59E0B]`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span> Issuing...
                </span>
            );
        }
        if (isFullyApproved) {
            return (
                <span className={`${baseClasses} bg-[#EFF6FF] text-[#3B82F6]`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span> All approvals received
                </span>
            );
        }
        return (
            <span className={`${baseClasses} bg-[#FFF7ED] text-[#D97706]`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span> Approving in Progress
            </span>
        );
    };

    return (
        <div className="flex flex-col mb-8 w-full max-w-[800px] mx-auto px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-5 sm:gap-0">

                <div className="flex flex-col gap-2.5">
                    <h1 className="text-[22px] sm:text-[28px] font-serif text-brand-dark tracking-tight leading-tight">
                        {batch.name}
                    </h1>
                    <p className="text-[12px] sm:text-[13px] text-[#8C9BB0]">
                        {batch.credentials} credentials · Requested {batch.date}
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">

                    {renderBadge()}

                    <div className="relative">
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsTopMenuOpen(!isTopMenuOpen); }}
                            className={`px-4 py-2 border bg-white text-[13px] font-medium hover:bg-neutral-50 transition-all flex items-center gap-2 ${
                                isTopMenuOpen
                                    ? "border-[#00C48C] text-[#00C48C]"
                                    : "border-[#E5E7EB] text-brand-dark"
                            }`}
                        >
                            Actions
                            <svg className={`transition-transform duration-200 ${isTopMenuOpen ? 'rotate-180' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </button>

                        {isTopMenuOpen && (
                            <div className="absolute right-0 top-full mt-1.5 w-[180px] bg-white border border-[#E5E7EB] rounded-sm shadow-lg z-50 " onClick={(e) => e.stopPropagation()}>
                                <button className="w-full text-left px-3 py-[9px] text-[13px] text-brand-dark hover:bg-neutral-50 flex items-center gap-2.5">
                                    <img src="/icons/bulk-download.svg" alt=""/> Bulk Download
                                </button>
                                <button className="w-full text-left px-3 py-[9px] text-[13px] text-[#EF4444] hover:bg-red-50 flex items-center gap-2.5 border-t border-[#E5E7EB] pt-2.5">
                                    <img src="/icons/archive.svg" alt=""/> Archive
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};