<script lang="ts">
interface Props {
	class?: string;
	defaultValue?: string;
	placeholder?: string;
	name?: string;
	onchange?: (event: Event) => void;
	ref?: HTMLTextAreaElement | null;
}

let {
	class: className,
	defaultValue,
	placeholder,
	name,
	onchange,
	ref = $bindable(null),
}: Props = $props();
</script>

<textarea
	bind:this={ref}
	{name}
	class={className}
	value={defaultValue}
	{onchange}
	{placeholder}
></textarea>
