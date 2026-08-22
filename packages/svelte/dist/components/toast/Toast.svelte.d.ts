type ToastVariant = "info" | "success" | "error" | "warning";
interface Props {
    isVisible: boolean;
    title?: string;
    message?: string;
    variant?: ToastVariant;
    position?: string;
    onClose?: () => void;
    duration?: number;
}
declare const Toast: import("svelte").Component<Props, {}, "">;
type Toast = ReturnType<typeof Toast>;
export default Toast;
