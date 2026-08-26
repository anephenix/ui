import "@anephenix/ui-tokens/components/terminal/Terminal.css";
import "@anephenix/ui-tokens/components/live-terminal/LiveTerminal.css";
import { useEffect, useRef, useState } from "react";

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

interface LiveTerminalProps {
	title?: string;
	prompt?: string;
	continuationPrompt?: string;
	lines?: LiveTerminalLine[];
	onCommand?: (command: string) => void;
	getSuggestions?: (input: string) => string[];
	disabled?: boolean;
	width?: number;
	height?: number;
	resizable?: boolean;
	expandable?: boolean;
	historySize?: number;
}

const LiveTerminal = ({
	title,
	prompt = "$",
	continuationPrompt = ">",
	lines = [],
	onCommand,
	getSuggestions,
	disabled = false,
	width: initialWidth = 400,
	height: initialHeight = 300,
	resizable = true,
	expandable = true,
	historySize = DEFAULT_HISTORY_SIZE,
}: LiveTerminalProps) => {
	const [value, setValue] = useState("");
	const [caretPos, setCaretPos] = useState(0);
	const [history, setHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(0);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [isFocused, setIsFocused] = useState(false);
	const [width, setWidth] = useState(initialWidth);
	const [height, setHeight] = useState(initialHeight);
	const [isFullscreen, setIsFullscreen] = useState(false);

	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const mirrorRef = useRef<HTMLDivElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);
	const draftRef = useRef("");
	const resizeStart = useRef<{
		x: number;
		y: number;
		width: number;
		height: number;
	} | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: lines/value are trigger-only dependencies — scroll to the bottom whenever the transcript or the in-progress draft changes, without reading their value.
	useEffect(() => {
		if (bodyRef.current) {
			bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
		}
	}, [lines, value]);

	const syncScrollPositions = () => {
		const textarea = textareaRef.current;
		if (!textarea) return;
		if (mirrorRef.current) {
			mirrorRef.current.scrollLeft = textarea.scrollLeft;
			mirrorRef.current.scrollTop = textarea.scrollTop;
		}
	};

	const updateCaretPosition = (target: HTMLTextAreaElement) => {
		setCaretPos(target.selectionStart ?? target.value.length);
	};

	const applyValue = (next: string) => {
		setValue(next);
		setCaretPos(next.length);
	};

	const insertAtCaret = (text: string) => {
		const next = `${value.slice(0, caretPos)}${text}${value.slice(caretPos)}`;
		const caret = caretPos + text.length;
		setValue(next);
		setCaretPos(caret);
		setSuggestions([]);
	};

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(event.target.value);
		updateCaretPosition(event.target);
		setSuggestions([]);
		requestAnimationFrame(syncScrollPositions);
	};

	const handleSelect = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
		updateCaretPosition(event.currentTarget);
		syncScrollPositions();
	};

	const handleScroll = () => {
		syncScrollPositions();
	};

	const submitCommand = () => {
		const command = value;
		if (command.trim() !== "") {
			onCommand?.(command);
			let nextHistory = history;
			if (history[history.length - 1] !== command) {
				nextHistory = [...history, command];
				if (nextHistory.length > historySize) {
					nextHistory = nextHistory.slice(nextHistory.length - historySize);
				}
				setHistory(nextHistory);
			}
			setHistoryIndex(nextHistory.length);
		} else {
			setHistoryIndex(history.length);
		}
		draftRef.current = "";
		setValue("");
		setCaretPos(0);
		setSuggestions([]);
	};

	const navigateHistory = (direction: -1 | 1) => {
		if (history.length === 0) return;
		if (direction === -1) {
			if (historyIndex === 0) return;
			if (historyIndex === history.length) draftRef.current = value;
			const nextIndex = historyIndex - 1;
			setHistoryIndex(nextIndex);
			applyValue(history[nextIndex]);
		} else {
			if (historyIndex >= history.length) return;
			const nextIndex = historyIndex + 1;
			setHistoryIndex(nextIndex);
			applyValue(
				nextIndex === history.length ? draftRef.current : history[nextIndex],
			);
		}
		setSuggestions([]);
	};

	const handleTab = () => {
		if (!getSuggestions) return;
		const matches = getSuggestions(value);
		if (matches.length === 0) {
			setSuggestions([]);
			return;
		}
		if (matches.length === 1) {
			applyValue(matches[0]);
			setSuggestions([]);
			return;
		}
		const commonPrefix = longestCommonPrefix(matches);
		if (commonPrefix.length > value.length) applyValue(commonPrefix);
		setSuggestions(matches);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
	};

	const toggleFullscreen = () => {
		if (!expandable) return;
		setIsFullscreen((v) => !v);
	};

	useEffect(() => {
		if (!isFullscreen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsFullscreen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [isFullscreen]);

	const handleResizeStart = (event: React.MouseEvent) => {
		if (!resizable || isFullscreen) return;
		event.preventDefault();
		resizeStart.current = { x: event.clientX, y: event.clientY, width, height };

		const onMouseMove = (moveEvent: MouseEvent) => {
			if (!resizeStart.current) return;
			const deltaX = moveEvent.clientX - resizeStart.current.x;
			const deltaY = moveEvent.clientY - resizeStart.current.y;
			setWidth(Math.max(MIN_WIDTH, resizeStart.current.width + deltaX));
			setHeight(Math.max(MIN_HEIGHT, resizeStart.current.height + deltaY));
		};

		const onMouseUp = () => {
			resizeStart.current = null;
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	};

	const focusInput = () => {
		if (disabled) return;
		const selection = window.getSelection();
		if (selection && selection.toString().length > 0) return;
		textareaRef.current?.focus();
	};

	const valueLines = value.split("\n");
	const { line: caretLine, column: caretColumn } = caretLineColumn(
		value,
		caretPos,
	);
	const cursorClassName = `live-terminal-cursor${
		isFocused && !disabled ? " is-blinking" : ""
	}${disabled ? " is-disabled" : ""}`;

	const renderTranscriptLine = (line: LiveTerminalLine, index: number) => {
		const key = line.id ?? index;
		if (line.type !== "input") {
			return (
				<div
					key={key}
					className={`live-terminal-line${
						line.type === "error" ? " live-terminal-line-error" : ""
					}`}
				>
					<span>{line.text}</span>
				</div>
			);
		}
		return line.text.split("\n").map((subLine, subIndex) => (
			// biome-ignore lint/suspicious/noArrayIndexKey: subLines are re-split from the same immutable line.text on every render, in the same order every time — never reordered/filtered/prepended.
			<div key={`${key}-${subIndex}`} className="live-terminal-line">
				<span className="live-terminal-prompt">
					{subIndex === 0 ? prompt : continuationPrompt}
				</span>
				<span>{subLine}</span>
			</div>
		));
	};

	return (
		<div
			className={`terminal live-terminal${isFullscreen ? " is-fullscreen" : ""}`}
			style={isFullscreen ? undefined : { width }}
		>
			<div id="title-bar">
				<div id="title-bar-buttons">
					<div className="title-bar-button" id="close" />
					<div className="title-bar-button" id="minimize" />
					<button
						type="button"
						className="title-bar-button title-bar-button-action"
						id="maximize"
						aria-label={
							isFullscreen ? "Exit fullscreen" : "Expand to fullscreen"
						}
						aria-pressed={isFullscreen}
						onClick={toggleFullscreen}
					/>
				</div>
				<div id="title-bar-title">{title}</div>
			</div>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: mouse-only
			 * convenience for clicking surrounding padding — the real input
			 * inside is already independently focusable and labelled, so
			 * keyboard/AT users reach it directly via Tab without this div. */}
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: see above. */}
			<div
				className={`live-terminal-body${disabled ? " is-disabled" : ""}`}
				style={{ height: isFullscreen ? undefined : height }}
				ref={bodyRef}
				onClick={focusInput}
			>
				{lines.map((line, index) => renderTranscriptLine(line, index))}
				<div className="live-terminal-current">
					<div className="live-terminal-prompt-gutter" aria-hidden="true">
						{valueLines.map((_, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: lines are positional and never reordered.
							<span key={i} className="live-terminal-prompt">
								{i === 0 ? prompt : continuationPrompt}
							</span>
						))}
					</div>
					<div className="live-terminal-input-surface">
						<div
							className="live-terminal-mirror"
							ref={mirrorRef}
							aria-hidden="true"
						>
							{valueLines.map((lineText, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: lines are positional and never reordered.
								<div key={i} className="live-terminal-mirror-row">
									{i === caretLine ? (
										<>
											{lineText.slice(0, caretColumn)}
											<span className={cursorClassName} />
											{lineText.slice(caretColumn)}
										</>
									) : (
										lineText || " "
									)}
								</div>
							))}
						</div>
						<textarea
							ref={textareaRef}
							className="live-terminal-real-input"
							value={value}
							onChange={handleChange}
							onScroll={handleScroll}
							onKeyDown={handleKeyDown}
							onKeyUp={handleSelect}
							onClick={handleSelect}
							onSelect={handleSelect}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							disabled={disabled}
							spellCheck={false}
							autoCapitalize="off"
							autoCorrect="off"
							aria-label={title ? `${title} terminal input` : "Terminal input"}
						/>
					</div>
				</div>
				{suggestions.length > 1 && (
					<div className="live-terminal-suggestions">
						{suggestions.join("  ")}
					</div>
				)}
			</div>
			<div className="live-terminal-footer">
				{resizable && !isFullscreen && (
					<button
						type="button"
						className="live-terminal-resize-handle"
						onMouseDown={handleResizeStart}
						aria-label="Resize terminal"
					/>
				)}
			</div>
		</div>
	);
};

export default LiveTerminal;
