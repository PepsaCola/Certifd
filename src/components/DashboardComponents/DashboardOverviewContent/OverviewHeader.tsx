"use client";

interface OverviewHeaderProps {
    activePeriod: string;
    onPeriodChange: (period: string) => void;
}

export const OverviewHeader = ({ activePeriod, onPeriodChange }: OverviewHeaderProps) => {
    const periods = ["7d", "30d", "90d", "1y"];

    return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
            <h1 className="text-xl font-medium text-brand-dark mb-1">Overview</h1>
            <p className="text-sm font-normal text-brand-secondary">Oxford University · March 2026</p>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 w-full md:w-auto">

            <div className="flex bg-white border border-[#E5E7EB] text-[13px] font-medium text-brand-secondary flex-1 md:flex-none">
                {periods.map((period) => {
                    const isActive = activePeriod === period;
                    return (
                        <button
                            key={period}
                            onClick={() => onPeriodChange(period)}
                            className={`
                                    flex-1 md:w-[57px] py-2 relative transition-colors border-r border-[#E5E7EB] last:border-r-0 text-center
                                    ${isActive
                                ? "text-brand-dark font-semibold outline outline-1 outline-brand-dark z-10"
                                : "hover:text-brand-dark hover:bg-neutral-50"
                            }
                                `}
                        >
                            {period}
                        </button>
                    );
                })}
            </div>

            <button className="flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] px-3 py-[9px] text-[13px] font-medium text-brand-dark hover:bg-neutral-50 transition-colors shrink-0">
                <img src="/icons/export.svg" alt="Export"/>
                Export
            </button>
        </div>
    </div>
);
};