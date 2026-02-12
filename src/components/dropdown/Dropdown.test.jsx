import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Dropdown from "./Dropdown";

describe("Dropdown", () => {
	const options = [
		{ value: "1", text: "Option 1" },
		{ value: "2", text: "Option 2" },
	];

	test("renders without crashing", () => {
		render(<Dropdown options={options} />);
		const dropdown = screen.getByRole("combobox");
		expect(dropdown).toBeInTheDocument();
	});

	test("renders options correctly", () => {
		render(<Dropdown options={options} />);
		options.forEach(({ text }) => {
			expect(screen.getByText(text)).toBeInTheDocument();
		});
	});

	test("applies the correct className", () => {
		const className = "custom-class";
		render(<Dropdown options={options} className={className} />);
		const dropdown = screen.getByRole("combobox").parentElement;
		expect(dropdown).toHaveClass(`dropdown ${className}`);
	});

	test("sets the default value", () => {
		const defaultValue = "2";
		render(<Dropdown options={options} defaultValue={defaultValue} />);
		const dropdown = screen.getByRole("combobox");
		expect(dropdown.value).toBe(defaultValue);
	});

	test("supports multiple selection", () => {
		render(<Dropdown options={options} multiple />);
		const dropdown = screen.getByRole("listbox");
		expect(dropdown).toBeInTheDocument();
	});
});
