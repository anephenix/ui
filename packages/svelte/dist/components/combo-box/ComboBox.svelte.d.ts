interface ComboBoxOption {
    label: string;
    value: string;
}
interface Props {
    options?: ComboBoxOption[];
    value?: string;
    onChange?: (value: string) => void;
    onSelect?: (option: ComboBoxOption) => void;
    placeholder?: string;
    disabled?: boolean;
}
declare const ComboBox: import("svelte").Component<Props, {}, "">;
type ComboBox = ReturnType<typeof ComboBox>;
export default ComboBox;
