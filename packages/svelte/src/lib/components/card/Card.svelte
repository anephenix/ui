<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	image?: string;
	imageAlt?: string;
	title?: string;
	subtitle?: string;
	children: Snippet;
	footer?: Snippet;
	class?: string;
}

let {
	image,
	imageAlt = "",
	title,
	subtitle,
	children,
	footer,
	class: className,
}: Props = $props();

let classNames = $derived(`card${className ? ` ${className}` : ""}`);
</script>

<div class={classNames}>
	{#if image}
		<img class="card-image" src={image} alt={imageAlt} />
	{/if}
	{#if title || subtitle}
		<div class="card-header">
			{#if title}<h3 class="card-title">{title}</h3>{/if}
			{#if subtitle}<p class="card-subtitle">{subtitle}</p>{/if}
		</div>
	{/if}
	<div class="card-body">{@render children()}</div>
	{#if footer}
		<div class="card-footer">{@render footer()}</div>
	{/if}
</div>
