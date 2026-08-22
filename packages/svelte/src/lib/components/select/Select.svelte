<script lang="ts">
interface SelectOption {
	value: string;
	label: string;
}

interface Props {
	class?: string;
	defaultValue?: string;
	name?: string;
	onchange?: (event: Event) => void;
	options: SelectOption[];
	ref?: HTMLSelectElement | null;
}

let {
	class: className,
	defaultValue,
	name,
	onchange,
	options,
	ref = $bindable(null),
}: Props = $props();
</script>

<select bind:this={ref} {name} class="select {className}" value={defaultValue} {onchange}>
	{#each options as { value, label } (value)}
		<option {value}>{label}</option>
	{/each}
</select>
