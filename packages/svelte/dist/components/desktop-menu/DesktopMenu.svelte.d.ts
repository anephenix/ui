import type { Component } from "svelte";
interface LinkItem {
    id?: string;
    hideOnDesktop?: boolean;
    hideOptions: (opts: {
        loggedIn?: boolean;
    }) => boolean;
    [key: string]: unknown;
}
interface Props {
    links: LinkItem[];
    loggedIn?: boolean;
    Link: Component<Record<string, unknown>>;
}
declare const DesktopMenu: Component<Props, {}, "">;
type DesktopMenu = ReturnType<typeof DesktopMenu>;
export default DesktopMenu;
