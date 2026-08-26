import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import LiveTerminal from "./LiveTerminal.svelte";

describe("LiveTerminal", () => {
	const title = "Test Terminal";

	test("renders the title", () => {
		render(LiveTerminal, { props: { title } });
		expect(screen.getByText(title)).toBeInTheDocument();
	});

	test("renders provided lines with the right styling hooks", () => {
		const { container } = render(LiveTerminal, {
			props: {
				title,
				lines: [
					{ type: "input", text: "ls" },
					{ type: "output", text: "file.txt" },
					{ type: "error", text: "not found" },
				],
			},
		});
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
		const { container } = render(LiveTerminal, {
			props: {
				title,
				lines: [{ type: "input", text: "line one\nline two" }],
			},
		});
		const rendered = container.querySelectorAll(".live-terminal-line");
		expect(rendered.length).toBe(2);
		expect(screen.getByText("line one")).toBeInTheDocument();
		expect(screen.getByText("line two")).toBeInTheDocument();
		const prompts = Array.from(
			container.querySelectorAll(".live-terminal-line .live-terminal-prompt"),
		).map((el) => el.textContent?.trim());
		expect(prompts).toEqual(["$", ">"]);
	});

	test("typing updates the input value", async () => {
		render(LiveTerminal, { props: { title } });
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		await fireEvent.input(input, { target: { value: "help" } });
		expect(input.value).toBe("help");
	});

	test("submitting a non-empty command calls oncommand and clears the input", async () => {
		const oncommand = vi.fn();
		render(LiveTerminal, { props: { title, oncommand } });
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		await fireEvent.input(input, { target: { value: "help" } });
		await fireEvent.keyDown(input, { key: "Enter" });
		expect(oncommand).toHaveBeenCalledWith("help");
		expect(input.value).toBe("");
	});

	test("submitting an empty or whitespace-only command does not call oncommand", async () => {
		const oncommand = vi.fn();
		render(LiveTerminal, { props: { title, oncommand } });
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		await fireEvent.keyDown(input, { key: "Enter" });
		await fireEvent.input(input, { target: { value: "   " } });
		await fireEvent.keyDown(input, { key: "Enter" });
		expect(oncommand).not.toHaveBeenCalled();
	});

	test("Shift+Enter inserts a newline instead of submitting", async () => {
		const oncommand = vi.fn();
		render(LiveTerminal, { props: { title, oncommand } });
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		await fireEvent.input(input, { target: { value: "line one" } });
		input.setSelectionRange(8, 8);
		await fireEvent.keyDown(input, { key: "Enter", shiftKey: true });
		expect(oncommand).not.toHaveBeenCalled();
		expect(input.value).toBe("line one\n");
	});

	test("submitting a multi-line command passes the full text through, newlines included", async () => {
		const oncommand = vi.fn();
		render(LiveTerminal, { props: { title, oncommand } });
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		await fireEvent.input(input, { target: { value: "line one\nline two" } });
		await fireEvent.keyDown(input, { key: "Enter" });
		expect(oncommand).toHaveBeenCalledWith("line one\nline two");
		expect(input.value).toBe("");
	});

	test("ArrowUp/ArrowDown navigate through submitted command history", async () => {
		render(LiveTerminal, { props: { title } });
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;

		await fireEvent.input(input, { target: { value: "first" } });
		await fireEvent.keyDown(input, { key: "Enter" });
		await fireEvent.input(input, { target: { value: "second" } });
		await fireEvent.keyDown(input, { key: "Enter" });

		await fireEvent.keyDown(input, { key: "ArrowUp" });
		expect(input.value).toBe("second");
		await fireEvent.keyDown(input, { key: "ArrowUp" });
		expect(input.value).toBe("first");
		await fireEvent.keyDown(input, { key: "ArrowDown" });
		expect(input.value).toBe("second");
		await fireEvent.keyDown(input, { key: "ArrowDown" });
		expect(input.value).toBe("");
	});

	test("ArrowDown past the newest history entry restores the in-progress draft", async () => {
		render(LiveTerminal, { props: { title } });
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;

		await fireEvent.input(input, { target: { value: "first" } });
		await fireEvent.keyDown(input, { key: "Enter" });
		await fireEvent.input(input, { target: { value: "unsent draft" } });

		await fireEvent.keyDown(input, { key: "ArrowUp" });
		expect(input.value).toBe("first");
		await fireEvent.keyDown(input, { key: "ArrowDown" });
		expect(input.value).toBe("unsent draft");
	});

	test("ArrowUp on a line below the first line does not recall history", async () => {
		render(LiveTerminal, { props: { title } });
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;

		await fireEvent.input(input, { target: { value: "first" } });
		await fireEvent.keyDown(input, { key: "Enter" });

		await fireEvent.input(input, { target: { value: "line one\nline two" } });
		await fireEvent.keyDown(input, { key: "ArrowUp" });
		expect(input.value).toBe("line one\nline two");
	});

	test("ArrowDown on a line above the last line does not recall the next history entry", async () => {
		render(LiveTerminal, { props: { title } });
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;

		await fireEvent.input(input, { target: { value: "first" } });
		await fireEvent.keyDown(input, { key: "Enter" });
		await fireEvent.input(input, { target: { value: "second" } });
		await fireEvent.keyDown(input, { key: "Enter" });
		await fireEvent.keyDown(input, { key: "ArrowUp" });
		await fireEvent.keyDown(input, { key: "ArrowUp" });
		expect(input.value).toBe("first");

		await fireEvent.input(input, { target: { value: "line one\nline two" } });
		input.setSelectionRange(3, 3);
		await fireEvent.select(input);
		await fireEvent.keyDown(input, { key: "ArrowDown" });
		expect(input.value).toBe("line one\nline two");
	});

	test("Tab auto-completes when there is exactly one suggestion", async () => {
		const getSuggestions = vi.fn(() => ["help"]);
		render(LiveTerminal, { props: { title, getSuggestions } });
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		await fireEvent.input(input, { target: { value: "he" } });
		await fireEvent.keyDown(input, { key: "Tab" });
		expect(getSuggestions).toHaveBeenCalledWith("he");
		expect(input.value).toBe("help");
	});

	test("Tab shows a suggestion list and completes to the common prefix on ambiguous matches", async () => {
		const getSuggestions = vi.fn(() => ["help", "history"]);
		const { container } = render(LiveTerminal, {
			props: { title, getSuggestions },
		});
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		await fireEvent.input(input, { target: { value: "h" } });
		await fireEvent.keyDown(input, { key: "Tab" });
		expect(input.value).toBe("h");
		expect(
			container.querySelector(".live-terminal-suggestions")?.textContent,
		).toBe("help  history");
	});

	test("disables the input when disabled is true", () => {
		render(LiveTerminal, { props: { title, disabled: true } });
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		expect(input).toBeDisabled();
	});

	test("clicking the terminal body focuses the input", async () => {
		const { container } = render(LiveTerminal, { props: { title } });
		const body = container.querySelector(
			".live-terminal-body",
		) as HTMLDivElement;
		const input = screen.getByRole("textbox") as HTMLTextAreaElement;
		await fireEvent.click(body);
		expect(input).toHaveFocus();
	});

	test("does not render a title-bar actions column now that Copy has been removed", () => {
		const { container } = render(LiveTerminal, { props: { title } });
		expect(
			container.querySelector("#title-bar-actions"),
		).not.toBeInTheDocument();
		expect(screen.queryByText("Copy")).not.toBeInTheDocument();
	});

	test("toggles fullscreen when the maximize button is clicked", async () => {
		const { container } = render(LiveTerminal, { props: { title } });
		const maximize = container.querySelector("#maximize") as HTMLButtonElement;
		expect(container.querySelector(".live-terminal")).not.toHaveClass(
			"is-fullscreen",
		);
		await fireEvent.click(maximize);
		expect(container.querySelector(".live-terminal")).toHaveClass(
			"is-fullscreen",
		);
		await fireEvent.click(maximize);
		expect(container.querySelector(".live-terminal")).not.toHaveClass(
			"is-fullscreen",
		);
	});

	test("does not toggle fullscreen when expandable is false", async () => {
		const { container } = render(LiveTerminal, {
			props: { title, expandable: false },
		});
		const maximize = container.querySelector("#maximize") as HTMLButtonElement;
		await fireEvent.click(maximize);
		expect(container.querySelector(".live-terminal")).not.toHaveClass(
			"is-fullscreen",
		);
	});

	test("shows the resize handle by default and hides it when resizable is false", () => {
		const { container, rerender } = render(LiveTerminal, {
			props: { title },
		});
		expect(
			container.querySelector(".live-terminal-resize-handle"),
		).toBeInTheDocument();
		rerender({ title, resizable: false });
		expect(
			container.querySelector(".live-terminal-resize-handle"),
		).not.toBeInTheDocument();
	});

	test("hides the resize handle while fullscreen", async () => {
		const { container } = render(LiveTerminal, { props: { title } });
		const maximize = container.querySelector("#maximize") as HTMLButtonElement;
		await fireEvent.click(maximize);
		expect(
			container.querySelector(".live-terminal-resize-handle"),
		).not.toBeInTheDocument();
	});
});
