<script lang="ts">
type ToastVariant = "info" | "success" | "error" | "warning";

const variantIcons: Record<ToastVariant, string> = {
	success: "✓",
	error: "✕",
	warning: "⚠",
	info: "ℹ",
};

interface Props {
	isVisible: boolean;
	title?: string;
	message?: string;
	variant?: ToastVariant;
	position?: string;
	onClose?: () => void;
	duration?: number;
}

let {
	isVisible,
	title,
	message,
	variant = "info",
	position = "top-right",
	onClose,
	duration = 4000,
}: Props = $props();

$effect(() => {
	if (!isVisible || !duration) return;
	const timer = setTimeout(() => onClose?.(), duration);
	return () => clearTimeout(timer);
});
</script>

{#if isVisible}
	<div class="toast toast-{variant} toast-{position}" role="alert" aria-live="polite">
		<div class="toast-icon">{variantIcons[variant]}</div>
		<div class="toast-content">
			{#if title}
				<div class="toast-title">{title}</div>
			{/if}
			<div class="toast-message">{message}</div>
		</div>
		<button type="button" class="toast-close" onclick={onClose} aria-label="Close">
			&times;
		</button>
	</div>
{/if}
