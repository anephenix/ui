import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/svelte";
import Select from "./Select.svelte";

describe("Select", () => {
	const options = [
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
	];

	test("renders without crashing", () => {
		const { getByRole } = render(Select, { props: { options } });
		expect(getByRole("combobox")).toBeInTheDocument();
	});

	test("renders options correctly", () => {
		const { getByRole } = render(Select, { props: { options } });
		const select = getByRole("combobox") as HTMLSelectElement;
		expect(select.children.length).toBe(2);
		expect((select.children[0] as HTMLOptionElement).value).toBe("option1");
		expect((select.children[1] as HTMLOptionElement).value).toBe("option2");
	});

	test("calls onchange when an option is selected", () => {
		const handleChange = vi.fn();
		const { getByRole } = render(Select, {
			props: { options, onchange: handleChange },
		});
		const select = getByRole("combobox");
		fireEvent.change(select, { target: { value: "option2" } });
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
	});

	test("sets default value correctly", () => {
		const { getByRole } = render(Select, {
			props: { options, defaultValue: "option2" },
		});
		const select = getByRole("combobox") as HTMLSelectElement;
		expect(select.value).toBe("option2");
	});
});
