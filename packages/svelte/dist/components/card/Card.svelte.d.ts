import type { Snippet } from "svelte";
interface Props {
    image?: string;
    imageAlt?: string;
    title?: string;
    subtitle?: string;
    children: Snippet;
    footer?: Snippet;
    class?: string;
}
declare const Card: import("svelte").Component<Props, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;
