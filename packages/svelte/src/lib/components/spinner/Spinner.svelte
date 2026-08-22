<script lang="ts">
interface Props {
	size?: string;
	label?: string;
	class?: string;
}

let { size = "md", label = "Loading...", class: className }: Props = $props();

let classNames = $derived(
	`spinner spinner-${size}${className ? ` ${className}` : ""}`,
);
</script>

<div class={classNames} role="status" aria-label={label}></div>
