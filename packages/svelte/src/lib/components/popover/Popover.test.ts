import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import PopoverHost from "./PopoverHost.test.svelte";

describe("Popover", () => {
	test("renders the trigger element", () => {
		render(PopoverHost);
		expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
	});

	test("popover dialog is not visible initially", () => {
		render(PopoverHost);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("clicking the trigger opens the popover", () => {
		render(PopoverHost);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	test("clicking the trigger again closes the popover", () => {
		render(PopoverHost);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("renders the content in the popover body", () => {
		render(PopoverHost, { props: { content: "Popover content" } });
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByText("Popover content")).toBeInTheDocument();
	});

	test("renders the title when provided", () => {
		render(PopoverHost, { props: { title: "Settings" } });
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByText("Settings")).toBeInTheDocument();
	});

	test("does not render the title element when title is omitted", () => {
		render(PopoverHost);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(
			screen.queryByRole("dialog")?.querySelector(".popover-title"),
		).not.toBeInTheDocument();
	});

	test("close button closes the popover", () => {
		render(PopoverHost, { props: { title: "Settings" } });
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		fireEvent.click(screen.getByRole("button", { name: "Close" }));
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("Escape key closes the popover", () => {
		render(PopoverHost);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		fireEvent.keyDown(document, { key: "Escape" });
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("clicking outside closes the popover", () => {
		render(PopoverHost);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		fireEvent.mouseDown(document.body);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("trigger has aria-expanded false when closed", () => {
		render(PopoverHost);
		expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute(
			"aria-expanded",
			"false",
		);
	});

	test("trigger has aria-expanded true when open", () => {
		render(PopoverHost);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute(
			"aria-expanded",
			"true",
		);
	});

	test("trigger has aria-haspopup set to dialog", () => {
		render(PopoverHost);
		expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute(
			"aria-haspopup",
			"dialog",
		);
	});

	test("applies the correct position class", () => {
		render(PopoverHost, { props: { position: "right" } });
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByRole("dialog")).toHaveClass("popover-right");
	});

	test("defaults to the bottom position", () => {
		render(PopoverHost);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByRole("dialog")).toHaveClass("popover-bottom");
	});

	test("applies an additional class to the popover", () => {
		render(PopoverHost, { props: { class: "custom-popover" } });
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByRole("dialog")).toHaveClass("popover", "custom-popover");
	});
});
