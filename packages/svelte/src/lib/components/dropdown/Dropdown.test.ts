import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import Dropdown from "./Dropdown.svelte";

describe("Dropdown", () => {
	const options = [
		{ value: "1", text: "Option 1" },
		{ value: "2", text: "Option 2" },
	];

	test("renders without crashing", () => {
		render(Dropdown, { props: { options } });
		const dropdown = screen.getByRole("combobox");
		expect(dropdown).toBeInTheDocument();
	});

	test("renders options correctly", () => {
		render(Dropdown, { props: { options } });
		for (const { text } of options) {
			expect(screen.getByText(text)).toBeInTheDocument();
		}
	});

	test("applies the correct class", () => {
		const className = "custom-class";
		render(Dropdown, { props: { options, class: className } });
		const dropdown = screen.getByRole("combobox").parentElement;
		expect(dropdown).toHaveClass(`dropdown ${className}`);
	});

	test("sets the default value", () => {
		const defaultValue = "2";
		render(Dropdown, { props: { options, defaultValue } });
		const dropdown = screen.getByRole("combobox") as HTMLSelectElement;
		expect(dropdown.value).toBe(defaultValue);
	});

	test("supports multiple selection", () => {
		render(Dropdown, { props: { options, multiple: true } });
		const dropdown = screen.getByRole("listbox");
		expect(dropdown).toBeInTheDocument();
	});
});
