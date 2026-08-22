import type { Snippet } from "svelte";
interface Tab {
    id: string;
    label: string;
    content: string | Snippet;
}
interface Props {
    tabs: Tab[];
    defaultTab?: string;
    onChange?: (id: string) => void;
    class?: string;
}
declare const Tabs: import("svelte").Component<Props, {}, "">;
type Tabs = ReturnType<typeof Tabs>;
export default Tabs;
