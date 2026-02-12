import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
	test("renders with correct text", () => {
		const { getByText } = render(<Button text="Click me" />);
		expect(getByText("Click me")).toBeInTheDocument();
	});

	test("calls onClick when clicked", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Button text="Click me" onClick={handleClick} />,
		);
		fireEvent.click(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test("passes className to the button element", () => {
		const { container } = render(
			<Button text="Click me" className="custom-class" />,
		);
		expect(container.firstChild).toHaveClass("custom-class");
	});

	test("forwards ref to the button element", () => {
		const ref = React.createRef();
		render(<Button text="Click me" ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLButtonElement);
	});

	test("sets the name attribute on the button element", () => {
		const { getByRole } = render(<Button text="Click me" name="test-button" />);
		expect(getByRole("button")).toHaveAttribute("name", "test-button");
	});
});
