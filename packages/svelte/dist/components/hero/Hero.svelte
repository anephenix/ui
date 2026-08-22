<script lang="ts">
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

let { title, description, ctas, Link }: Props = $props();
</script>

<div id="hero">
	<div id="heading-and-lead">
		<h1>{title}</h1>
		{#if typeof description === "string"}
			<p>{description}</p>
		{:else}
			{@render description()}
		{/if}
	</div>
	<div id="hero-ctas">
		{#each ctas as { href, text, buttonClass } (href)}
			{#if Link}
				<Link {href} class="button theme-default {buttonClass}">{text}</Link>
			{:else}
				<a {href} class="button theme-default {buttonClass}">{text}</a>
			{/if}
		{/each}
	</div>
</div>
