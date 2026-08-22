<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	children: Snippet;
	error?: string;
}

let { children, error }: Props = $props();

let errorClass = $derived(error ? "error" : null);
let classNames = $derived(`form-field ${errorClass}`);
</script>

<div class={classNames}>
	{@render children()}
	{#if error}
		<div class="error-message">{error}</div>
	{/if}
</div>
