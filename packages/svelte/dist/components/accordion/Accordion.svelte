<script lang="ts">
import type { Snippet } from "svelte";

interface AccordionItem {
	id: string;
	title: string | Snippet;
	content: string | Snippet;
}

interface Props {
	items: AccordionItem[];
	allowMultiple?: boolean;
	defaultOpen?: string | string[];
	onChange?: (openIds: string[]) => void;
	class?: string;
}

let {
	items,
	allowMultiple = false,
	defaultOpen,
	onChange,
	class: className,
}: Props = $props();

// svelte-ignore state_referenced_locally -- defaultOpen only seeds the
// initial state, matching React's useState(initialOpen); it isn't meant
// to stay in sync with the prop after mount.
const initialOpen = defaultOpen
	? new Set(Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen])
	: new Set<string>();

let openItems = $state(initialOpen);

function toggle(id: string) {
	const next = new Set(openItems);
	if (next.has(id)) {
		next.delete(id);
	} else {
		if (!allowMultiple) next.clear();
		next.add(id);
	}
	openItems = next;
	onChange?.([...next]);
}

let wrapperClass = $derived(`accordion${className ? ` ${className}` : ""}`);
</script>

<div class={wrapperClass}>
	{#each items as { id, title, content } (id)}
		{@const isOpen = openItems.has(id)}
		<div class="accordion-item">
			<h3 class="accordion-heading">
				<button
					type="button"
					id="trigger-{id}"
					aria-expanded={isOpen}
					aria-controls="panel-{id}"
					class="accordion-trigger{isOpen ? ' accordion-trigger-open' : ''}"
					onclick={() => toggle(id)}
				>
					<span class="accordion-title">
						{#if typeof title === "string"}
							{title}
						{:else}
							{@render title()}
						{/if}
					</span>
					<span
						class="accordion-chevron{isOpen ? ' accordion-chevron-open' : ''}"
						aria-hidden="true"
					></span>
				</button>
			</h3>
			<section
				id="panel-{id}"
				aria-labelledby="trigger-{id}"
				class="accordion-panel{isOpen ? ' accordion-panel-open' : ''}"
			>
				<div class="accordion-panel-inner">
					{#if typeof content === "string"}
						{content}
					{:else}
						{@render content()}
					{/if}
				</div>
			</section>
		</div>
	{/each}
</div>
