import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/svelte";
import Input from "./Input.svelte";

describe("Input", () => {
	test("renders correctly with default props", () => {
		const { getByPlaceholderText } = render(Input, {
			props: { placeholder: "Enter text" },
		});
		const inputElement = getByPlaceholderText("Enter text");
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toHaveAttribute("type", "text");
	});

	test("renders correctly with given props", () => {
		const { getByPlaceholderText } = render(Input, {
			props: {
				type: "password",
				class: "custom-class",
				defaultValue: "password123",
				placeholder: "Enter password",
				name: "password",
			},
		});
		const inputElement = getByPlaceholderText("Enter password");
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toHaveAttribute("type", "password");
		expect(inputElement).toHaveClass("custom-class");
		expect(inputElement).toHaveAttribute("name", "password");
		expect(inputElement).toHaveValue("password123");
	});

	test("calls onchange when value changes", () => {
		const handleChange = vi.fn();
		const { getByPlaceholderText } = render(Input, {
			props: { placeholder: "Enter text", onchange: handleChange },
		});
		const inputElement = getByPlaceholderText("Enter text");
		fireEvent.change(inputElement, { target: { value: "new value" } });
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(inputElement).toHaveValue("new value");
	});

	test("renders a real input element as the bind:this ref target", () => {
		const { getByPlaceholderText } = render(Input, {
			props: { placeholder: "Enter text" },
		});
		expect(getByPlaceholderText("Enter text")).toBeInstanceOf(HTMLInputElement);
	});
});
