<script lang="ts">
import type { Component } from "svelte";
import MenuItem from "../menu-item/MenuItem.svelte";

interface LinkItem {
	id?: string;
	hideOnDesktop?: boolean;
	hideOptions: (opts: { loggedIn?: boolean }) => boolean;
	[key: string]: unknown;
}

interface Props {
	links: LinkItem[];
	loggedIn?: boolean;
	Link: Component<Record<string, unknown>>;
}

let { links, loggedIn, Link }: Props = $props();

let visibleLinks = $derived(
	links
		.filter((x) => !x.hideOnDesktop)
		.filter((x) => x.hideOptions({ loggedIn })),
);
</script>

<ul id="desktop-menu">
	{#each visibleLinks as link (link.id)}
		<MenuItem {...link} {Link} />
	{/each}
</ul>
