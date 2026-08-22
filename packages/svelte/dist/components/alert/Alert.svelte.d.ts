import type { Snippet } from "svelte";
type AlertVariant = "info" | "success" | "error" | "warning";
interface Props {
    variant?: AlertVariant;
    title?: string;
    children: Snippet;
    onclose?: () => void;
    class?: string;
}
declare const Alert: import("svelte").Component<Props, {}, "">;
type Alert = ReturnType<typeof Alert>;
export default Alert;
