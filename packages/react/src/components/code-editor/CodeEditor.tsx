import "@anephenix/ui-tokens/components/code/Code.css";
import "@anephenix/ui-tokens/components/code-editor/CodeEditor.css";
import copy from "clipboard-copy";
import { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const DEFAULT_LANGUAGES = ["javascript", "jsx", "css"];
const MIN_WIDTH = 280;
const MIN_HEIGHT = 120;
const TAB_INSERT = "  ";

interface TitleBarButtonsProps {
	isFullscreen: boolean;
	onToggleFullscreen: () => void;
}

const TitleBarButtons = ({
	isFullscreen,
	onToggleFullscreen,
}: TitleBarButtonsProps) => (
	<div id="title-bar-buttons">
		<div className="title-bar-button" id="close" />
		<div className="title-bar-button" id="minimize" />
		<button
			type="button"
			className="title-bar-button title-bar-button-action"
			id="maximize"
			aria-label={isFullscreen ? "Exit fullscreen" : "Expand to fullscreen"}
			aria-pressed={isFullscreen}
			onClick={onToggleFullscreen}
		/>
	</div>
);

interface CodeEditorProps {
	title?: string;
	code?: string;
	language?: string;
	languages?: string[];
	width?: number;
	height?: number;
	resizable?: boolean;
	expandable?: boolean;
	onChange?: (code: string) => void;
	onFinishedTyping?: (code: string) => void;
	finishedTypingDelay?: number;
}

const CodeEditor = ({
	title,
	code: initialCode = "",
	language: initialLanguage = "javascript",
	languages = DEFAULT_LANGUAGES,
	width: initialWidth = 600,
	height: initialHeight = 300,
	resizable = true,
	expandable = true,
	onChange,
	onFinishedTyping,
	finishedTypingDelay = 800,
}: CodeEditorProps) => {
	const [code, setCode] = useState(initialCode);
	const [language, setLanguage] = useState(initialLanguage);
	const [width, setWidth] = useState(initialWidth);
	const [height, setHeight] = useState(initialHeight);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [cursorLine, setCursorLine] = useState(1);
	const [cursorColumn, setCursorColumn] = useState(1);

	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const preWrapperRef = useRef<HTMLDivElement>(null);
	const lineNumbersRef = useRef<HTMLDivElement>(null);
	const finishedTypingTimer = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);
	const resizeStart = useRef<{
		x: number;
		y: number;
		width: number;
		height: number;
	} | null>(null);

	const lineNumbers = Array.from(
		{ length: code.split("\n").length },
		(_, i) => i + 1,
	);
	const languageOptions = languages.includes(language)
		? languages
		: [language, ...languages];

	const updateCursorPosition = (target: HTMLTextAreaElement) => {
		const upToCursor = target.value.slice(0, target.selectionStart ?? 0);
		const lines = upToCursor.split("\n");
		setCursorLine(lines.length);
		setCursorColumn(lines[lines.length - 1].length + 1);
	};

	const handleSelect = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
		updateCursorPosition(event.currentTarget);
	};

	const scheduleFinishedTyping = (value: string) => {
		if (!onFinishedTyping) return;
		if (finishedTypingTimer.current) clearTimeout(finishedTypingTimer.current);
		finishedTypingTimer.current = setTimeout(() => {
			onFinishedTyping(value);
		}, finishedTypingDelay);
	};

	useEffect(
		() => () => {
			if (finishedTypingTimer.current)
				clearTimeout(finishedTypingTimer.current);
		},
		[],
	);

	const syncScrollPositions = () => {
		const textarea = textareaRef.current;
		if (!textarea) return;
		const { scrollTop, scrollLeft } = textarea;
		if (preWrapperRef.current) {
			preWrapperRef.current.scrollTop = scrollTop;
			preWrapperRef.current.scrollLeft = scrollLeft;
		}
		if (lineNumbersRef.current) {
			lineNumbersRef.current.scrollTop = scrollTop;
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value;
		setCode(value);
		onChange?.(value);
		scheduleFinishedTyping(value);
		updateCursorPosition(event.target);
		// The browser may auto-scroll the textarea to reveal the caret on a
		// new line before the line-number column has re-rendered to match —
		// re-sync once the DOM has caught up, so the two never visibly drift.
		requestAnimationFrame(syncScrollPositions);
	};

	const handleBlur = () => {
		if (finishedTypingTimer.current) {
			clearTimeout(finishedTypingTimer.current);
			finishedTypingTimer.current = null;
		}
		onFinishedTyping?.(code);
	};

	const handleScroll = () => {
		syncScrollPositions();
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key !== "Tab") return;
		event.preventDefault();
		const textarea = event.currentTarget;
		const { selectionStart, selectionEnd, value } = textarea;
		const next = `${value.slice(0, selectionStart)}${TAB_INSERT}${value.slice(selectionEnd)}`;
		setCode(next);
		onChange?.(next);
		scheduleFinishedTyping(next);
		const caret = selectionStart + TAB_INSERT.length;
		requestAnimationFrame(() => {
			textarea.selectionStart = textarea.selectionEnd = caret;
			updateCursorPosition(textarea);
			syncScrollPositions();
		});
	};

	const toggleFullscreen = () => {
		if (!expandable) return;
		setIsFullscreen((value) => !value);
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

	return (
		<div
			className={`code code-editor-window${isFullscreen ? " is-fullscreen" : ""}`}
			style={isFullscreen ? undefined : { width }}
		>
			<div id="title-bar">
				<TitleBarButtons
					isFullscreen={isFullscreen}
					onToggleFullscreen={toggleFullscreen}
				/>
				<div id="title-bar-title">{title}</div>
				<div id="title-bar-actions">
					<button
						type="button"
						className="title-bar-action"
						onClick={() => copy(code)}
					>
						Copy
					</button>
				</div>
			</div>
			<div
				className="code-editor code-editor-body"
				style={{
					height: isFullscreen ? undefined : height,
					alignItems: "stretch",
					overflowY: "auto",
				}}
			>
				<div
					className="code-line-numbers"
					ref={lineNumbersRef}
					style={{ overflow: "hidden" }}
					aria-hidden="true"
				>
					{lineNumbers.map((n) => (
						<span key={n} className="code-line-number">
							{n}
						</span>
					))}
				</div>
				<div className="code-editor-surface">
					<div
						className="code-editor-pre-wrapper"
						ref={preWrapperRef}
						aria-hidden="true"
					>
						<SyntaxHighlighter
							language={language}
							style={oneDark}
							customStyle={{
								background: "transparent",
								margin: 0,
								padding: 0,
								fontSize: "10pt",
								borderRadius: 0,
								overflow: "visible",
							}}
						>
							{code}
						</SyntaxHighlighter>
					</div>
					<textarea
						ref={textareaRef}
						className="code-editor-textarea"
						value={code}
						onChange={handleChange}
						onScroll={handleScroll}
						onKeyDown={handleKeyDown}
						onKeyUp={handleSelect}
						onClick={handleSelect}
						onSelect={handleSelect}
						onBlur={handleBlur}
						spellCheck={false}
						autoCapitalize="off"
						autoCorrect="off"
						aria-label={title ? `${title} code editor` : "Code editor"}
					/>
				</div>
			</div>
			<div className="code-editor-footer">
				<select
					className="code-editor-language-select"
					value={language}
					onChange={(event) => setLanguage(event.target.value)}
					aria-label="Language"
				>
					{languageOptions.map((lang) => (
						<option key={lang} value={lang}>
							{lang}
						</option>
					))}
				</select>
				<span className="code-editor-position">
					Ln {cursorLine}, Col {cursorColumn}
				</span>
				{resizable && !isFullscreen && (
					<button
						type="button"
						className="code-editor-resize-handle"
						onMouseDown={handleResizeStart}
						aria-label="Resize editor"
					/>
				)}
			</div>
		</div>
	);
};

export default CodeEditor;
