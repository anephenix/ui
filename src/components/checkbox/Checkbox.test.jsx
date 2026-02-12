import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
	test("renders the checkbox with label", () => {
		render(<Checkbox label="Test Label" />);
		expect(screen.getByText("Test Label")).toBeInTheDocument();
	});

	test("applies the correct class names", () => {
		render(<Checkbox label="Test Label" className="custom-class" />);
		const labelElement = screen.getByText("Test Label").closest("label");
		expect(labelElement).toHaveClass("checkbox custom-class");
	});

	test("sets the default checked state", () => {
		render(<Checkbox label="Test Label" defaultValue={true} />);
		const checkboxElement = screen.getByLabelText("Test Label");
		expect(checkboxElement).toBeChecked();
	});

	test("calls the ref correctly", () => {
		const ref = React.createRef();
		render(<Checkbox label="Test Label" ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLInputElement);
	});

	test("toggles the checkbox state on click", () => {
		render(<Checkbox label="Test Label" />);
		const checkboxElement = screen.getByLabelText("Test Label");
		fireEvent.click(checkboxElement);
		expect(checkboxElement).toBeChecked();
		fireEvent.click(checkboxElement);
		expect(checkboxElement).not.toBeChecked();
	});
});
