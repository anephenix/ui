import type { Snippet } from "svelte";
interface TriggerProps {
    onclick: (e: MouseEvent) => void;
    "aria-expanded": boolean;
    "aria-haspopup": "dialog";
}
interface Props {
    trigger: Snippet<[TriggerProps]>;
    content: string | Snippet;
    title?: string;
    position?: string;
    class?: string;
}
declare const Popover: import("svelte").Component<Props, {}, "">;
type Popover = ReturnType<typeof Popover>;
export default Popover;
