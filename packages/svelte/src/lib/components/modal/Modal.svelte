<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	isOpen: boolean;
	onClose?: () => void;
	title?: string;
	children: Snippet;
	footer?: Snippet;
}

let { isOpen, onClose, title, children, footer }: Props = $props();

let dialogRef: HTMLDialogElement;

$effect(() => {
	if (!dialogRef) return;
	if (isOpen) {
		if (!dialogRef.open) dialogRef.showModal();
	} else {
		if (dialogRef.open) dialogRef.close();
	}
});

$effect(() => {
	if (!dialogRef) return;
	function handleCancel() {
		onClose?.();
	}
	dialogRef.addEventListener("cancel", handleCancel);
	return () => dialogRef.removeEventListener("cancel", handleCancel);
});

function handleBackdropClick(e: MouseEvent) {
	if (e.target === dialogRef) onClose?.();
}
</script>

<dialog bind:this={dialogRef} class="modal" onclick={handleBackdropClick}>
	<div class="modal-content">
		<div class="modal-header">
			<h2 class="modal-title">{title}</h2>
			<button type="button" class="modal-close" onclick={onClose} aria-label="Close">
				&times;
			</button>
		</div>
		<div class="modal-body">{@render children()}</div>
		{#if footer}
			<div class="modal-footer">{@render footer()}</div>
		{/if}
	</div>
</dialog>
