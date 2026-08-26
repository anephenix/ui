import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import LiveTerminal from "./LiveTerminal";

describe("LiveTerminal", () => {
	const title = "Test Terminal";

	test("renders the title", () => {
		render(<LiveTerminal title={title} />);
		expect(screen.getByText(title)).toBeInTheDocument();
	});

	test("renders provided lines with the right styling hooks", () => {
		const { container } = render(
			<LiveTerminal
				title={title}
				lines={[
					{ type: "input", text: "ls" },
					{ type: "output", text: "file.txt" },
					{ type: "error", text: "not found" },
				]}
			/>,
		);
		const rendered = container.querySelectorAll(".live-terminal-line");
		expect(rendered.length).toBe(3);
		expect(screen.getByText("ls")).toBeInTheDocument();
		expect(screen.getByText("file.txt")).toBeInTheDocument();
		const errorLine = screen
			.getByText("not found")
			.closest(".live-terminal-line");
		expect(errorLine).toHaveClass("live-terminal-line-error");
	});

	test("renders each line of a multi-line submitted command with a continuation prompt", () => {
		const { container } = render(
			<LiveTerminal
				title={title}
				lines={[{ type: "input", text: "line one\nline two" }]}
			/>,
		);
		const rendered = container.querySelectorAll(".live-terminal-line");
		expect(rendered.length).toBe(2);
		expect(screen.getByText("line one")).toBeInTheDocument();
		expect(screen.getByText("line two")).toBeInTheDocument();
		const prompts = Array.from(
			container.querySelectorAll(".live-terminal-line .live-terminal-prompt"),
		).map((el) => el.textContent);
		expect(prompts).toEqual(["$", ">"]);
	});

	test("typing updates the input value", () => {
		render(<LiveTerminal title={title} />);
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.change(input, { target: { value: "help" } });
		expect(input.value).toBe("help");
	});

	test("submitting a non-empty command calls onCommand and clears the input", () => {
		const onCommand = vi.fn();
		render(<LiveTerminal title={title} onCommand={onCommand} />);
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.change(input, { target: { value: "help" } });
		fireEvent.keyDown(input, { key: "Enter" });
		expect(onCommand).toHaveBeenCalledWith("help");
		expect(input.value).toBe("");
	});

	test("submitting an empty or whitespace-only command does not call onCommand", () => {
		const onCommand = vi.fn();
		render(<LiveTerminal title={title} onCommand={onCommand} />);
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.keyDown(input, { key: "Enter" });
		fireEvent.change(input, { target: { value: "   " } });
		fireEvent.keyDown(input, { key: "Enter" });
		expect(onCommand).not.toHaveBeenCalled();
	});

	test("Shift+Enter inserts a newline instead of submitting", () => {
		const onCommand = vi.fn();
		render(<LiveTerminal title={title} onCommand={onCommand} />);
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.change(input, { target: { value: "line one" } });
		input.setSelectionRange(8, 8);
		fireEvent.keyDown(input, { key: "Enter", shiftKey: true });
		expect(onCommand).not.toHaveBeenCalled();
		expect(input.value).toBe("line one\n");
	});

	test("submitting a multi-line command passes the full text through, newlines included", () => {
		const onCommand = vi.fn();
		render(<LiveTerminal title={title} onCommand={onCommand} />);
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.change(input, { target: { value: "line one\nline two" } });
		fireEvent.keyDown(input, { key: "Enter" });
		expect(onCommand).toHaveBeenCalledWith("line one\nline two");
		expect(input.value).toBe("");
	});

	test("ArrowUp/ArrowDown navigate through submitted command history", () => {
		render(<LiveTerminal title={title} />);
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;

		fireEvent.change(input, { target: { value: "first" } });
		fireEvent.keyDown(input, { key: "Enter" });
		fireEvent.change(input, { target: { value: "second" } });
		fireEvent.keyDown(input, { key: "Enter" });

		fireEvent.keyDown(input, { key: "ArrowUp" });
		expect(input.value).toBe("second");
		fireEvent.keyDown(input, { key: "ArrowUp" });
		expect(input.value).toBe("first");
		fireEvent.keyDown(input, { key: "ArrowDown" });
		expect(input.value).toBe("second");
		fireEvent.keyDown(input, { key: "ArrowDown" });
		expect(input.value).toBe("");
	});

	test("ArrowDown past the newest history entry restores the in-progress draft", () => {
		render(<LiveTerminal title={title} />);
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;

		fireEvent.change(input, { target: { value: "first" } });
		fireEvent.keyDown(input, { key: "Enter" });
		fireEvent.change(input, { target: { value: "unsent draft" } });

		fireEvent.keyDown(input, { key: "ArrowUp" });
		expect(input.value).toBe("first");
		fireEvent.keyDown(input, { key: "ArrowDown" });
		expect(input.value).toBe("unsent draft");
	});

	test("ArrowUp on a line below the first line does not recall history", () => {
		render(<LiveTerminal title={title} />);
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;

		fireEvent.change(input, { target: { value: "first" } });
		fireEvent.keyDown(input, { key: "Enter" });

		fireEvent.change(input, { target: { value: "line one\nline two" } });
		// Caret defaults to the end (the second line) after the change event.
		fireEvent.keyDown(input, { key: "ArrowUp" });
		expect(input.value).toBe("line one\nline two");
	});

	test("ArrowDown on a line above the last line does not recall the next history entry", () => {
		render(<LiveTerminal title={title} />);
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;

		fireEvent.change(input, { target: { value: "first" } });
		fireEvent.keyDown(input, { key: "Enter" });
		fireEvent.change(input, { target: { value: "second" } });
		fireEvent.keyDown(input, { key: "Enter" });
		fireEvent.keyDown(input, { key: "ArrowUp" });
		fireEvent.keyDown(input, { key: "ArrowUp" });
		expect(input.value).toBe("first");

		fireEvent.change(input, { target: { value: "line one\nline two" } });
		input.setSelectionRange(3, 3);
		fireEvent.select(input);
		fireEvent.keyDown(input, { key: "ArrowDown" });
		expect(input.value).toBe("line one\nline two");
	});

	test("Tab auto-completes when there is exactly one suggestion", () => {
		const getSuggestions = vi.fn(() => ["help"]);
		render(<LiveTerminal title={title} getSuggestions={getSuggestions} />);
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.change(input, { target: { value: "he" } });
		fireEvent.keyDown(input, { key: "Tab" });
		expect(getSuggestions).toHaveBeenCalledWith("he");
		expect(input.value).toBe("help");
	});

	test("Tab shows a suggestion list and completes to the common prefix on ambiguous matches", () => {
		const getSuggestions = vi.fn(() => ["help", "history"]);
		const { container } = render(
			<LiveTerminal title={title} getSuggestions={getSuggestions} />,
		);
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.change(input, { target: { value: "h" } });
		fireEvent.keyDown(input, { key: "Tab" });
		expect(input.value).toBe("h");
		expect(
			container.querySelector(".live-terminal-suggestions")?.textContent,
		).toBe("help  history");
	});

	test("disables the input when disabled is true", () => {
		render(<LiveTerminal title={title} disabled />);
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		expect(input).toBeDisabled();
	});

	test("clicking the terminal body focuses the input", () => {
		const { container } = render(<LiveTerminal title={title} />);
		const body = container.querySelector(
			".live-terminal-body",
		) as HTMLDivElement;
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		fireEvent.click(body);
		expect(input).toHaveFocus();
	});

	test("does not render a title-bar actions column now that Copy has been removed", () => {
		const { container } = render(<LiveTerminal title={title} />);
		expect(
			container.querySelector("#title-bar-actions"),
		).not.toBeInTheDocument();
		expect(screen.queryByText("Copy")).not.toBeInTheDocument();
	});

	test("toggles fullscreen when the maximize button is clicked", () => {
		const { container } = render(<LiveTerminal title={title} />);
		const maximize = container.querySelector("#maximize") as HTMLButtonElement;
		expect(container.querySelector(".live-terminal")).not.toHaveClass(
			"is-fullscreen",
		);
		fireEvent.click(maximize);
		expect(container.querySelector(".live-terminal")).toHaveClass(
			"is-fullscreen",
		);
		fireEvent.click(maximize);
		expect(container.querySelector(".live-terminal")).not.toHaveClass(
			"is-fullscreen",
		);
	});

	test("does not toggle fullscreen when expandable is false", () => {
		const { container } = render(
			<LiveTerminal title={title} expandable={false} />,
		);
		const maximize = container.querySelector("#maximize") as HTMLButtonElement;
		fireEvent.click(maximize);
		expect(container.querySelector(".live-terminal")).not.toHaveClass(
			"is-fullscreen",
		);
	});

	test("shows the resize handle by default and hides it when resizable is false", () => {
		const { container, rerender } = render(<LiveTerminal title={title} />);
		expect(
			container.querySelector(".live-terminal-resize-handle"),
		).toBeInTheDocument();
		rerender(<LiveTerminal title={title} resizable={false} />);
		expect(
			container.querySelector(".live-terminal-resize-handle"),
		).not.toBeInTheDocument();
	});

	test("hides the resize handle while fullscreen", () => {
		const { container } = render(<LiveTerminal title={title} />);
		const maximize = container.querySelector("#maximize") as HTMLButtonElement;
		fireEvent.click(maximize);
		expect(
			container.querySelector(".live-terminal-resize-handle"),
		).not.toBeInTheDocument();
	});
});
