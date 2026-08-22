interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
    showFirstLast?: boolean;
    class?: string;
}
declare const Pagination: import("svelte").Component<Props, {}, "">;
type Pagination = ReturnType<typeof Pagination>;
export default Pagination;
