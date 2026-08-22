interface Props {
    type?: string;
    class?: string;
    defaultValue?: string;
    placeholder?: string;
    name?: string;
    onchange?: (event: Event) => void;
    ref?: HTMLInputElement | null;
}
declare const Input: import("svelte").Component<Props, {}, "ref">;
type Input = ReturnType<typeof Input>;
export default Input;
