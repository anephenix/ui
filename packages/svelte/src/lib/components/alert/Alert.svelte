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
	onClose?: () => void;
	class?: string;
}

let {
	variant = "info",
	title,
	children,
	onClose,
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
	{#if onClose}
		<button type="button" class="alert-close" onclick={onClose} aria-label="Dismiss">
			&times;
		</button>
	{/if}
</div>
