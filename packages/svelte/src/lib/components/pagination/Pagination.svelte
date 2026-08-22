<script lang="ts">
function getPageNumbers(
	currentPage: number,
	totalPages: number,
	siblingCount: number,
): (number | string)[] {
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
}

interface Props {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	siblingCount?: number;
	showFirstLast?: boolean;
	class?: string;
}

let {
	currentPage,
	totalPages,
	onPageChange,
	siblingCount = 1,
	showFirstLast = true,
	class: className,
}: Props = $props();

let pages = $derived(getPageNumbers(currentPage, totalPages, siblingCount));
let classNames = $derived(`pagination${className ? ` ${className}` : ""}`);
</script>

{#if totalPages >= 2}
	<nav class={classNames} aria-label="Pagination">
		{#if showFirstLast}
			<button
				type="button"
				class="pagination-nav"
				aria-label="First page"
				onclick={() => onPageChange(1)}
				disabled={currentPage === 1}
			>
				«
			</button>
		{/if}
		<button
			type="button"
			class="pagination-nav"
			aria-label="Previous page"
			onclick={() => onPageChange(currentPage - 1)}
			disabled={currentPage === 1}
		>
			‹
		</button>
		{#each pages as page (page)}
			{#if page === "left-ellipsis" || page === "right-ellipsis"}
				<span class="pagination-ellipsis">…</span>
			{:else}
				<button
					type="button"
					class="pagination-page{page === currentPage ? ' pagination-page-active' : ''}"
					aria-current={page === currentPage ? "page" : undefined}
					onclick={() => onPageChange(page as number)}
				>
					{page}
				</button>
			{/if}
		{/each}
		<button
			type="button"
			class="pagination-nav"
			aria-label="Next page"
			onclick={() => onPageChange(currentPage + 1)}
			disabled={currentPage === totalPages}
		>
			›
		</button>
		{#if showFirstLast}
			<button
				type="button"
				class="pagination-nav"
				aria-label="Last page"
				onclick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
			>
				»
			</button>
		{/if}
	</nav>
{/if}
