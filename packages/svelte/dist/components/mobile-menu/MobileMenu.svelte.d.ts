import type { Component } from "svelte";
interface LinkItem {
    id?: string;
    hideOptions: (opts: {
        loggedIn?: boolean;
    }) => boolean;
    [key: string]: unknown;
}
interface Props {
    menuOpen: boolean;
    toggleMenu: () => void;
    links: LinkItem[];
    loggedIn?: boolean;
    Link: Component<Record<string, unknown>>;
}
declare const MobileMenu: Component<Props, {}, "">;
type MobileMenu = ReturnType<typeof MobileMenu>;
export default MobileMenu;
