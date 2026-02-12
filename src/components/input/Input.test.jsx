import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
	test("renders correctly with default props", () => {
		const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
		const inputElement = getByPlaceholderText("Enter text");
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toHaveAttribute("type", "text");
	});

	test("renders correctly with given props", () => {
		const { getByPlaceholderText } = render(
			<Input
				type="password"
				className="custom-class"
				defaultValue="password123"
				placeholder="Enter password"
				name="password"
			/>,
		);
		const inputElement = getByPlaceholderText("Enter password");
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toHaveAttribute("type", "password");
		expect(inputElement).toHaveClass("custom-class");
		expect(inputElement).toHaveAttribute("name", "password");
		expect(inputElement).toHaveValue("password123");
	});

	test("calls onChange when value changes", () => {
		const handleChange = jest.fn();
		const { getByPlaceholderText } = render(
			<Input placeholder="Enter text" onChange={handleChange} />,
		);
		const inputElement = getByPlaceholderText("Enter text");
		fireEvent.change(inputElement, { target: { value: "new value" } });
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(inputElement).toHaveValue("new value");
	});

	test("forwards ref to the input element", () => {
		const ref = React.createRef();
		const { getByPlaceholderText } = render(
			<Input placeholder="Enter text" ref={ref} />,
		);
		const inputElement = getByPlaceholderText("Enter text");
		expect(ref.current).toBe(inputElement);
	});
});
