<script lang="ts">
import type { Snippet } from "svelte";
import Popover from "./Popover.svelte";

interface Props {
	content?: string | Snippet;
	title?: string;
	position?: string;
	class?: string;
}

let { content = "Body", title, position, class: className }: Props = $props();
</script>

{#snippet trigger(props: Record<string, unknown>)}
	<button type="button" {...props}>Open</button>
{/snippet}

<Popover {trigger} {content} {title} {position} class={className} />
