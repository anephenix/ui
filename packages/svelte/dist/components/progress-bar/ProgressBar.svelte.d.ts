interface Props {
    value?: number;
    max?: number;
    variant?: string;
    size?: string;
    label?: string;
    showValue?: boolean;
    indeterminate?: boolean;
    class?: string;
}
declare const ProgressBar: import("svelte").Component<Props, {}, "">;
type ProgressBar = ReturnType<typeof ProgressBar>;
export default ProgressBar;
