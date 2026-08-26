import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import copy from "clipboard-copy";
import CodeEditor from "./CodeEditor.svelte";

vi.mock("clipboard-copy");

describe("CodeEditor", () => {
	const code = "const a = 1;\nconst b = 2;";
	const title = "Sample Code";
	const language = "javascript";

	test("renders the CodeEditor with title and copy button", () => {
		render(CodeEditor, { props: { title, code, language } });
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText("Copy")).toBeInTheDocument();
	});

	test("copies the current code to clipboard when Copy is clicked", () => {
		render(CodeEditor, { props: { title, code, language } });
		fireEvent.click(screen.getByText("Copy"));
		expect(copy).toHaveBeenCalledWith(code);
	});

	test("renders an editable textarea seeded with the initial code", () => {
		render(CodeEditor, { props: { title, code, language } });
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		expect(textarea.value).toBe(code);
	});

	test("renders the correct number of line numbers", () => {
		const { container } = render(CodeEditor, {
			props: { title, code, language },
		});
		const lineNumbers = container.querySelectorAll(".code-line-number");
		expect(lineNumbers.length).toBe(2);
	});

	test("calls onchange on every keystroke", async () => {
		const onchange = vi.fn();
		render(CodeEditor, {
			props: { title, code: "const a = 1;", language, onchange },
		});
		const textarea = screen.getByRole("textbox");
		await fireEvent.input(textarea, { target: { value: "const a = 2;" } });
		expect(onchange).toHaveBeenCalledWith("const a = 2;");
	});

	test("calls onfinishedtyping after the debounce delay", async () => {
		vi.useFakeTimers();
		const onfinishedtyping = vi.fn();
		render(CodeEditor, {
			props: {
				title,
				code: "const a = 1;",
				language,
				onfinishedtyping,
				finishedTypingDelay: 300,
			},
		});
		const textarea = screen.getByRole("textbox");
		await fireEvent.input(textarea, { target: { value: "const a = 2;" } });
		expect(onfinishedtyping).not.toHaveBeenCalled();
		vi.advanceTimersByTime(300);
		expect(onfinishedtyping).toHaveBeenCalledWith("const a = 2;");
		vi.useRealTimers();
	});

	test("calls onfinishedtyping immediately on blur, without a double call", async () => {
		vi.useFakeTimers();
		const onfinishedtyping = vi.fn();
		render(CodeEditor, {
			props: {
				title,
				code: "const a = 1;",
				language,
				onfinishedtyping,
				finishedTypingDelay: 300,
			},
		});
		const textarea = screen.getByRole("textbox");
		await fireEvent.input(textarea, { target: { value: "const a = 2;" } });
		await fireEvent.blur(textarea);
		expect(onfinishedtyping).toHaveBeenCalledTimes(1);
		vi.advanceTimersByTime(300);
		expect(onfinishedtyping).toHaveBeenCalledTimes(1);
		vi.useRealTimers();
	});

	test("scrolling the textarea keeps the line numbers and highlighted code in sync", async () => {
		const { container } = render(CodeEditor, {
			props: { title, code, language },
		});
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		const lineNumbers = container.querySelector(
			".code-line-numbers",
		) as HTMLDivElement;
		const preWrapper = container.querySelector(
			".code-editor-pre-wrapper",
		) as HTMLDivElement;
		textarea.scrollTop = 42;
		await fireEvent.scroll(textarea);
		expect(lineNumbers.scrollTop).toBe(42);
		expect(preWrapper.scrollTop).toBe(42);
	});

	test("re-syncs the line numbers once the DOM catches up after a new line is typed", async () => {
		const { container } = render(CodeEditor, {
			props: { title, code, language },
		});
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		const lineNumbers = container.querySelector(
			".code-line-numbers",
		) as HTMLDivElement;
		// Simulate the browser having already auto-scrolled the textarea to
		// reveal the caret on the new line, without ever firing a "scroll"
		// event — the re-sync must come from the input handler itself.
		textarea.scrollTop = 999;
		await fireEvent.input(textarea, {
			target: { value: `${code}\nconst c = 3;` },
		});
		expect(lineNumbers.scrollTop).toBe(0);
		await new Promise((resolve) => requestAnimationFrame(resolve));
		expect(lineNumbers.scrollTop).toBe(999);
	});

	test("toggles fullscreen when the maximize button is clicked", async () => {
		const { container } = render(CodeEditor, {
			props: { title, code, language },
		});
		const maximize = container.querySelector("#maximize") as HTMLButtonElement;
		expect(container.querySelector(".code-editor-window")).not.toHaveClass(
			"is-fullscreen",
		);
		await fireEvent.click(maximize);
		expect(container.querySelector(".code-editor-window")).toHaveClass(
			"is-fullscreen",
		);
		await fireEvent.click(maximize);
		expect(container.querySelector(".code-editor-window")).not.toHaveClass(
			"is-fullscreen",
		);
	});

	test("does not toggle fullscreen when expandable is false", async () => {
		const { container } = render(CodeEditor, {
			props: { title, code, language, expandable: false },
		});
		const maximize = container.querySelector("#maximize") as HTMLButtonElement;
		await fireEvent.click(maximize);
		expect(container.querySelector(".code-editor-window")).not.toHaveClass(
			"is-fullscreen",
		);
	});

	test("switches the highlighted language via the footer select", async () => {
		const { container } = render(CodeEditor, {
			props: { title, code: ".class { color: red; }", language: "css" },
		});
		const select = screen.getByLabelText("Language") as HTMLSelectElement;
		expect(select.value).toBe("css");
		await fireEvent.change(select, { target: { value: "javascript" } });
		expect(container.querySelector(".language-javascript")).toBeInTheDocument();
	});

	test("shows Ln 1, Col 1 initially", () => {
		render(CodeEditor, { props: { title, code, language } });
		expect(screen.getByText("Ln 1, Col 1")).toBeInTheDocument();
	});

	test("updates the line:column indicator as the cursor moves", async () => {
		render(CodeEditor, { props: { title, code, language } });
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		// "const a = 1;\n" is 13 characters, so offset 14 is column 2 of line 2.
		textarea.setSelectionRange(14, 14);
		await fireEvent.select(textarea);
		expect(screen.getByText("Ln 2, Col 2")).toBeInTheDocument();
	});

	test("updates the line:column indicator after typing", async () => {
		render(CodeEditor, {
			props: { title, code: "const a = 1;", language },
		});
		const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
		await fireEvent.input(textarea, {
			target: { value: "const a = 1;\nx" },
		});
		expect(screen.getByText("Ln 2, Col 2")).toBeInTheDocument();
	});

	test("hides the resize handle when resizable is false", () => {
		const { container } = render(CodeEditor, {
			props: { title, code, language, resizable: false },
		});
		expect(
			container.querySelector(".code-editor-resize-handle"),
		).not.toBeInTheDocument();
	});
});
