<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	children: Snippet;
	variant?: string;
	size?: string;
	class?: string;
}

let {
	children,
	variant = "default",
	size = "md",
	class: className,
}: Props = $props();

let classNames = $derived(
	`badge badge-${variant} badge-${size}${className ? ` ${className}` : ""}`,
);
</script>

<span class={classNames}>{@render children()}</span>
