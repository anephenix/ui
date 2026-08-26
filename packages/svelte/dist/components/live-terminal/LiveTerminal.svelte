<script lang="ts">
import "@anephenix/ui-tokens/components/terminal/Terminal.css";
import "@anephenix/ui-tokens/components/live-terminal/LiveTerminal.css";

const DEFAULT_HISTORY_SIZE = 100;
const MIN_WIDTH = 280;
const MIN_HEIGHT = 120;

function longestCommonPrefix(values: string[]): string {
	if (values.length === 0) return "";
	let prefix = values[0];
	for (let i = 1; i < values.length; i++) {
		while (!values[i].startsWith(prefix)) {
			prefix = prefix.slice(0, -1);
			if (prefix === "") return "";
		}
	}
	return prefix;
}

function caretLineColumn(value: string, pos: number) {
	const before = value.slice(0, pos);
	const beforeLines = before.split("\n");
	return {
		line: beforeLines.length - 1,
		column: beforeLines[beforeLines.length - 1].length,
	};
}

export type LiveTerminalLineType = "input" | "output" | "error";

export interface LiveTerminalLine {
	id?: string | number;
	type: LiveTerminalLineType;
	text: string;
}

interface Props {
	title?: string;
	prompt?: string;
	continuationPrompt?: string;
	lines?: LiveTerminalLine[];
	oncommand?: (command: string) => void;
	getSuggestions?: (input: string) => string[];
	disabled?: boolean;
	width?: number;
	height?: number;
	resizable?: boolean;
	expandable?: boolean;
	historySize?: number;
}

let {
	title,
	prompt = "$",
	continuationPrompt = ">",
	lines = [],
	oncommand,
	getSuggestions,
	disabled = false,
	width: initialWidth = 400,
	height: initialHeight = 300,
	resizable = true,
	expandable = true,
	historySize = DEFAULT_HISTORY_SIZE,
}: Props = $props();

let value = $state("");
let caretPos = $state(0);
let history: string[] = $state([]);
let historyIndex = $state(0);
let suggestions: string[] = $state([]);
let isFocused = $state(false);
// svelte-ignore state_referenced_locally -- initialWidth/initialHeight only
// seed the starting size, matching React's useState(initialWidth).
let width = $state(initialWidth);
// svelte-ignore state_referenced_locally
let height = $state(initialHeight);
let isFullscreen = $state(false);

let textareaEl: HTMLTextAreaElement | null = $state(null);
let mirrorEl: HTMLDivElement | null = $state(null);
let bodyEl: HTMLDivElement | null = $state(null);
let draft = "";
let resizeStart: {
	x: number;
	y: number;
	width: number;
	height: number;
} | null = null;

$effect(() => {
	lines;
	value;
	if (bodyEl) {
		bodyEl.scrollTop = bodyEl.scrollHeight;
	}
});

let valueLines = $derived(value.split("\n"));
let caretLoc = $derived(caretLineColumn(value, caretPos));
let cursorClassName = $derived(
	`live-terminal-cursor${isFocused && !disabled ? " is-blinking" : ""}${
		disabled ? " is-disabled" : ""
	}`,
);

function syncScrollPositions() {
	if (!textareaEl) return;
	if (mirrorEl) {
		mirrorEl.scrollLeft = textareaEl.scrollLeft;
		mirrorEl.scrollTop = textareaEl.scrollTop;
	}
}

function updateCaretPosition(target: HTMLTextAreaElement) {
	caretPos = target.selectionStart ?? target.value.length;
}

function applyValue(next: string) {
	value = next;
	caretPos = next.length;
}

function insertAtCaret(text: string) {
	const next = `${value.slice(0, caretPos)}${text}${value.slice(caretPos)}`;
	const caret = caretPos + text.length;
	value = next;
	caretPos = caret;
	suggestions = [];
}

function handleInput(event: Event) {
	const target = event.target as HTMLTextAreaElement;
	value = target.value;
	updateCaretPosition(target);
	suggestions = [];
	requestAnimationFrame(syncScrollPositions);
}

function handleSelect(event: Event) {
	updateCaretPosition(event.target as HTMLTextAreaElement);
	syncScrollPositions();
}

function handleScroll() {
	syncScrollPositions();
}

function submitCommand() {
	const command = value;
	if (command.trim() !== "") {
		oncommand?.(command);
		let nextHistory = history;
		if (history[history.length - 1] !== command) {
			nextHistory = [...history, command];
			if (nextHistory.length > historySize) {
				nextHistory = nextHistory.slice(nextHistory.length - historySize);
			}
			history = nextHistory;
		}
		historyIndex = nextHistory.length;
	} else {
		historyIndex = history.length;
	}
	draft = "";
	value = "";
	caretPos = 0;
	suggestions = [];
}

function navigateHistory(direction: -1 | 1) {
	if (history.length === 0) return;
	if (direction === -1) {
		if (historyIndex === 0) return;
		if (historyIndex === history.length) draft = value;
		const nextIndex = historyIndex - 1;
		historyIndex = nextIndex;
		applyValue(history[nextIndex]);
	} else {
		if (historyIndex >= history.length) return;
		const nextIndex = historyIndex + 1;
		historyIndex = nextIndex;
		applyValue(nextIndex === history.length ? draft : history[nextIndex]);
	}
	suggestions = [];
}

function handleTab() {
	if (!getSuggestions) return;
	const matches = getSuggestions(value);
	if (matches.length === 0) {
		suggestions = [];
		return;
	}
	if (matches.length === 1) {
		applyValue(matches[0]);
		suggestions = [];
		return;
	}
	const commonPrefix = longestCommonPrefix(matches);
	if (commonPrefix.length > value.length) applyValue(commonPrefix);
	suggestions = matches;
}

function handleKeyDown(event: KeyboardEvent) {
	switch (event.key) {
		case "Enter":
			event.preventDefault();
			if (event.shiftKey) {
				insertAtCaret("\n");
			} else {
				submitCommand();
			}
			break;
		case "ArrowUp": {
			const { line } = caretLineColumn(value, caretPos);
			if (line === 0) {
				event.preventDefault();
				navigateHistory(-1);
			}
			break;
		}
		case "ArrowDown": {
			const { line } = caretLineColumn(value, caretPos);
			if (line === value.split("\n").length - 1) {
				event.preventDefault();
				navigateHistory(1);
			}
			break;
		}
		case "Tab":
			event.preventDefault();
			handleTab();
			break;
		default:
			break;
	}
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

function focusInput() {
	if (disabled) return;
	const selection = window.getSelection();
	if (selection && selection.toString().length > 0) return;
	textareaEl?.focus();
}
</script>

<div
	class="terminal live-terminal{isFullscreen ? ' is-fullscreen' : ''}"
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
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events -- mouse-only
	     convenience for clicking surrounding padding — the real input
	     inside is already independently focusable and labelled, so
	     keyboard/AT users reach it directly via Tab without this div. -->
	<!-- svelte-ignore a11y_no_static_element_interactions -- see above. -->
	<div
		class="live-terminal-body{disabled ? ' is-disabled' : ''}"
		style={isFullscreen ? undefined : `height: ${height}px`}
		bind:this={bodyEl}
		onclick={focusInput}
	>
		{#each lines as line, index (line.id ?? index)}
			{#if line.type !== "input"}
				<div class="live-terminal-line{line.type === 'error' ? ' live-terminal-line-error' : ''}">
					<span>{line.text}</span>
				</div>
			{:else}
				{#each line.text.split("\n") as subLine, subIndex (subIndex)}
					<div class="live-terminal-line">
						<span class="live-terminal-prompt">
							{subIndex === 0 ? prompt : continuationPrompt}
						</span>
						<span>{subLine}</span>
					</div>
				{/each}
			{/if}
		{/each}
		<div class="live-terminal-current">
			<div class="live-terminal-prompt-gutter" aria-hidden="true">
				{#each valueLines as _, i (i)}
					<span class="live-terminal-prompt">{i === 0 ? prompt : continuationPrompt}</span>
				{/each}
			</div>
			<div class="live-terminal-input-surface">
				<div class="live-terminal-mirror" bind:this={mirrorEl} aria-hidden="true">
					{#each valueLines as lineText, i (i)}
						<div class="live-terminal-mirror-row">
							{#if i === caretLoc.line}{lineText.slice(0, caretLoc.column)}<span
									class={cursorClassName}
								></span>{lineText.slice(caretLoc.column)}{:else}{lineText || " "}{/if}
						</div>
					{/each}
				</div>
				<textarea
					bind:this={textareaEl}
					class="live-terminal-real-input"
					value={value}
					oninput={handleInput}
					onscroll={handleScroll}
					onkeydown={handleKeyDown}
					onkeyup={handleSelect}
					onclick={handleSelect}
					onselect={handleSelect}
					onfocus={() => (isFocused = true)}
					onblur={() => (isFocused = false)}
					{disabled}
					spellcheck="false"
					autocapitalize="off"
					autocorrect="off"
					aria-label={title ? `${title} terminal input` : "Terminal input"}
				></textarea>
			</div>
		</div>
		{#if suggestions.length > 1}
			<div class="live-terminal-suggestions">{suggestions.join("  ")}</div>
		{/if}
	</div>
	<div class="live-terminal-footer">
		{#if resizable && !isFullscreen}
			<button
				type="button"
				class="live-terminal-resize-handle"
				onmousedown={handleResizeStart}
				aria-label="Resize terminal"
			></button>
		{/if}
	</div>
</div>
