"use client";

import { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import {
    PaginationControls
} from "@/components/VerifyPageComponents/IssueContent/Step3Preview/PaginationControls/PaginationControls";
import {
    ExpandedCredentialDetails
} from "@/components/VerifyPageComponents/IssueContent/Step3Preview/ExpandedCredentialDetails/ExpandedCredentialDetails";

interface Step3PreviewProps {
    onNext: () => void;
    onBack: () => void;
}

const generateMockData = () => {
    const templates = [
        { name: "Sarah Chen Wei Lin", type: "Bachelor of Science in Computer Science", recId: "SC2026", email: "s.chen@oxford.edu", dob: "14 September 2003", nationality: "British", gradDate: "12 March 2026", compDate: "8 March 2026", studyMode: "Full-time", ects: "240", dept: "Computer Science", honors: "First Class Honours", gpa: "3.92", faculty: "Mathematical, Physical & Life Sciences", program: "Computer Science BSc", major: "Artificial Intelligence" },
        { name: "Ahmad bin Ibrahim", type: "Master of Business Administration", recId: "AI2026", email: "a.ibrahim@oxford.edu", dob: "21 April 2002", nationality: "Malaysian", gradDate: "12 March 2026", compDate: "7 March 2026", studyMode: "Full-time", ects: "180", dept: "Business School", honors: "Distinction", gpa: "3.85", faculty: "Social Sciences", program: "MBA", major: "Global Finance" },
        { name: "Priya Sharma", type: "Bachelor of Engineering (Mechanical)", recId: "PS2026", email: "p.sharma@oxford.edu", dob: "30 June 2004", nationality: "Indian", gradDate: "12 March 2026", compDate: "6 March 2026", studyMode: "Full-time", ects: "240", dept: "Engineering Science", honors: "First Class Honours", gpa: "3.90", faculty: "Mathematical, Physical & Life Sciences", program: "Mechanical Engineering BEng", major: "Robotics" },
        { name: "James Tan Yew Kee", type: "Doctor of Philosophy in Chemistry", recId: "JT2026", email: "j.tan@oxford.edu", dob: "11 August 2000", nationality: "Singaporean", gradDate: "12 March 2026", compDate: "5 March 2026", studyMode: "Full-time", ects: "360", dept: "Chemistry", honors: "N/A", gpa: "3.95", faculty: "Mathematical, Physical & Life Sciences", program: "Chemistry DPhil", major: "Organic Chemistry" },
    ];

    const data = [];
    for (let i = 1; i <= 11; i++) {
        const template = templates[i % templates.length];
        data.push({
            ...template,
            id: i.toString(),
            recId: `${template.recId}${i.toString().padStart(3, "0")}`
        });
    }
    return data;
};

const mockCredentials = generateMockData();
const TABLE_GRID = "grid-cols-[20px_2fr_3fr_1.5fr]";
const DESKTOP_ROW_GRID = "sm:grid sm:grid-cols-[20px_2fr_3fr_1.5fr] sm:gap-4 sm:items-center";
const ITEMS_PER_PAGE = 5;

export const Step3Preview = ({ onNext, onBack }: Step3PreviewProps) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(mockCredentials.map(c => c.id));
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(mockCredentials.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = mockCredentials.slice(startIndex, endIndex);

    const isAllOnPageSelected =
        currentItems.every(item => selectedIds.includes(item.id)) && currentItems.length > 0;

    const toggleAllOnPage = () => {
        if (isAllOnPageSelected) {
            setSelectedIds(selectedIds.filter(id => !currentItems.find(item => item.id === id)));
        } else {
            const idsToAdd = currentItems.map(item => item.id).filter(id => !selectedIds.includes(id));
            setSelectedIds([...selectedIds, ...idsToAdd]);
        }
    };

    const toggleOne = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
        );
    };

    return (
        <div className="bg-white border border-[#E5E7EB] flex flex-col animate-in fade-in duration-500">
            <FileHeader fileName="graduates_june_2026.csv" recordCount={mockCredentials.length} onBack={onBack} />

            <div className="p-5 md:p-8 pb-5 md:pb-6">
                <h2 className="text-[16px] font-semibold text-brand-dark">
                    Preview & Select Credentials
                </h2>
                <p className="text-[13px] text-brand-secondary mt-1">
                    Review the credentials before selecting signing organizations.
                </p>
            </div>

            <div className="px-5 md:px-8 pb-5 md:pb-6">
                <div className="border border-[#E5E7EB] flex flex-col overflow-hidden">
                    <DataTable
                        gridClass={TABLE_GRID}
                        items={currentItems}
                        emptyMessage="No credentials found."
                        headerContent={
                            <>
                                <div className="hidden sm:flex justify-center">
                                    <Checkbox main={true} checked={isAllOnPageSelected} onChange={toggleAllOnPage} />
                                </div>
                                <div className="hidden sm:block">Recipient Name</div>
                                <div className="hidden sm:block">Credential Type</div>
                                <div className="hidden sm:block">Recipient ID</div>
                            </>
                        }
                        renderRow={(cred, index) => {
                            const isExpanded = cred.id === expandedRowId;
                            const isEvenRow = index % 2 === 1;

                            const bgColorClass = isExpanded
                                ? "bg-[#FAFBFC]"
                                : isEvenRow
                                    ? "bg-[#FAFBFC]"
                                    : "bg-white";

                            return (
                                <div key={cred.id} className="flex flex-col">
                                    <div
                                        className={`${bgColorClass} hover:bg-neutral-50/50 transition-colors border-b border-[#F3F4F6] relative z-10 px-4 py-4 ${DESKTOP_ROW_GRID}`}
                                    >
                                        <div className="flex flex-col gap-3 sm:hidden">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-start gap-3 min-w-0 flex-1">
                                                    <div className="pt-[2px]">
                                                        <Checkbox
                                                            checked={selectedIds.includes(cred.id)}
                                                            onChange={() => toggleOne(cred.id)}
                                                        />
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <button
                                                            onClick={() => setExpandedRowId(isExpanded ? null : cred.id)}
                                                            className="text-[14px] font-medium text-brand-dark underline hover:opacity-80 transition-opacity text-left break-words"
                                                        >
                                                            {cred.name}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="shrink-0">
                                                    <span className="text-[11px] font-menlo text-[#2880B9] break-all">
                                                        {cred.recId}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="pl-6">
                                                <div className="text-[10px] uppercase tracking-wide text-[#8C9BB0] mb-1">
                                                    Credential Type
                                                </div>
                                                <div className="text-[13px] text-brand-secondary break-words">
                                                    {cred.type}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hidden sm:flex justify-center">
                                            <Checkbox
                                                checked={selectedIds.includes(cred.id)}
                                                onChange={() => toggleOne(cred.id)}
                                            />
                                        </div>

                                        <div className="hidden sm:block text-[14px] font-medium">
                                            <button
                                                onClick={() => setExpandedRowId(isExpanded ? null : cred.id)}
                                                className="text-brand-dark underline hover:opacity-80 transition-opacity text-left"
                                            >
                                                {cred.name}
                                            </button>
                                        </div>

                                        <div className="hidden sm:block text-[14px] text-brand-secondary truncate pr-4">
                                            {cred.type}
                                        </div>

                                        <div className="hidden sm:block text-[12px] font-menlo text-[#2880B9]">
                                            {cred.recId}
                                        </div>
                                    </div>

                                    <ExpandedCredentialDetails cred={cred} isExpanded={isExpanded} />
                                </div>
                            );
                        }}
                    />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-3 gap-3">
                    <span className="text-xs text-[#8090A3]">
                        Showing {startIndex + 1}-{Math.min(endIndex, mockCredentials.length)} of {mockCredentials.length}
                    </span>

                    {totalPages > 1 && (
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </div>
            </div>

            <StepFooter
                onBack={onBack}
                onNext={onNext}
                selectedCount={selectedIds.length}
                totalCount={mockCredentials.length}
            />
        </div>
    );
};

const Checkbox = ({
                      checked,
                      onChange,
                      main,
                  }: {
    checked: boolean;
    onChange: () => void;
    main?: boolean;
}) => (
    <div className="relative flex items-center justify-center">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className={`peer appearance-none w-[15px] h-[15px] border border-[#C4CCD6] bg-white ${
                main ? "" : "checked:bg-[#00C48C] checked:border-[#00C48C]"
            } cursor-pointer transition-colors`}
        />
        <svg
            className={`absolute w-[11px] h-[11px] ${
                main ? "text-brand-dark" : "text-white"
            } pointer-events-none opacity-0 peer-checked:opacity-100`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    </div>
);

const FileHeader = ({
                        fileName,
                        recordCount,
                        onBack,
                    }: {
    fileName: string;
    recordCount: number;
    onBack: () => void;
}) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-8 border-b border-[#E5E7EB] gap-4">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
            <div className="mt-0.5 shrink-0">
                <img src="/icons/file.svg" alt="" className="w-8 h-8 sm:w-auto sm:h-auto" />
            </div>

            <div className="flex flex-col min-w-0">
                <span className="text-[14px] text-brand-dark break-words">{fileName}</span>
                <span className="text-[12px] text-brand-secondary mt-0.5">
                    {recordCount} records loaded
                </span>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button className="px-4 py-2 border border-brand-dark text-[14px] font-medium text-brand-dark hover:bg-neutral-50 transition-colors w-full sm:w-auto">
                Preview PDF
            </button>
            <button
                onClick={onBack}
                className="px-4 py-2 border border-brand-dark text-[14px] font-medium text-brand-dark hover:bg-neutral-50 transition-colors w-full sm:w-auto"
            >
                Upload different file
            </button>
        </div>
    </div>
);

const StepFooter = ({
                        onBack,
                        onNext,
                        selectedCount,
                        totalCount,
                    }: {
    onBack: () => void;
    onNext: () => void;
    selectedCount: number;
    totalCount: number;
}) => (
    <div className="px-5 md:px-8 pb-5 md:pb-6 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <button
            onClick={onBack}
            className="px-6 py-2.5 border border-brand-dark text-[14px] bg-white text-brand-dark font-medium hover:bg-neutral-50 transition-colors w-full sm:w-auto"
        >
            Back to Mapping
        </button>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <span className="text-[13px] font-medium text-brand-secondary text-center sm:text-left">
                <span className="text-brand-dark">{selectedCount}</span> of {totalCount} selected
            </span>

            <button
                onClick={onNext}
                disabled={selectedCount === 0}
                className="px-6 py-2.5 bg-[#00C48C] hover:bg-[#00C48C]/90 text-white font-medium text-[14px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
                Continue to Signers
            </button>
        </div>
    </div>
);