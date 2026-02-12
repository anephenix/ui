import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RadioButton from "./RadioButton";

describe("RadioButton", () => {
	test("should render with the correct label", () => {
		render(<RadioButton name="test" label="Test Label" />);
		expect(screen.getByText("Test Label")).toBeInTheDocument();
	});

	test("should have the correct name attribute", () => {
		render(<RadioButton name="test" label="Test Label" />);
		expect(screen.getByRole("radio")).toHaveAttribute("name", "test");
	});

	test("should apply the correct className", () => {
		render(
			<RadioButton name="test" label="Test Label" className="custom-class" />,
		);
		expect(screen.getByLabelText("Test Label").parentElement).toHaveClass(
			"radio custom-class",
		);
	});

	test("should call ref when provided", () => {
		const ref = jest.fn();
		render(<RadioButton name="test" label="Test Label" ref={ref} />);
		expect(ref).toHaveBeenCalled();
	});

	test("should have the correct default value", () => {
		render(
			<RadioButton name="test" label="Test Label" defaultValue="default" />,
		);
		expect(screen.getByRole("radio")).toHaveAttribute("value", "default");
	});

	test.todo("should be selectable");
});
