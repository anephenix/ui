<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	leftSection?: Snippet;
	rightSection?: Snippet;
}

let { leftSection, rightSection }: Props = $props();
</script>

<div id="footer">
	<div class="container">
		<div class="withSidePadding">
			{#if leftSection}{@render leftSection()}{/if}
			{#if rightSection}{@render rightSection()}{/if}
		</div>
	</div>
</div>
