"use client";

interface Step2MappingProps {
    onNext: () => void;
    onBack: () => void;
}

const mappingData = [
    {
        category: "Recipient Information",
        fields: [
            { required: "Recipient Name", csv: "Full Name" },
            { required: "Recipient ID", csv: "Recipient ID" },
            { required: "Email", csv: "Email" },
            { required: "Date of Birth", csv: "Date of Birth" },
            { required: "Nationality", csv: "Nationality" }
        ]
    },
    {
        category: "Credential Information",
        fields: [
            { required: "Credential Type", csv: "Credential Type" },
            { required: "Program", csv: "Program" },
            { required: "Major", csv: "Major" },
            { required: "Faculty", csv: "Faculty" },
            { required: "Department", csv: "Department" },
            { required: "Honors", csv: "Honors" },
            { required: "GPA", csv: "GPA" }
        ]
    },
    {
        category: "Issuance Details",
        fields: [
            { required: "Graduation Date", csv: "Graduation Date" },
            { required: "Completion Date", csv: "Completion Date" },
            { required: "Study Mode", csv: "Study Mode" },
            { required: "ECTS Credits", csv: "ECTS Credits" }
        ]
    }
];

export const Step2Mapping = ({ onNext, onBack }: Step2MappingProps) => {
    return (
        <div className="bg-white border border-[#E5E7EB] p-5 md:p-10 flex flex-col gap-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <div className="flex flex-col items-center justify-center shrink-0">
                        <img
                            src="/icons/file.svg"
                            alt=""
                            className="w-8 h-8 sm:w-auto sm:h-auto"
                        />
                    </div>

                    <div className="flex flex-col min-w-0">
                        <span className="text-[14px] text-brand-dark break-words">
                            graduates_june_2026.csv
                        </span>
                        <span className="text-[12px] text-brand-secondary">
                            5 records loaded
                        </span>
                    </div>
                </div>

                <button
                    onClick={onBack}
                    className="px-5 py-2.5 border border-brand-dark text-sm font-medium text-brand-dark hover:bg-neutral-50 transition-colors w-full sm:w-auto"
                >
                    Upload different file
                </button>
            </div>

            <div className="flex flex-col gap-1.5 mt-1 sm:mt-2">
                <h2 className="text-[18px] font-medium text-brand-dark">
                    Column Mapping
                </h2>
                <p className="text-[14px] text-brand-secondary">
                    Map each detected CSV column to the corresponding credential field.
                </p>
            </div>

            <div className="border border-[#E5E7EB] flex flex-col">
                <div className="hidden sm:grid sm:grid-cols-[1fr_20px_1.5fr] bg-[#0F172A] px-4 py-3">
                    <div className="text-white/80 text-[11px] uppercase leading-4 tracking-tight">
                        Required Field
                    </div>
                    <div></div>
                    <div className="text-white/80 text-[11px] uppercase leading-4 tracking-tight pl-2">
                        CSV Column
                    </div>
                </div>

                <div className="flex flex-col">
                    {mappingData.map((group) => (
                        <div key={group.category} className="flex flex-col">
                            <div className="bg-[#FAFBFC] border-y border-[#E5E7EB] px-4 py-3 text-[10px] font-bold text-[#8C9BB0] uppercase tracking-wider">
                                {group.category}
                            </div>

                            {group.fields.map((field) => (
                                <div
                                    key={field.required}
                                    className="nth-[2n-1]:bg-[#FAFBFC] bg-white border-b border-[#E5E7EB] last:border-b-0 px-4 py-4 sm:px-4 sm:py-3"
                                >
                                    <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[1fr_20px_1.5fr] sm:items-center">
                                        <div className="flex flex-col gap-1 sm:block">
                                            <span className="text-[10px] uppercase tracking-wide text-[#8C9BB0] sm:hidden">
                                                Required field
                                            </span>
                                            <div className="text-[14px] text-brand-dark">
                                                {field.required}
                                            </div>
                                        </div>

                                        <div className="hidden sm:flex justify-center text-[#8C9BB0]">
                                            <img src="/icons/arrow-right.svg" alt="" />
                                        </div>

                                        <div className="flex flex-col gap-1 sm:block sm:pl-2">
                                            <span className="text-[10px] uppercase tracking-wide text-[#8C9BB0] sm:hidden">
                                                CSV column
                                            </span>

                                            <div className="relative">
                                                <select
                                                    defaultValue={field.csv}
                                                    className="w-full appearance-none border border-[#E5E7EB] px-3 py-2 text-[14px] text-brand-dark focus:outline-none focus:border-[#00C48C] transition-colors bg-white cursor-pointer pr-8"
                                                >
                                                    <option value={field.csv}>{field.csv}</option>
                                                </select>

                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#8C9BB0]">
                                                    <svg
                                                        width="14"
                                                        height="14"
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
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <button
                    onClick={onBack}
                    className="px-8 py-3 border border-brand-dark bg-white text-brand-dark font-medium text-[14px] hover:bg-neutral-50 transition-colors w-full sm:w-auto text-center"
                >
                    Back to Upload
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-[13px] font-medium text-[#00C48C] text-center sm:text-left">
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
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        All required fields mapped
                    </div>

                    <button
                        onClick={onNext}
                        className="px-8 py-3 bg-[#00C48C] hover:bg-[#00C48C]/90 text-white font-medium text-[14px] transition-colors w-full sm:w-auto text-center"
                    >
                        Continue to Review
                    </button>
                </div>
            </div>
        </div>
    );
};