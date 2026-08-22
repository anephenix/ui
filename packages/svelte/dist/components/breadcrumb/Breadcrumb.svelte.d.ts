interface BreadcrumbItem {
    href?: string;
    label: string;
}
interface Props {
    items: BreadcrumbItem[];
    separator?: string;
    class?: string;
}
declare const Breadcrumb: import("svelte").Component<Props, {}, "">;
type Breadcrumb = ReturnType<typeof Breadcrumb>;
export default Breadcrumb;
