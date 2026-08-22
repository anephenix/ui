<script lang="ts">
interface Props {
	type?: string;
	class?: string;
	defaultValue?: string;
	placeholder?: string;
	name?: string;
	oninput?: (event: Event) => void;
	ref?: HTMLInputElement | null;
}

let {
	type = "text",
	class: className,
	defaultValue,
	placeholder,
	name,
	oninput,
	ref = $bindable(null),
}: Props = $props();
</script>

<input
	bind:this={ref}
	{name}
	{type}
	class={className}
	value={defaultValue}
	{oninput}
	{placeholder}
/>
