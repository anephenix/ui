import "@anephenix/ui-tokens/components/terminal/Terminal.css";
import "@anephenix/ui-tokens/components/live-terminal/LiveTerminal.css";
export type LiveTerminalLineType = "input" | "output" | "error";
export interface LiveTerminalLine {
    id?: string | number;
    type: LiveTerminalLineType;
    text: string;
}
interface Props {
    title?: string;
    prompt?: string;
    continuationPrompt?: string;
    lines?: LiveTerminalLine[];
    oncommand?: (command: string) => void;
    getSuggestions?: (input: string) => string[];
    disabled?: boolean;
    width?: number;
    height?: number;
    resizable?: boolean;
    expandable?: boolean;
    historySize?: number;
}
declare const LiveTerminal: import("svelte").Component<Props, {}, "">;
type LiveTerminal = ReturnType<typeof LiveTerminal>;
export default LiveTerminal;
