interface Props {
    name?: string;
    label?: string;
    class?: string;
    defaultValue?: string;
    value?: string;
    onchange?: (event: Event) => void;
    checked?: boolean;
    ref?: HTMLInputElement | null;
}
declare const RadioButton: import("svelte").Component<Props, {}, "ref">;
type RadioButton = ReturnType<typeof RadioButton>;
export default RadioButton;
