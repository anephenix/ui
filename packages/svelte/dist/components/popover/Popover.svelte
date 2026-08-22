<script lang="ts">
import type { Snippet } from "svelte";

interface TriggerProps {
	onclick: (e: MouseEvent) => void;
	"aria-expanded": boolean;
	"aria-haspopup": "dialog";
}

interface Props {
	trigger: Snippet<[TriggerProps]>;
	content: string | Snippet;
	title?: string;
	position?: string;
	class?: string;
}

let {
	trigger,
	content,
	title,
	position = "bottom",
	class: className,
}: Props = $props();

let isOpen = $state(false);
let containerRef: HTMLDivElement;

function toggle() {
	isOpen = !isOpen;
}

$effect(() => {
	if (!isOpen) return;
	function handleOutsideClick(e: MouseEvent) {
		if (!containerRef?.contains(e.target as Node)) {
			isOpen = false;
		}
	}
	document.addEventListener("mousedown", handleOutsideClick);
	return () => document.removeEventListener("mousedown", handleOutsideClick);
});

$effect(() => {
	if (!isOpen) return;
	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Escape") isOpen = false;
	}
	document.addEventListener("keydown", handleKeyDown);
	return () => document.removeEventListener("keydown", handleKeyDown);
});

let popoverClass = $derived(
	`popover popover-${position}${className ? ` ${className}` : ""}`,
);

let triggerProps = $derived({
	onclick: toggle,
	"aria-expanded": isOpen,
	"aria-haspopup": "dialog" as const,
});
</script>

<div bind:this={containerRef} class="popover-wrapper">
	{@render trigger(triggerProps)}
	{#if isOpen}
		<dialog open class={popoverClass} aria-label={title ?? "Popover"} aria-modal="false">
			<div class="popover-header">
				{#if title}
					<div class="popover-title">{title}</div>
				{/if}
				<button
					type="button"
					class="popover-close"
					onclick={() => (isOpen = false)}
					aria-label="Close"
				>
					&times;
				</button>
			</div>
			<div class="popover-body">
				{#if typeof content === "string"}
					{content}
				{:else}
					{@render content()}
				{/if}
			</div>
		</dialog>
	{/if}
</div>
