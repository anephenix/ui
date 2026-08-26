import "@anephenix/ui-tokens/components/code/Code.css";
import "@anephenix/ui-tokens/components/code-editor/CodeEditor.css";
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-css.js";
interface Props {
    title?: string;
    code?: string;
    language?: string;
    languages?: string[];
    width?: number;
    height?: number;
    resizable?: boolean;
    expandable?: boolean;
    onchange?: (code: string) => void;
    onfinishedtyping?: (code: string) => void;
    finishedTypingDelay?: number;
}
declare const CodeEditor: import("svelte").Component<Props, {}, "code" | "language">;
type CodeEditor = ReturnType<typeof CodeEditor>;
export default CodeEditor;
