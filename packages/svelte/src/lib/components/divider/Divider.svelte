<script lang="ts">
interface Props {
	orientation?: "horizontal" | "vertical";
	variant?: string;
	label?: string;
	class?: string;
}

let {
	orientation = "horizontal",
	variant = "solid",
	label,
	class: className = "",
}: Props = $props();

let classNames = $derived(
	`divider divider-${orientation} divider-${variant}${className ? ` ${className}` : ""}`,
);
</script>

{#if orientation === "horizontal" && !label}
	<hr class={classNames} />
{:else}
	<div aria-hidden="true" class={classNames}>
		{#if label}
			<span class="divider-label">{label}</span>
		{/if}
	</div>
{/if}
