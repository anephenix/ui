import type { Component, Snippet } from "svelte";
interface LinkItem {
    id?: string;
    hideOnDesktop?: boolean;
    hideOptions: (opts: {
        loggedIn?: boolean;
    }) => boolean;
    [key: string]: unknown;
}
interface Props {
    logo?: Snippet;
    links: LinkItem[];
    Link: Component<Record<string, unknown>>;
    loggedIn?: boolean;
    class?: string;
    midSection?: Snippet;
}
declare const NavBar: Component<Props, {}, "">;
type NavBar = ReturnType<typeof NavBar>;
export default NavBar;
