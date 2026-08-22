<script lang="ts">
interface Props {
	name?: string;
	label?: string;
	class?: string;
	defaultValue?: string;
	value?: string;
	onchange?: (event: Event) => void;
	checked?: boolean;
	ref?: HTMLInputElement | null;
}

let {
	name,
	label,
	class: className,
	defaultValue,
	value,
	onchange,
	checked,
	ref = $bindable(null),
}: Props = $props();

let classNames = $derived(`radio ${className}`);
let isControlled = $derived(checked !== undefined);
</script>

<label class={classNames}>
	<input
		type="radio"
		{name}
		bind:this={ref}
		value={isControlled ? value : defaultValue}
		{...isControlled ? { checked, onchange } : {}}
	/>
	<div class="radio-element">
		<div class="selected"></div>
	</div>
	<span>{label}</span>
</label>
