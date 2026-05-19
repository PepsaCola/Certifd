import React from "react";

interface DataTableProps<T> {
    gridClass: string;
    headerContent: React.ReactNode;
    items: T[];
    renderRow: (item: T, index: number) => React.ReactNode;
    emptyMessage?: string;
    footerLeft?: React.ReactNode;
    footerRight?: React.ReactNode;
}

export const DataTable = <T,>({
                                  gridClass,
                                  headerContent,
                                  items,
                                  renderRow,
                                  emptyMessage = "No items found.",
                                  footerLeft,
                                  footerRight,
                              }: DataTableProps<T>) => {
    return (
        <div className="w-full bg-white flex flex-col">
            <div
                className={`hidden lg:grid ${gridClass} gap-4 items-center bg-[#0F172A] text-white/80 text-[11px] p-4 uppercase leading-4 tracking-tight`}
            >
                {headerContent}
            </div>

            <div className="flex flex-col">
                {items.length > 0 ? (
                    items.map((item, index) => renderRow(item, index))
                ) : (
                    <div className="flex items-center justify-center text-brand-secondary text-[13px] px-4 py-10 text-center">
                        {emptyMessage}
                    </div>
                )}
            </div>

            {(footerLeft || footerRight) && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3.5 text-[12px] text-[#8C9BB0] border-t border-[#E5E7EB] bg-[#FAFBFC] rounded-b-sm">
                    <div>{footerLeft}</div>
                    <div className="text-left sm:text-right">{footerRight}</div>
                </div>
            )}
        </div>
    );
};