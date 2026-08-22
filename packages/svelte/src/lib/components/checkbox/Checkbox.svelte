<script lang="ts">
interface Props {
	label?: string;
	class?: string;
	name?: string;
	defaultValue?: boolean;
	ref?: HTMLInputElement | null;
}

let {
	label,
	class: className,
	name,
	defaultValue,
	ref = $bindable(null),
}: Props = $props();

let classNames = $derived(`checkbox ${className}`);
</script>

<label class={classNames}>
	<input type="checkbox" {name} bind:this={ref} checked={defaultValue} />
	<div class="checkbox-element">
		<div class="tick"></div>
	</div>
	<span>{label}</span>
</label>
