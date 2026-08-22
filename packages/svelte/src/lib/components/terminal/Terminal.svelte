<script lang="ts">
import copy from "clipboard-copy";

interface Props {
	title?: string;
	code: string;
}

let { title, code }: Props = $props();
</script>

<div class="terminal">
	<div id="title-bar">
		<div id="title-bar-buttons">
			<div class="title-bar-button" id="close"></div>
			<div class="title-bar-button" id="minimize"></div>
			<div class="title-bar-button" id="maximize"></div>
		</div>
		<div id="title-bar-title">{title}</div>
		<div id="title-bar-actions">
			<button type="button" class="title-bar-action" onclick={() => copy(code)}>
				Copy
			</button>
		</div>
	</div>
	<pre><code>{code}</code></pre>
</div>
