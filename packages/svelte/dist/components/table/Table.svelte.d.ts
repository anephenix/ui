interface TableColumn {
    key: string;
    header: string;
    render?: (value: unknown, row: Record<string, unknown>) => string;
}
interface Props {
    columns: TableColumn[];
    rows: Record<string, unknown>[];
    rowKey?: string;
    caption?: string;
    class?: string;
}
declare const Table: import("svelte").Component<Props, {}, "">;
type Table = ReturnType<typeof Table>;
export default Table;
