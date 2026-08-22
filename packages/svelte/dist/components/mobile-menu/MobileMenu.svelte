<script lang="ts">
import type { Component } from "svelte";
import CloseIcon from "../close-icon/CloseIcon.svelte";
import MenuItem from "../menu-item/MenuItem.svelte";

interface LinkItem {
	id?: string;
	hideOptions: (opts: { loggedIn?: boolean }) => boolean;
	[key: string]: unknown;
}

interface Props {
	menuOpen: boolean;
	toggleMenu: () => void;
	links: LinkItem[];
	loggedIn?: boolean;
	Link: Component<Record<string, unknown>>;
}

let { menuOpen, toggleMenu, links, loggedIn, Link }: Props = $props();

let visibleLinks = $derived(links.filter((x) => x.hideOptions({ loggedIn })));
</script>

<div id="mobile-menu" class={menuOpen ? "open" : "closed"}>
	<div id="mobile-menu-header">
		<button type="button" id="close-icon" onclick={toggleMenu}>
			<CloseIcon width="20px" />
		</button>
	</div>
	{#if menuOpen}
		<ul>
			{#each visibleLinks as link (link.id)}
				<MenuItem {...link} isMobile={true} {toggleMenu} {Link} />
			{/each}
		</ul>
	{/if}
</div>
