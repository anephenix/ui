<script lang="ts">
interface DropdownOption {
	value: string;
	text: string;
}

interface Props {
	options: DropdownOption[];
	multiple?: boolean;
	id?: string;
	class?: string;
	name?: string;
	defaultValue?: string | string[];
	ref?: HTMLSelectElement | null;
}

let {
	options,
	multiple,
	id,
	class: className,
	name,
	defaultValue,
	ref = $bindable(null),
}: Props = $props();

let classNames = $derived(`dropdown ${className}`);
</script>

<div class={classNames}>
	<select {name} {multiple} {id} bind:this={ref} value={defaultValue}>
		{#each options as { value, text } (value)}
			<option {value}>{text}</option>
		{/each}
	</select>
</div>
