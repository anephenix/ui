interface Props {
    class?: string;
    text?: string;
    name?: string;
    onclick?: (event: MouseEvent) => void;
    ref?: HTMLButtonElement | null;
}
declare const Button: import("svelte").Component<Props, {}, "ref">;
type Button = ReturnType<typeof Button>;
export default Button;
