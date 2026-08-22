import type { Component } from "svelte";
interface Props {
    text?: string;
    id?: string;
    class?: string;
    url?: string;
    target?: string;
    rel?: string;
    onclick?: (event: MouseEvent) => void;
    isMobile?: boolean;
    toggleMenu?: () => void;
    Link?: Component<Record<string, unknown>>;
}
declare const MenuItem: Component<Props, {}, "">;
type MenuItem = ReturnType<typeof MenuItem>;
export default MenuItem;
