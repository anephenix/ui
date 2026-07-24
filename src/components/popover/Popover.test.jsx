import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Popover from "./Popover";

const trigger = <button type="button">Open</button>;

describe("Popover", () => {
	test("renders the trigger element", () => {
		render(<Popover trigger={trigger} content={<p>Body</p>} />);
		expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
	});

	test("popover dialog is not visible initially", () => {
		render(<Popover trigger={trigger} content={<p>Body</p>} />);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("clicking the trigger opens the popover", () => {
		render(<Popover trigger={trigger} content={<p>Body</p>} />);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	test("clicking the trigger again closes the popover", () => {
		render(<Popover trigger={trigger} content={<p>Body</p>} />);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("renders the content in the popover body", () => {
		render(<Popover trigger={trigger} content={<p>Popover content</p>} />);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByText("Popover content")).toBeInTheDocument();
	});

	test("renders the title when provided", () => {
		render(
			<Popover trigger={trigger} content={<p>Body</p>} title="Settings" />,
		);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByText("Settings")).toBeInTheDocument();
	});

	test("does not render the title element when title is omitted", () => {
		render(<Popover trigger={trigger} content={<p>Body</p>} />);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(
			screen.queryByRole("dialog").querySelector(".popover-title"),
		).not.toBeInTheDocument();
	});

	test("close button closes the popover", () => {
		render(
			<Popover trigger={trigger} content={<p>Body</p>} title="Settings" />,
		);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		fireEvent.click(screen.getByRole("button", { name: "Close" }));
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("Escape key closes the popover", () => {
		render(<Popover trigger={trigger} content={<p>Body</p>} />);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		fireEvent.keyDown(document, { key: "Escape" });
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("clicking outside closes the popover", () => {
		render(<Popover trigger={trigger} content={<p>Body</p>} />);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		fireEvent.mouseDown(document.body);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	test("trigger has aria-expanded false when closed", () => {
		render(<Popover trigger={trigger} content={<p>Body</p>} />);
		expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute(
			"aria-expanded",
			"false",
		);
	});

	test("trigger has aria-expanded true when open", () => {
		render(<Popover trigger={trigger} content={<p>Body</p>} />);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute(
			"aria-expanded",
			"true",
		);
	});

	test("trigger has aria-haspopup set to dialog", () => {
		render(<Popover trigger={trigger} content={<p>Body</p>} />);
		expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute(
			"aria-haspopup",
			"dialog",
		);
	});

	test("applies the correct position class", () => {
		render(
			<Popover trigger={trigger} content={<p>Body</p>} position="right" />,
		);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByRole("dialog")).toHaveClass("popover-right");
	});

	test("defaults to the bottom position", () => {
		render(<Popover trigger={trigger} content={<p>Body</p>} />);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByRole("dialog")).toHaveClass("popover-bottom");
	});

	test("applies an additional className to the popover", () => {
		render(
			<Popover
				trigger={trigger}
				content={<p>Body</p>}
				className="custom-popover"
			/>,
		);
		fireEvent.click(screen.getByRole("button", { name: "Open" }));
		expect(screen.getByRole("dialog")).toHaveClass("popover", "custom-popover");
	});
});
