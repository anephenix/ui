import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import copy from "clipboard-copy";
import CodeEditor from "./CodeEditor";

vi.mock("clipboard-copy");

describe("CodeEditor", () => {
	const code = "const a = 1;\nconst b = 2;";
	const title = "Sample Code";
	const language = "javascript";

	test("renders the CodeEditor with title and copy button", () => {
		render(<CodeEditor title={title} code={code} language={language} />);
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText("Copy")).toBeInTheDocument();
	});

	test("copies the current code to clipboard when Copy is clicked", () => {
		render(<CodeEditor title={title} code={code} language={language} />);
		fireEvent.click(screen.getByText("Copy"));
		expect(copy).toHaveBeenCalledWith(code);
	});

	test("renders an editable textarea seeded with the initial code", () => {
		render(<CodeEditor title={title} code={code} language={language} />);
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		expect(textarea.value).toBe(code);
	});

	test("typing updates the code and increments line numbers", () => {
		render(
			<CodeEditor title={title} code="const a = 1;" language={language} />,
		);
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.change(textarea, {
			target: { value: "const a = 1;\nconst b = 2;" },
		});
		expect(textarea.value).toBe("const a = 1;\nconst b = 2;");
		const { container } = render(
			<CodeEditor
				title={title}
				code={"const a = 1;\nconst b = 2;"}
				language={language}
			/>,
		);
		const lineNumbers = container.querySelectorAll(".code-line-number");
		expect(lineNumbers.length).toBe(2);
	});

	test("calls onChange on every keystroke", () => {
		const onChange = vi.fn();
		render(
			<CodeEditor
				title={title}
				code="const a = 1;"
				language={language}
				onChange={onChange}
			/>,
		);
		const textarea = screen.getByRole("textbox");
		fireEvent.change(textarea, { target: { value: "const a = 2;" } });
		expect(onChange).toHaveBeenCalledWith("const a = 2;");
	});

	test("calls onFinishedTyping after the debounce delay", () => {
		vi.useFakeTimers();
		const onFinishedTyping = vi.fn();
		render(
			<CodeEditor
				title={title}
				code="const a = 1;"
				language={language}
				onFinishedTyping={onFinishedTyping}
				finishedTypingDelay={300}
			/>,
		);
		const textarea = screen.getByRole("textbox");
		fireEvent.change(textarea, { target: { value: "const a = 2;" } });
		expect(onFinishedTyping).not.toHaveBeenCalled();
		vi.advanceTimersByTime(300);
		expect(onFinishedTyping).toHaveBeenCalledWith("const a = 2;");
		vi.useRealTimers();
	});

	test("calls onFinishedTyping immediately on blur, without a double call", () => {
		vi.useFakeTimers();
		const onFinishedTyping = vi.fn();
		render(
			<CodeEditor
				title={title}
				code="const a = 1;"
				language={language}
				onFinishedTyping={onFinishedTyping}
				finishedTypingDelay={300}
			/>,
		);
		const textarea = screen.getByRole("textbox");
		fireEvent.change(textarea, { target: { value: "const a = 2;" } });
		fireEvent.blur(textarea);
		expect(onFinishedTyping).toHaveBeenCalledTimes(1);
		vi.advanceTimersByTime(300);
		expect(onFinishedTyping).toHaveBeenCalledTimes(1);
		vi.useRealTimers();
	});

	test("toggles fullscreen when the maximize button is clicked", () => {
		const { container } = render(
			<CodeEditor title={title} code={code} language={language} />,
		);
		const maximize = container.querySelector("#maximize") as HTMLButtonElement;
		expect(container.querySelector(".code-editor-window")).not.toHaveClass(
			"is-fullscreen",
		);
		fireEvent.click(maximize);
		expect(container.querySelector(".code-editor-window")).toHaveClass(
			"is-fullscreen",
		);
		fireEvent.click(maximize);
		expect(container.querySelector(".code-editor-window")).not.toHaveClass(
			"is-fullscreen",
		);
	});

	test("does not toggle fullscreen when expandable is false", () => {
		const { container } = render(
			<CodeEditor
				title={title}
				code={code}
				language={language}
				expandable={false}
			/>,
		);
		const maximize = container.querySelector("#maximize") as HTMLButtonElement;
		fireEvent.click(maximize);
		expect(container.querySelector(".code-editor-window")).not.toHaveClass(
			"is-fullscreen",
		);
	});

	test("switches the highlighted language via the footer select", () => {
		const { container } = render(
			<CodeEditor title={title} code=".class { color: red; }" language="css" />,
		);
		const select = screen.getByLabelText("Language") as HTMLSelectElement;
		expect(select.value).toBe("css");
		fireEvent.change(select, { target: { value: "javascript" } });
		expect(select.value).toBe("javascript");
		expect(container.querySelector(".language-javascript")).toBeInTheDocument();
	});

	test("scrolling the textarea keeps the line numbers and highlighted code in sync", () => {
		const { container } = render(
			<CodeEditor title={title} code={code} language={language} />,
		);
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		const lineNumbers = container.querySelector(
			".code-line-numbers",
		) as HTMLDivElement;
		const preWrapper = container.querySelector(
			".code-editor-pre-wrapper",
		) as HTMLDivElement;
		textarea.scrollTop = 42;
		fireEvent.scroll(textarea);
		expect(lineNumbers.scrollTop).toBe(42);
		expect(preWrapper.scrollTop).toBe(42);
	});

	test("re-syncs the line numbers once the DOM catches up after a new line is typed", async () => {
		const { container } = render(
			<CodeEditor title={title} code={code} language={language} />,
		);
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		const lineNumbers = container.querySelector(
			".code-line-numbers",
		) as HTMLDivElement;
		// Simulate the browser having already auto-scrolled the textarea to
		// reveal the caret on the new line, without ever firing a "scroll"
		// event — the re-sync must come from the change handler itself.
		textarea.scrollTop = 999;
		fireEvent.change(textarea, {
			target: { value: `${code}\nconst c = 3;` },
		});
		expect(lineNumbers.scrollTop).toBe(0);
		await new Promise((resolve) => requestAnimationFrame(resolve));
		expect(lineNumbers.scrollTop).toBe(999);
	});

	test("shows Ln 1, Col 1 initially", () => {
		render(<CodeEditor title={title} code={code} language={language} />);
		expect(screen.getByText("Ln 1, Col 1")).toBeInTheDocument();
	});

	test("updates the line:column indicator as the cursor moves", () => {
		render(<CodeEditor title={title} code={code} language={language} />);
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		// "const a = 1;\n" is 13 characters, so offset 14 is column 2 of line 2.
		textarea.setSelectionRange(14, 14);
		fireEvent.select(textarea);
		expect(screen.getByText("Ln 2, Col 2")).toBeInTheDocument();
	});

	test("updates the line:column indicator after typing", () => {
		render(
			<CodeEditor title={title} code="const a = 1;" language={language} />,
		);
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.change(textarea, {
			target: { value: "const a = 1;\nx" },
		});
		expect(screen.getByText("Ln 2, Col 2")).toBeInTheDocument();
	});

	test("hides the resize handle when resizable is false", () => {
		const { container } = render(
			<CodeEditor
				title={title}
				code={code}
				language={language}
				resizable={false}
			/>,
		);
		expect(
			container.querySelector(".code-editor-resize-handle"),
		).not.toBeInTheDocument();
	});
});
