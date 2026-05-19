"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/common/DataTable";
import { ApprovalPipelineModal } from "../ApprovalPipelineModal";

export interface RequestData {
    id: string;
    requestedBy: string;
    inst: string;
    batch: string;
    creds: number;
    status: "Pending" | "1/2 approved" | "Approved" | "Rejected";
    date: string;
}

export const mockRequests: RequestData[] = [
    { id: "1", requestedBy: "Elena Vasquez", inst: "Oxford University", batch: "graduates_june_2026.csv", creds: 5, status: "Pending", date: "13 Mar 2026" },
    { id: "2", requestedBy: "Michael Chen", inst: "Cambridge Institute", batch: "engineering_intake_2026.csv", creds: 8, status: "1/2 approved", date: "12 Mar 2026" },
    { id: "3", requestedBy: "Hannah Clarke", inst: "London School of Economics", batch: "law_graduates_2026.csv", creds: 3, status: "Approved", date: "11 Mar 2026" },
    { id: "4", requestedBy: "Alistair McGregor", inst: "University of Edinburgh", batch: "phd_cohort_q1_2026.csv", creds: 4, status: "Rejected", date: "10 Mar 2026" },
];

const GRID_COLUMNS = "grid-cols-[2fr_2.5fr_1.5fr_1.5fr_200px]";

interface RequestsTableProps { currentItems: RequestData[]; filteredItems: RequestData[]; }

export const RequestsTable = ({ currentItems, filteredItems }: RequestsTableProps) => {
    const [approvingRequest, setApprovingRequest] = useState<RequestData | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    const pendingCount = filteredItems.filter((r) => r.status === "Pending" || r.status === "1/2 approved").length;
    const rejectedCount = filteredItems.filter((r) => r.status === "Rejected").length;
    const approvedCount = filteredItems.filter((r) => r.status === "Approved").length;

    const handleStartPipeline = () => {
        setApprovingRequest(null);
        setIsAnimatingOut(false);
        setShowToast(true);
        setTimeout(() => setIsAnimatingOut(true), 3500);
        setTimeout(() => setShowToast(false), 3900);
    };

    return (
        <>
            <style>{`@keyframes tE { from { opacity: 0; transform: translateY(-20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } } @keyframes tX { from { opacity: 1; transform: translateX(0) scale(1); } to { opacity: 0; transform: translateX(100px) scale(0.9); } } .animate-toast-enter { animation: tE 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; } .animate-toast-exit { animation: tX 0.4s cubic-bezier(0.7, 0, 0.84, 0) forwards; }`}</style>

            {showToast && (
                <div className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-6 lg:right-8 z-[100] flex items-start gap-3.5 bg-white p-4 pr-5 sm:pr-6 rounded-sm shadow-[0_4px_24px_rgb(0,0,0,0.1)] border border-[#E5E7EB] sm:max-w-[420px] ${isAnimatingOut ? "animate-toast-exit" : "animate-toast-enter"}`}>
                    <div className="w-7 h-7  bg-[#E7FFF7] flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[14px] font-medium text-brand-dark">Approval Pipeline Started</span>
                        <span className="text-[12px] text-brand-secondary break-words">You sent request to the reviewer Jane Black</span>
                    </div>
                </div>
            )}

            <DataTable
                gridClass={GRID_COLUMNS}
                items={currentItems}
                emptyMessage="No requests found for this filter."
                headerContent={<><div>Requested By</div><div>Batch</div><div>Status</div><div>Requested At</div><div className="text-right">Actions</div></>}
                renderRow={(req) => <RequestRow key={req.id} data={req} gridClass={GRID_COLUMNS} onApprove={() => setApprovingRequest(req)} />}
                footerLeft={<span className="font-medium text-brand-dark text-[12px] sm:text-[13px]">{filteredItems.length} requests</span>}
                footerRight={<span className="block text-left sm:text-right leading-relaxed sm:leading-normal text-[11px] sm:text-[13px]">{pendingCount} pending · {rejectedCount} rejected · {approvedCount} approved</span>}
            />

            <ApprovalPipelineModal isOpen={!!approvingRequest} onClose={() => setApprovingRequest(null)} onStart={handleStartPipeline} batchName={approvingRequest?.batch} />
        </>
    );
};

const StatusBadge = ({ status }: { status: RequestData["status"] }) => {
    const styles = {
        "Pending": { bg: "bg-invalid-bg text-invalid-secondary", dot: "bg-invalid-secondary" },
        "1/2 approved": { bg: "bg-progress-bg text-progress-main", dot: "bg-progress-main" },
        "Approved": { bg: "bg-valid-bg text-valid-main", dot: "bg-valid-main" },
        "Rejected": { bg: "bg-error-bg text-error-main", dot: "bg-error-secondary" }
    }[status];

    if (!styles) return null;
    return (
        <span className={`inline-flex w-fit max-w-full px-2 py-1 items-center gap-1.5 text-[12px] font-medium leading-4 ${styles.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`}></span>{status}
        </span>
    );
};

const MobileMetaItem = ({ label, value }: { label: string; value: string }) => (
    <div className=" bg-[#FAFBFC] border border-[#E5E7EB] p-3">
        <p className="text-[10px] uppercase tracking-wide text-brand-secondary mb-1">{label}</p>
        <p className="text-[13px] text-brand-dark break-words">{value}</p>
    </div>
);

const ActionButtons = ({ onApprove, isMobile }: { onApprove: () => void, isMobile?: boolean }) => (
    <>
        <button onClick={(e) => { e.stopPropagation(); onApprove(); }} className={`flex items-center justify-center gap-1.5 px-3 bg-brand-btn hover:bg-brand-btn/90 text-white text-[12px] font-medium transition-colors ${isMobile ? 'py-2.5 w-full sm:w-auto' : 'py-[9px]'}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Approve
        </button>
        <button onClick={(e) => e.stopPropagation()} className={`flex items-center justify-center gap-1.5 px-3 border border-[#E5E7EB] text-[#DC2626] hover:bg-red-50 text-[12px] font-medium transition-colors ${isMobile ? 'py-2.5 w-full sm:w-auto' : 'py-[9px]'}`}>
            <img width={18} height={18} src="/icons/revoke.svg" alt="" /> Reject
        </button>
    </>
);

const RequestRow = ({ data, gridClass, onApprove }: { data: RequestData; gridClass: string; onApprove: () => void; }) => {
    const router = useRouter();
    const goToRequest = () => router.push(`/dashboard/request/${data.id}`);

    return (
        <>
            <div onClick={goToRequest} className={`hidden lg:grid ${gridClass} gap-4 items-center p-4 border-b border-[#E5E7EB] last:border-b-0 hover:bg-neutral-50/50 transition-colors bg-white cursor-pointer`}>
                <div className="min-w-0"><p className="text-sm text-brand-dark break-words">{data.requestedBy}</p><p className="text-xs text-brand-secondary mt-0.5 break-words">{data.inst}</p></div>
                <div className="min-w-0"><p className="text-sm text-brand-dark break-words">{data.batch}</p><p className="text-xs text-brand-secondary mt-0.5">{data.creds} credentials</p></div>
                <div><StatusBadge status={data.status} /></div>
                <div className="text-sm text-brand-secondary">{data.date}</div>
                <div className="flex items-center justify-end gap-2">{data.status === "Pending" && <ActionButtons onApprove={onApprove} />}</div>
            </div>

            <div onClick={goToRequest} className="lg:hidden px-4 py-4 sm:px-5 sm:py-5 border-b border-[#E5E7EB] last:border-b-0 hover:bg-neutral-50/50 transition-colors bg-white cursor-pointer">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1"><p className="text-[14px] font-medium text-brand-dark break-words">{data.requestedBy}</p><p className="text-[13px] text-brand-secondary mt-1 break-words">{data.inst}</p></div>
                    <div className="shrink-0"><StatusBadge status={data.status} /></div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"><MobileMetaItem label="Batch" value={data.batch} /><MobileMetaItem label="Requested at" value={data.date} /></div>
                <div className="mt-3 text-[12px] text-brand-secondary">{data.creds} credentials</div>
                {data.status === "Pending" && <div className="mt-4 flex flex-col sm:flex-row gap-2"><ActionButtons onApprove={onApprove} isMobile /></div>}
            </div>
        </>
    );
};