import "@anephenix/ui-tokens/components/pagination/Pagination.css";

const getPageNumbers = (
	currentPage: number,
	totalPages: number,
	siblingCount: number,
): (number | string)[] => {
	const totalShown = 2 * siblingCount + 5;

	if (totalPages <= totalShown) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	const left = Math.max(2, currentPage - siblingCount);
	const right = Math.min(totalPages - 1, currentPage + siblingCount);
	const pages: (number | string)[] = [1];

	if (left > 2) pages.push("left-ellipsis");
	for (let i = left; i <= right; i++) pages.push(i);
	if (right < totalPages - 1) pages.push("right-ellipsis");
	pages.push(totalPages);

	return pages;
};

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	siblingCount?: number;
	showFirstLast?: boolean;
	className?: string;
}

const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
	siblingCount = 1,
	showFirstLast = true,
	className,
}: PaginationProps) => {
	if (totalPages < 2) return null;

	const pages = getPageNumbers(currentPage, totalPages, siblingCount);
	const classNames = `pagination${className ? ` ${className}` : ""}`;

	return (
		<nav className={classNames} aria-label="Pagination">
			{showFirstLast && (
				<button
					type="button"
					className="pagination-nav"
					aria-label="First page"
					onClick={() => onPageChange(1)}
					disabled={currentPage === 1}
				>
					«
				</button>
			)}
			<button
				type="button"
				className="pagination-nav"
				aria-label="Previous page"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				‹
			</button>
			{pages.map((page) => {
				if (page === "left-ellipsis" || page === "right-ellipsis") {
					return (
						<span key={page} className="pagination-ellipsis">
							…
						</span>
					);
				}
				const pageNum = page as number;
				const isActive = pageNum === currentPage;
				return (
					<button
						key={pageNum}
						type="button"
						className={`pagination-page${isActive ? " pagination-page-active" : ""}`}
						aria-current={isActive ? "page" : undefined}
						onClick={() => onPageChange(pageNum)}
					>
						{pageNum}
					</button>
				);
			})}
			<button
				type="button"
				className="pagination-nav"
				aria-label="Next page"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				›
			</button>
			{showFirstLast && (
				<button
					type="button"
					className="pagination-nav"
					aria-label="Last page"
					onClick={() => onPageChange(totalPages)}
					disabled={currentPage === totalPages}
				>
					»
				</button>
			)}
		</nav>
	);
};

export default Pagination;
