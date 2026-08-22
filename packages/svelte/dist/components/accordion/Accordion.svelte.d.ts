import type { Snippet } from "svelte";
interface AccordionItem {
    id: string;
    title: string | Snippet;
    content: string | Snippet;
}
interface Props {
    items: AccordionItem[];
    allowMultiple?: boolean;
    defaultOpen?: string | string[];
    onChange?: (openIds: string[]) => void;
    class?: string;
}
declare const Accordion: import("svelte").Component<Props, {}, "">;
type Accordion = ReturnType<typeof Accordion>;
export default Accordion;
