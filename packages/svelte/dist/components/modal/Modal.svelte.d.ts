import type { Snippet } from "svelte";
interface Props {
    isOpen: boolean;
    onClose?: () => void;
    title?: string;
    children: Snippet;
    footer?: Snippet;
}
declare const Modal: import("svelte").Component<Props, {}, "">;
type Modal = ReturnType<typeof Modal>;
export default Modal;
