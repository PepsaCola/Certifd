export const PaginationControls = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (p: number) => void }) => {

    if (totalPages <= 1) return null;

    const renderButton = (page: number) => (
        <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center text-[13px] font-medium transition-colors ${
                currentPage === page
                    ? "border border-brand-dark text-brand-dark bg-white"
                    : "border border-[#E5E7EB] text-brand-secondary hover:text-brand-dark"
            }`}
        >
            {page}
        </button>
    );

    if (totalPages <= 5) {
        return (
            <div className="flex items-center">
                {Array.from({length: totalPages}, (_, i) => renderButton(i + 1))}
            </div>
        );
    }

    const pages: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            i === currentPage ||
            i === currentPage - 1 ||
            i === currentPage + 1
        ) {
            pages.push(i);
        }
    }

    const renderElements:any[] = [];
    let lastPage = 0;

    pages.forEach((page) => {
        if (lastPage > 0 && page - lastPage > 1) {
            renderElements.push(
                <span key={`dots-${page}`} className="w-8 h-8 flex items-center justify-center text-[13px] border border-[#E5E7EB] text-brand-secondary">
                    ...
                </span>
            );
        }
        renderElements.push(renderButton(page));
        lastPage = page;
    });

    return (
        <div className="flex items-center">
            {renderElements}
        </div>
    );
};