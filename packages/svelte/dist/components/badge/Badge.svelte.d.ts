import type { Snippet } from "svelte";
interface Props {
    children: Snippet;
    variant?: string;
    size?: string;
    class?: string;
}
declare const Badge: import("svelte").Component<Props, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
