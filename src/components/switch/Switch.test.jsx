import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Switch from "./Switch";

describe("Switch", () => {
	test("renders the label text", () => {
		render(<Switch label="Enable notifications" />);
		expect(screen.getByText("Enable notifications")).toBeInTheDocument();
	});

	test("renders without a label span when label is omitted", () => {
		const { container } = render(<Switch />);
		expect(container.querySelector(".switch-label")).not.toBeInTheDocument();
	});

	test("is unchecked by default", () => {
		render(<Switch label="Toggle" />);
		expect(screen.getByRole("switch")).not.toBeChecked();
	});

	test("is checked when defaultChecked is true", () => {
		render(<Switch label="Toggle" defaultChecked={true} />);
		expect(screen.getByRole("switch")).toBeChecked();
	});

	test("toggles on click in uncontrolled mode", () => {
		render(<Switch label="Toggle" defaultChecked={false} />);
		const input = screen.getByRole("switch");
		fireEvent.click(input);
		expect(input).toBeChecked();
		fireEvent.click(input);
		expect(input).not.toBeChecked();
	});

	test("calls onChange when toggled", () => {
		const handleChange = vi.fn();
		render(
			<Switch label="Toggle" defaultChecked={false} onChange={handleChange} />,
		);
		fireEvent.click(screen.getByRole("switch"));
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange.mock.calls[0][0].target.checked).toBe(true);
	});

	test("does not toggle when disabled", async () => {
		const user = userEvent.setup();
		render(<Switch label="Toggle" defaultChecked={false} disabled={true} />);
		const input = screen.getByRole("switch");
		await user.click(input);
		expect(input).not.toBeChecked();
	});

	test("applies the switch-disabled class when disabled", () => {
		const { container } = render(<Switch label="Toggle" disabled={true} />);
		expect(container.firstChild).toHaveClass("switch-disabled");
	});

	test("applies an additional className to the label", () => {
		const { container } = render(
			<Switch label="Toggle" className="my-switch" />,
		);
		expect(container.firstChild).toHaveClass("switch", "my-switch");
	});

	test("does not apply switch-disabled class when enabled", () => {
		const { container } = render(<Switch label="Toggle" disabled={false} />);
		expect(container.firstChild).not.toHaveClass("switch-disabled");
	});

	test("sets the name attribute on the input", () => {
		render(<Switch label="Toggle" name="notifications" />);
		expect(screen.getByRole("switch")).toHaveAttribute("name", "notifications");
	});

	test("has role switch on the input", () => {
		render(<Switch label="Toggle" />);
		expect(screen.getByRole("switch")).toBeInTheDocument();
	});

	test("forwards the ref to the input element", () => {
		const ref = React.createRef();
		render(<Switch label="Toggle" ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLInputElement);
	});

	test("reflects the checked prop in controlled mode", () => {
		const { rerender } = render(
			<Switch label="Toggle" checked={false} onChange={() => {}} />,
		);
		expect(screen.getByRole("switch")).not.toBeChecked();
		rerender(<Switch label="Toggle" checked={true} onChange={() => {}} />);
		expect(screen.getByRole("switch")).toBeChecked();
	});
});
