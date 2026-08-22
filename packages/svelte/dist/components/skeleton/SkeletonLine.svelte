<script lang="ts">
function toCSS(value: string | number): string {
	return typeof value === "number" ? `${value}px` : value;
}

interface Props {
	width?: string | number;
	height?: string | number;
	borderRadius?: string;
}

let { width, height, borderRadius }: Props = $props();
</script>

<div
	class="skeleton"
	style="width: {toCSS(width ?? '100%')}; height: {toCSS(height ?? '1rem')}; border-radius: {borderRadius};"
	aria-hidden="true"
></div>
