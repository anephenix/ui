interface Props {
    class?: string;
    defaultValue?: string;
    placeholder?: string;
    name?: string;
    oninput?: (event: Event) => void;
    ref?: HTMLTextAreaElement | null;
}
declare const Textarea: import("svelte").Component<Props, {}, "ref">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
