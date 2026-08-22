import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-css.js";
interface Props {
    title?: string;
    code: string;
    language?: string;
}
declare const Code: import("svelte").Component<Props, {}, "">;
type Code = ReturnType<typeof Code>;
export default Code;
