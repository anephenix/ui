<script lang="ts">
import type { Snippet } from "svelte";

type AlertVariant = "info" | "success" | "error" | "warning";

const variantIcons: Record<AlertVariant, string> = {
	success: "✓",
	error: "✕",
	warning: "⚠",
	info: "ℹ",
};

interface Props {
	variant?: AlertVariant;
	title?: string;
	children: Snippet;
	onclose?: () => void;
	class?: string;
}

let {
	variant = "info",
	title,
	children,
	onclose,
	class: className,
}: Props = $props();

let role = $derived(
	variant === "error" || variant === "warning" ? "alert" : "status",
);
let classNames = $derived(
	`alert alert-${variant}${className ? ` ${className}` : ""}`,
);
</script>

<div class={classNames} {role}>
	<div class="alert-icon">{variantIcons[variant]}</div>
	<div class="alert-content">
		{#if title}
			<div class="alert-title">{title}</div>
		{/if}
		<div class="alert-body">{@render children()}</div>
	</div>
	{#if onclose}
		<button type="button" class="alert-close" onclick={onclose} aria-label="Dismiss">
			&times;
		</button>
	{/if}
</div>
