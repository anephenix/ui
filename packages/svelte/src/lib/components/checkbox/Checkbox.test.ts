import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import Checkbox from "./Checkbox.svelte";

describe("Checkbox", () => {
	test("renders the checkbox with label", () => {
		render(Checkbox, { props: { label: "Test Label" } });
		expect(screen.getByText("Test Label")).toBeInTheDocument();
	});

	test("applies the correct class names", () => {
		render(Checkbox, { props: { label: "Test Label", class: "custom-class" } });
		const labelElement = screen.getByText("Test Label").closest("label");
		expect(labelElement).toHaveClass("checkbox custom-class");
	});

	test("sets the default checked state", () => {
		render(Checkbox, { props: { label: "Test Label", defaultValue: true } });
		const checkboxElement = screen.getByLabelText("Test Label");
		expect(checkboxElement).toBeChecked();
	});

	test("renders a real input element as the bind:this ref target", () => {
		render(Checkbox, { props: { label: "Test Label" } });
		expect(screen.getByLabelText("Test Label")).toBeInstanceOf(
			HTMLInputElement,
		);
	});

	test("toggles the checkbox state on click", () => {
		render(Checkbox, { props: { label: "Test Label" } });
		const checkboxElement = screen.getByLabelText("Test Label");
		fireEvent.click(checkboxElement);
		expect(checkboxElement).toBeChecked();
		fireEvent.click(checkboxElement);
		expect(checkboxElement).not.toBeChecked();
	});
});
