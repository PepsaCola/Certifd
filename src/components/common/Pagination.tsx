"use client";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({
                               currentPage,
                               totalItems,
                               itemsPerPage,
                               onPageChange
                           }: PaginationProps) => {

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    if (totalPages <= 1) return null;

    const renderPages = () => {
        const pages: (number | string)[] = [];
        const siblings = 1;

        pages.push(1);

        let left = Math.max(2, currentPage - siblings);
        let right = Math.min(totalPages - 1, currentPage + siblings);

        if (currentPage <= 2 + siblings) {
            right = Math.min(totalPages - 1, 2 + siblings * 2);
        }
        if (currentPage >= totalPages - 1 - siblings) {
            left = Math.max(2, totalPages - 1 - siblings * 2);
        }

        if (left > 2) {
            if (left === 3) {
                pages.push(2);
            } else {
                pages.push('...');
            }
        }

        for (let i = left; i <= right; i++) {
            pages.push(i);
        }

        if (right < totalPages - 1) {
            if (right === totalPages - 2) {
                pages.push(totalPages - 1);
            } else {
                pages.push('...');
            }
        }

        pages.push(totalPages);

        return pages;
    };

    return (
        <div className="flex items-center justify-between text-[13px] text-brand-secondary pt-5 pb-10">

            <div>
                Showing {startIndex + 1}–{endIndex} of {totalItems}
            </div>

            <div className="flex items-center">
                {renderPages().map((page, index) => {
                    if (page === '...') {
                        return (
                            <div
                                key={`ellipsis-${index}`}
                                className="w-9 h-9 flex items-center justify-center border border-[#E5E7EB] bg-white ml-[-1px] text-brand-secondary"
                            >
                                ...
                            </div>
                        );
                    }

                    const isAct = currentPage === page;

                    return (
                        <button
                            key={`page-${page}`}
                            onClick={() => onPageChange(page as number)}
                            className={`w-9 h-9 flex items-center justify-center border ml-[-1px] transition-colors text-[13px] first:ml-0 
                                ${isAct
                                ? "bg-brand-dark border-brand-dark text-white relative z-10"
                                : "bg-white border-[#E5E7EB] hover:bg-neutral-50 hover:text-brand-dark relative z-0"
                            }`
                            }
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

        </div>
    );
};