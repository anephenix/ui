<script lang="ts">
import type { Snippet } from "svelte";

interface Tab {
	id: string;
	label: string;
	content: string | Snippet;
}

interface Props {
	tabs: Tab[];
	defaultTab?: string;
	onChange?: (id: string) => void;
	class?: string;
}

let { tabs, defaultTab, onChange, class: className }: Props = $props();

// svelte-ignore state_referenced_locally -- defaultTab/tabs[0] only seed
// the initial active tab, matching React's useState(defaultTab ?? ...).
let activeTab = $state(defaultTab ?? tabs[0]?.id);
const tabRefs: Record<string, HTMLButtonElement | null> = {};

function handleSelect(id: string) {
	activeTab = id;
	onChange?.(id);
}

function handleKeyDown(e: KeyboardEvent, index: number) {
	let nextIndex: number | null = null;
	if (e.key === "ArrowRight") {
		nextIndex = (index + 1) % tabs.length;
	} else if (e.key === "ArrowLeft") {
		nextIndex = (index - 1 + tabs.length) % tabs.length;
	}
	if (nextIndex !== null) {
		e.preventDefault();
		const nextId = tabs[nextIndex].id;
		handleSelect(nextId);
		tabRefs[nextId]?.focus();
	}
}

let wrapperClass = $derived(`tabs${className ? ` ${className}` : ""}`);
</script>

<div class={wrapperClass}>
	<div role="tablist" class="tabs-list">
		{#each tabs as { id, label }, index (id)}
			<button
				bind:this={tabRefs[id]}
				id="tab-{id}"
				type="button"
				role="tab"
				aria-selected={activeTab === id}
				aria-controls="panel-{id}"
				class="tabs-tab{activeTab === id ? ' tabs-tab-active' : ''}"
				tabindex={activeTab === id ? 0 : -1}
				onclick={() => handleSelect(id)}
				onkeydown={(e) => handleKeyDown(e, index)}
			>
				{label}
			</button>
		{/each}
	</div>
	{#each tabs as { id, content } (id)}
		<div
			id="panel-{id}"
			role="tabpanel"
			aria-labelledby="tab-{id}"
			class="tabs-panel"
			hidden={activeTab !== id}
		>
			{#if typeof content === "string"}
				{content}
			{:else}
				{@render content()}
			{/if}
		</div>
	{/each}
</div>
