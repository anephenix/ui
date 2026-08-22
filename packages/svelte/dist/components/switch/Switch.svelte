<script lang="ts">
interface Props {
	name?: string;
	label?: string;
	class?: string;
	checked?: boolean;
	onchange?: (event: Event) => void;
	disabled?: boolean;
	ref?: HTMLInputElement | null;
}

let {
	name,
	label,
	class: className,
	checked = $bindable(false),
	onchange,
	disabled,
	ref = $bindable(null),
}: Props = $props();

function handleChange(e: Event) {
	checked = (e.target as HTMLInputElement).checked;
	onchange?.(e);
}

let labelClass = $derived(
	`switch${disabled ? " switch-disabled" : ""}${className ? ` ${className}` : ""}`,
);
</script>

<label class={labelClass}>
	<input
		type="checkbox"
		role="switch"
		aria-checked={checked}
		{name}
		bind:this={ref}
		{checked}
		onchange={handleChange}
		{disabled}
	/>
	<div class="switch-track">
		<div class="switch-thumb"></div>
	</div>
	{#if label}
		<span class="switch-label">{label}</span>
	{/if}
</label>
