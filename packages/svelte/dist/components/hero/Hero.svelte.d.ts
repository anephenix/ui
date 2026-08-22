import type { Component, Snippet } from "svelte";
interface CTAItem {
    href: string;
    text: string;
    buttonClass?: string;
}
interface Props {
    title: string;
    description: string | Snippet;
    ctas: CTAItem[];
    Link?: Component<Record<string, unknown>>;
}
declare const Hero: Component<Props, {}, "">;
type Hero = ReturnType<typeof Hero>;
export default Hero;
