<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	children: Snippet;
	content: string | Snippet;
	position?: string;
	class?: string;
}

let { children, content, position = "top", class: className }: Props = $props();

let tooltipClass = $derived(
	`tooltip tooltip-${position}${className ? ` ${className}` : ""}`,
);
</script>

<span class="tooltip-wrapper">
	{@render children()}
	<span role="tooltip" class={tooltipClass}>
		{#if typeof content === "string"}
			{content}
		{:else}
			{@render content()}
		{/if}
	</span>
</span>
