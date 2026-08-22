import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import ComboBox from "./ComboBox.svelte";

const options = [
	{ value: "apple", label: "Apple" },
	{ value: "banana", label: "Banana" },
	{ value: "cherry", label: "Cherry" },
];

describe("ComboBox", () => {
	test("renders the input with the given placeholder", () => {
		render(ComboBox, { props: { options, placeholder: "Pick a fruit" } });
		expect(screen.getByPlaceholderText("Pick a fruit")).toBeInTheDocument();
	});

	test("shows all options when the input is focused", () => {
		render(ComboBox, { props: { options } });
		fireEvent.focus(screen.getByRole("combobox"));
		expect(screen.getByText("Apple")).toBeInTheDocument();
		expect(screen.getByText("Banana")).toBeInTheDocument();
		expect(screen.getByText("Cherry")).toBeInTheDocument();
	});

	// Svelte's combobox listens on the native "input" event (like React's
	// onChange, which really tracks keystrokes), not "change" (which only
	// fires on blur/commit) — using fireEvent.change here wouldn't trigger
	// live filtering at all, so these use fireEvent.input instead.
	test("filters options as the user types", () => {
		render(ComboBox, { props: { options } });
		fireEvent.input(screen.getByRole("combobox"), { target: { value: "an" } });
		expect(screen.getByText("Banana")).toBeInTheDocument();
		expect(screen.queryByText("Apple")).not.toBeInTheDocument();
		expect(screen.queryByText("Cherry")).not.toBeInTheDocument();
	});

	test("shows 'No results found' when no options match", () => {
		render(ComboBox, { props: { options } });
		fireEvent.input(screen.getByRole("combobox"), { target: { value: "xyz" } });
		expect(screen.getByText("No results found")).toBeInTheDocument();
	});

	test("calls onSelect with the chosen option when an option is clicked", () => {
		const handleSelect = vi.fn();
		render(ComboBox, { props: { options, onSelect: handleSelect } });
		fireEvent.focus(screen.getByRole("combobox"));
		fireEvent.mouseDown(screen.getByText("Banana"));
		expect(handleSelect).toHaveBeenCalledWith({
			value: "banana",
			label: "Banana",
		});
	});

	test("sets the input value to the selected option's label after selection", () => {
		render(ComboBox, { props: { options } });
		const input = screen.getByRole("combobox");
		fireEvent.focus(input);
		fireEvent.mouseDown(screen.getByText("Cherry"));
		expect(input).toHaveValue("Cherry");
	});

	test("closes the listbox after selection", () => {
		render(ComboBox, { props: { options } });
		fireEvent.focus(screen.getByRole("combobox"));
		fireEvent.mouseDown(screen.getByText("Apple"));
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
	});

	test("closes the listbox on Escape key", () => {
		render(ComboBox, { props: { options } });
		fireEvent.focus(screen.getByRole("combobox"));
		expect(screen.getByRole("listbox")).toBeInTheDocument();
		fireEvent.keyDown(screen.getByRole("combobox"), { key: "Escape" });
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
	});

	test("navigates options with arrow keys", () => {
		render(ComboBox, { props: { options } });
		const input = screen.getByRole("combobox");
		fireEvent.focus(input);
		fireEvent.keyDown(input, { key: "ArrowDown" });
		expect(screen.getByText("Apple").closest("div")).toHaveClass(
			"combo-box-option-active",
		);
		fireEvent.keyDown(input, { key: "ArrowDown" });
		expect(screen.getByText("Banana").closest("div")).toHaveClass(
			"combo-box-option-active",
		);
	});

	test("selects the active option on Enter", () => {
		const handleSelect = vi.fn();
		render(ComboBox, { props: { options, onSelect: handleSelect } });
		const input = screen.getByRole("combobox");
		fireEvent.focus(input);
		fireEvent.keyDown(input, { key: "ArrowDown" });
		fireEvent.keyDown(input, { key: "Enter" });
		expect(handleSelect).toHaveBeenCalledWith({
			value: "apple",
			label: "Apple",
		});
	});

	test("calls onChange as the user types", () => {
		const handleChange = vi.fn();
		render(ComboBox, { props: { options, onChange: handleChange } });
		fireEvent.input(screen.getByRole("combobox"), { target: { value: "Ban" } });
		expect(handleChange).toHaveBeenCalledWith("Ban");
	});

	test("renders a disabled input when disabled prop is true", () => {
		render(ComboBox, { props: { options, disabled: true } });
		expect(screen.getByRole("combobox")).toBeDisabled();
	});

	test("has correct ARIA attributes on the input", () => {
		render(ComboBox, { props: { options } });
		const input = screen.getByRole("combobox");
		expect(input).toHaveAttribute("aria-autocomplete", "list");
	});

	test("aria-expanded is true when the listbox is open", () => {
		render(ComboBox, { props: { options } });
		const input = screen.getByRole("combobox");
		fireEvent.focus(input);
		expect(input).toHaveAttribute("aria-expanded", "true");
	});

	test("aria-expanded is false when the listbox is closed", () => {
		render(ComboBox, { props: { options } });
		const input = screen.getByRole("combobox");
		expect(input).toHaveAttribute("aria-expanded", "false");
	});

	test("opens the listbox on ArrowDown when closed", () => {
		render(ComboBox, { props: { options } });
		const input = screen.getByRole("combobox");
		fireEvent.keyDown(input, { key: "ArrowDown" });
		expect(screen.getByRole("listbox")).toBeInTheDocument();
	});
});
