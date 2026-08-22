<script lang="ts">
interface Props {
	value?: number;
	max?: number;
	variant?: string;
	size?: string;
	label?: string;
	showValue?: boolean;
	indeterminate?: boolean;
	class?: string;
}

let {
	value = 0,
	max = 100,
	variant = "default",
	size = "md",
	label,
	showValue = false,
	indeterminate = false,
	class: className = "",
}: Props = $props();

let percentage = $derived(
	indeterminate ? null : Math.min(100, Math.max(0, (value / max) * 100)),
);
let roundedPercentage = $derived(
	percentage === null ? 0 : Math.round(percentage),
);
</script>

<div class="progress-bar-wrapper{className ? ` ${className}` : ''}">
	{#if label || (showValue && !indeterminate)}
		<div class="progress-bar-header">
			{#if label}
				<span class="progress-bar-label">{label}</span>
			{/if}
			{#if showValue && !indeterminate}
				<span class="progress-bar-value">{roundedPercentage}%</span>
			{/if}
		</div>
	{/if}
	<div
		class="progress-bar progress-bar-{size}"
		role="progressbar"
		aria-valuenow={indeterminate ? undefined : value}
		aria-valuemin={0}
		aria-valuemax={max}
		aria-label={label ?? "Progress"}
	>
		<div
			class="progress-bar-fill progress-bar-{variant}{indeterminate ? ' progress-bar-indeterminate' : ''}"
			style={indeterminate ? undefined : `width: ${percentage}%`}
		></div>
	</div>
</div>
