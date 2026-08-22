<script lang="ts">
import copy from "clipboard-copy";
import Prism from "prismjs";
// Only the languages actually used in this codebase are registered.
// Add another `import "prismjs/components/prism-x.js";` line here to
// support a new language — each file pulls in its own dependency
// chain (e.g. jsx registers markup, clike, and javascript too).
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-css.js";

interface Props {
	title?: string;
	code: string;
	language?: string;
}

let { title, code, language = "javascript" }: Props = $props();

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

let lineNumbers = $derived(
	Array.from({ length: code.split("\n").length }, (_, i) => i + 1),
);

// Prism.highlight() HTML-escapes the source text itself before wrapping
// tokens in spans, so {@html} below is the standard, safe way to render
// its output — same as any vanilla Prism.js usage. The escapeHtml()
// fallback keeps that same guarantee for a language with no registered
// grammar, where nothing tokenizes the text for us.
let highlighted = $derived.by(() => {
	const grammar = Prism.languages[language];
	return grammar ? Prism.highlight(code, grammar, language) : escapeHtml(code);
});
</script>

<div class="code">
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
	<div class="code-editor">
		<div class="code-line-numbers" aria-hidden="true">
			{#each lineNumbers as n (n)}
				<span class="code-line-number">{n}</span>
			{/each}
		</div>
		<pre class="language-{language}"><code class="language-{language}">{@html highlighted}</code></pre>
	</div>
</div>
