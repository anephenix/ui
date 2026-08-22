<script lang="ts">
import type { Component, Snippet } from "svelte";
import DesktopMenu from "../desktop-menu/DesktopMenu.svelte";
import Hamburger from "../hamburger/Hamburger.svelte";
import MobileMenu from "../mobile-menu/MobileMenu.svelte";

interface LinkItem {
	id?: string;
	hideOnDesktop?: boolean;
	hideOptions: (opts: { loggedIn?: boolean }) => boolean;
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

let {
	logo,
	links,
	Link,
	loggedIn,
	class: className,
	midSection,
}: Props = $props();

let menuOpen = $state(false);

function toggleMenu() {
	menuOpen = !menuOpen;
}
</script>

<div id="nav-bar" class={className}>
	<div class="container">
		<div class="withSidePadding">
			{#if logo}{@render logo()}{/if}
			{#if midSection}
				{@render midSection()}
			{:else}
				<div></div>
			{/if}
			<Hamburger width="25px" onclick={toggleMenu} />
			<DesktopMenu {links} {loggedIn} {Link} />
		</div>
	</div>
</div>
<MobileMenu {menuOpen} {toggleMenu} {links} {loggedIn} {Link} />
