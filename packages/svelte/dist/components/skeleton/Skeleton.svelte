<script lang="ts">
import SkeletonLine from "./SkeletonLine.svelte";

function toCSS(value: string | number): string {
	return typeof value === "number" ? `${value}px` : value;
}

interface Props {
	width?: string | number;
	height?: string | number;
	borderRadius?: string;
	lines?: number;
	class?: string;
}

let {
	width = "100%",
	height = "1rem",
	borderRadius = "4px",
	lines = 1,
	class: className,
}: Props = $props();

let lineItems = $derived(
	Array.from({ length: lines }, (_, i) => ({
		id: `line-${i}`,
		isLast: i === lines - 1,
	})),
);
</script>

{#if lines === 1}
	<div
		class="skeleton{className ? ` ${className}` : ''}"
		style="width: {toCSS(width)}; height: {toCSS(height)}; border-radius: {borderRadius};"
		aria-hidden="true"
	></div>
{:else}
	<div class="skeleton-group{className ? ` ${className}` : ''}">
		{#each lineItems as { id, isLast } (id)}
			<SkeletonLine width={isLast ? "70%" : width} {height} {borderRadius} />
		{/each}
	</div>
{/if}
