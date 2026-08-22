<script lang="ts">
interface Props {
	class?: string;
	defaultValue?: string;
	placeholder?: string;
	name?: string;
	oninput?: (event: Event) => void;
	ref?: HTMLTextAreaElement | null;
}

let {
	class: className,
	defaultValue,
	placeholder,
	name,
	oninput,
	ref = $bindable(null),
}: Props = $props();
</script>

<textarea
	bind:this={ref}
	{name}
	class={className}
	value={defaultValue}
	{oninput}
	{placeholder}
></textarea>
