interface Props {
    label?: string;
    class?: string;
    name?: string;
    defaultValue?: boolean;
    ref?: HTMLInputElement | null;
}
declare const Checkbox: import("svelte").Component<Props, {}, "ref">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
