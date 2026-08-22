interface Props {
    name?: string;
    label?: string;
    class?: string;
    checked?: boolean;
    onchange?: (event: Event) => void;
    disabled?: boolean;
    ref?: HTMLInputElement | null;
}
declare const Switch: import("svelte").Component<Props, {}, "ref" | "checked">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
