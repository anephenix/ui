<script lang="ts">
interface Props {
	class?: string;
	text?: string;
	name?: string;
	onclick?: (event: MouseEvent) => void;
	ref?: HTMLButtonElement | null;
}

let {
	class: className,
	text,
	name,
	onclick,
	ref = $bindable(null),
}: Props = $props();
</script>

<button type="button" {name} bind:this={ref} class={className} {onclick}>
	{text}
</button>
