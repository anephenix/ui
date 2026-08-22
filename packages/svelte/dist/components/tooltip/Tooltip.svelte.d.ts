import type { Snippet } from "svelte";
interface Props {
    children: Snippet;
    content: string | Snippet;
    position?: string;
    class?: string;
}
declare const Tooltip: import("svelte").Component<Props, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;
