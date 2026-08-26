<script lang="ts">
import "@anephenix/ui-tokens/components/code/Code.css";
import "@anephenix/ui-tokens/components/code-editor/CodeEditor.css";
import copy from "clipboard-copy";
import Prism from "prismjs";
// Only the languages actually used in this codebase are registered.
// Add another `import "prismjs/components/prism-x.js";` line here to
// support a new language — each file pulls in its own dependency
// chain (e.g. jsx registers markup, clike, and javascript too).
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-css.js";

const DEFAULT_LANGUAGES = ["javascript", "jsx", "css"];
const MIN_WIDTH = 280;
const MIN_HEIGHT = 120;
const TAB_INSERT = "  ";

interface Props {
	title?: string;
	code?: string;
	language?: string;
	languages?: string[];
	width?: number;
	height?: number;
	resizable?: boolean;
	expandable?: boolean;
	onchange?: (code: string) => void;
	onfinishedtyping?: (code: string) => void;
	finishedTypingDelay?: number;
}

let {
	title,
	code = $bindable(""),
	language = $bindable("javascript"),
	languages = DEFAULT_LANGUAGES,
	width: initialWidth = 600,
	height: initialHeight = 300,
	resizable = true,
	expandable = true,
	onchange,
	onfinishedtyping,
	finishedTypingDelay = 800,
}: Props = $props();

// svelte-ignore state_referenced_locally -- initialWidth/initialHeight only
// seed the starting size, matching React's useState(initialWidth).
let width = $state(initialWidth);
// svelte-ignore state_referenced_locally
let height = $state(initialHeight);
let isFullscreen = $state(false);
let cursorLine = $state(1);
let cursorColumn = $state(1);

let textareaEl: HTMLTextAreaElement | null = $state(null);
let preWrapperEl: HTMLDivElement | null = $state(null);
let lineNumbersEl: HTMLDivElement | null = $state(null);
let finishedTypingTimer: ReturnType<typeof setTimeout> | null = null;
let resizeStart: {
	x: number;
	y: number;
	width: number;
	height: number;
} | null = null;

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

let lineNumbers = $derived(
	Array.from({ length: code.split("\n").length }, (_, i) => i + 1),
);

let languageOptions = $derived(
	languages.includes(language) ? languages : [language, ...languages],
);

let highlighted = $derived.by(() => {
	const grammar = Prism.languages[language];
	return grammar ? Prism.highlight(code, grammar, language) : escapeHtml(code);
});

function updateCursorPosition(target: HTMLTextAreaElement) {
	const upToCursor = target.value.slice(0, target.selectionStart ?? 0);
	const lines = upToCursor.split("\n");
	cursorLine = lines.length;
	cursorColumn = lines[lines.length - 1].length + 1;
}

function handleSelect(event: Event) {
	updateCursorPosition(event.target as HTMLTextAreaElement);
}

function scheduleFinishedTyping(value: string) {
	if (!onfinishedtyping) return;
	if (finishedTypingTimer) clearTimeout(finishedTypingTimer);
	finishedTypingTimer = setTimeout(() => {
		onfinishedtyping(value);
	}, finishedTypingDelay);
}

$effect(() => {
	return () => {
		if (finishedTypingTimer) clearTimeout(finishedTypingTimer);
	};
});

function syncScrollPositions() {
	if (!textareaEl) return;
	const { scrollTop, scrollLeft } = textareaEl;
	if (preWrapperEl) {
		preWrapperEl.scrollTop = scrollTop;
		preWrapperEl.scrollLeft = scrollLeft;
	}
	if (lineNumbersEl) {
		lineNumbersEl.scrollTop = scrollTop;
	}
}

function handleInput(event: Event) {
	const value = (event.target as HTMLTextAreaElement).value;
	code = value;
	onchange?.(value);
	scheduleFinishedTyping(value);
	updateCursorPosition(event.target as HTMLTextAreaElement);
	// The browser may auto-scroll the textarea to reveal the caret on a new
	// line before the line-number column has re-rendered to match — re-sync
	// once the DOM has caught up, so the two never visibly drift.
	requestAnimationFrame(syncScrollPositions);
}

function handleBlur() {
	if (finishedTypingTimer) {
		clearTimeout(finishedTypingTimer);
		finishedTypingTimer = null;
	}
	onfinishedtyping?.(code);
}

function handleScroll() {
	syncScrollPositions();
}

function handleKeyDown(event: KeyboardEvent) {
	if (event.key !== "Tab") return;
	event.preventDefault();
	const textarea = event.currentTarget as HTMLTextAreaElement;
	const { selectionStart, selectionEnd, value } = textarea;
	const next = `${value.slice(0, selectionStart)}${TAB_INSERT}${value.slice(selectionEnd)}`;
	code = next;
	onchange?.(next);
	scheduleFinishedTyping(next);
	const caret = selectionStart + TAB_INSERT.length;
	requestAnimationFrame(() => {
		textarea.selectionStart = textarea.selectionEnd = caret;
		updateCursorPosition(textarea);
		syncScrollPositions();
	});
}

function toggleFullscreen() {
	if (!expandable) return;
	isFullscreen = !isFullscreen;
}

$effect(() => {
	if (!isFullscreen) return;
	const previousOverflow = document.body.style.overflow;
	document.body.style.overflow = "hidden";
	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Escape") isFullscreen = false;
	};
	window.addEventListener("keydown", onKeyDown);
	return () => {
		document.body.style.overflow = previousOverflow;
		window.removeEventListener("keydown", onKeyDown);
	};
});

function handleResizeStart(event: MouseEvent) {
	if (!resizable || isFullscreen) return;
	event.preventDefault();
	resizeStart = { x: event.clientX, y: event.clientY, width, height };

	const onMouseMove = (moveEvent: MouseEvent) => {
		if (!resizeStart) return;
		const deltaX = moveEvent.clientX - resizeStart.x;
		const deltaY = moveEvent.clientY - resizeStart.y;
		width = Math.max(MIN_WIDTH, resizeStart.width + deltaX);
		height = Math.max(MIN_HEIGHT, resizeStart.height + deltaY);
	};

	const onMouseUp = () => {
		resizeStart = null;
		window.removeEventListener("mousemove", onMouseMove);
		window.removeEventListener("mouseup", onMouseUp);
	};

	window.addEventListener("mousemove", onMouseMove);
	window.addEventListener("mouseup", onMouseUp);
}
</script>

<div
	class="code code-editor-window{isFullscreen ? ' is-fullscreen' : ''}"
	style={isFullscreen ? undefined : `width: ${width}px`}
>
	<div id="title-bar">
		<div id="title-bar-buttons">
			<div class="title-bar-button" id="close"></div>
			<div class="title-bar-button" id="minimize"></div>
			<button
				type="button"
				class="title-bar-button title-bar-button-action"
				id="maximize"
				aria-label={isFullscreen ? "Exit fullscreen" : "Expand to fullscreen"}
				aria-pressed={isFullscreen}
				onclick={toggleFullscreen}
			></button>
		</div>
		<div id="title-bar-title">{title}</div>
		<div id="title-bar-actions">
			<button type="button" class="title-bar-action" onclick={() => copy(code)}>
				Copy
			</button>
		</div>
	</div>
	<div
		class="code-editor code-editor-body"
		style="align-items: stretch; overflow-y: auto;{isFullscreen ? '' : ` height: ${height}px;`}"
	>
		<div
			class="code-line-numbers"
			bind:this={lineNumbersEl}
			style="overflow: hidden;"
			aria-hidden="true"
		>
			{#each lineNumbers as n (n)}
				<span class="code-line-number">{n}</span>
			{/each}
		</div>
		<div class="code-editor-surface">
			<div class="code-editor-pre-wrapper" bind:this={preWrapperEl} aria-hidden="true">
				<pre
					class="language-{language}"
					style="padding: 0; margin: 0; overflow: visible;"
				><code class="language-{language}">{@html highlighted}</code></pre>
			</div>
			<textarea
				bind:this={textareaEl}
				class="code-editor-textarea"
				value={code}
				oninput={handleInput}
				onscroll={handleScroll}
				onkeydown={handleKeyDown}
				onkeyup={handleSelect}
				onclick={handleSelect}
				onselect={handleSelect}
				onblur={handleBlur}
				spellcheck="false"
				autocapitalize="off"
				autocorrect="off"
				aria-label={title ? `${title} code editor` : "Code editor"}
			></textarea>
		</div>
	</div>
	<div class="code-editor-footer">
		<select
			class="code-editor-language-select"
			bind:value={language}
			aria-label="Language"
		>
			{#each languageOptions as lang (lang)}
				<option value={lang}>{lang}</option>
			{/each}
		</select>
		<span class="code-editor-position">Ln {cursorLine}, Col {cursorColumn}</span>
		{#if resizable && !isFullscreen}
			<button
				type="button"
				class="code-editor-resize-handle"
				onmousedown={handleResizeStart}
				aria-label="Resize editor"
			></button>
		{/if}
	</div>
</div>
