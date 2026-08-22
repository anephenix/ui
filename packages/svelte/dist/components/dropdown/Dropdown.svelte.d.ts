interface DropdownOption {
    value: string;
    text: string;
}
interface Props {
    options: DropdownOption[];
    multiple?: boolean;
    id?: string;
    class?: string;
    name?: string;
    defaultValue?: string | string[];
    ref?: HTMLSelectElement | null;
}
declare const Dropdown: import("svelte").Component<Props, {}, "ref">;
type Dropdown = ReturnType<typeof Dropdown>;
export default Dropdown;
