<script lang="ts">
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

let {
	text,
	id,
	class: className,
	url,
	target,
	rel,
	onclick,
	isMobile,
	toggleMenu,
	Link,
}: Props = $props();

let isExternal = $derived(
	!!url && (url.startsWith("http") || url.startsWith("mailto")),
);
let linkClickHandler = $derived(isMobile ? toggleMenu : undefined);
</script>

<li>
	{#if url && !onclick}
		{#if isExternal}
			<a {id} href={url} class={className} {target} {rel} onclick={linkClickHandler}>
				{text}
			</a>
		{:else if Link}
			<Link {id} href={url} class={className} {target} {rel} onclick={linkClickHandler}>
				{text}
			</Link>
		{/if}
	{:else}
		<button type="button" {id} class={className} {onclick}>
			{text}
		</button>
	{/if}
</li>
