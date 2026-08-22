interface SelectOption {
    value: string;
    label: string;
}
interface Props {
    class?: string;
    defaultValue?: string;
    name?: string;
    onchange?: (event: Event) => void;
    options: SelectOption[];
    ref?: HTMLSelectElement | null;
}
declare const Select: import("svelte").Component<Props, {}, "ref">;
type Select = ReturnType<typeof Select>;
export default Select;
