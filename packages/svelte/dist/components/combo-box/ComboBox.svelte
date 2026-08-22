<script lang="ts">
interface ComboBoxOption {
	label: string;
	value: string;
}

interface Props {
	options?: ComboBoxOption[];
	value?: string;
	onChange?: (value: string) => void;
	onSelect?: (option: ComboBoxOption) => void;
	placeholder?: string;
	disabled?: boolean;
}

let {
	options = [],
	value,
	onChange,
	onSelect,
	placeholder = "Search...",
	disabled = false,
}: Props = $props();

// svelte-ignore state_referenced_locally -- value only seeds the initial
// input text, matching React's useState(value ?? "").
let inputValue = $state(value ?? "");
let isOpen = $state(false);
let activeIndex = $state(-1);
let containerRef: HTMLDivElement;
const listboxId = $props.id();

let filtered = $derived(
	options.filter((opt) =>
		opt.label.toLowerCase().includes(inputValue.toLowerCase()),
	),
);

$effect(() => {
	function handleClickOutside(e: MouseEvent) {
		if (containerRef && !containerRef.contains(e.target as Node)) {
			isOpen = false;
			activeIndex = -1;
		}
	}
	document.addEventListener("mousedown", handleClickOutside);
	return () => document.removeEventListener("mousedown", handleClickOutside);
});

function handleInputChange(e: Event) {
	const val = (e.target as HTMLInputElement).value;
	inputValue = val;
	isOpen = true;
	activeIndex = -1;
	onChange?.(val);
}

function handleSelect(option: ComboBoxOption) {
	inputValue = option.label;
	isOpen = false;
	activeIndex = -1;
	onSelect?.(option);
}

function handleKeyDown(e: KeyboardEvent) {
	if (!isOpen) {
		if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			isOpen = true;
			activeIndex = 0;
			e.preventDefault();
		}
		return;
	}
	if (e.key === "ArrowDown") {
		activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
		e.preventDefault();
	} else if (e.key === "ArrowUp") {
		activeIndex = Math.max(activeIndex - 1, 0);
		e.preventDefault();
	} else if (e.key === "Enter" && activeIndex >= 0) {
		handleSelect(filtered[activeIndex]);
		e.preventDefault();
	} else if (e.key === "Escape") {
		isOpen = false;
		activeIndex = -1;
	}
}
</script>

<div class="combo-box" bind:this={containerRef}>
	<input
		type="text"
		class="combo-box-input"
		value={inputValue}
		oninput={handleInputChange}
		onfocus={() => (isOpen = true)}
		onkeydown={handleKeyDown}
		{placeholder}
		{disabled}
		role="combobox"
		aria-expanded={isOpen}
		aria-autocomplete="list"
		aria-controls={listboxId}
		aria-activedescendant={activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
	/>
	{#if isOpen}
		<div class="combo-box-listbox" role="listbox" id={listboxId}>
			{#if filtered.length > 0}
				{#each filtered as option, index (option.value)}
					<div
						id="{listboxId}-option-{index}"
						class="combo-box-option{activeIndex === index ? ' combo-box-option-active' : ''}"
						role="option"
						tabindex="-1"
						aria-selected={activeIndex === index}
						onmousedown={() => handleSelect(option)}
					>
						{option.label}
					</div>
				{/each}
			{:else}
				<div class="combo-box-no-results">No results found</div>
			{/if}
		</div>
	{/if}
</div>
