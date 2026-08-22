<script lang="ts">
import type { Snippet } from "svelte";

let { children, ...rest }: { children?: Snippet } & Record<string, unknown> =
	$props();
</script>

<a {...rest}>{@render children?.()}</a>
