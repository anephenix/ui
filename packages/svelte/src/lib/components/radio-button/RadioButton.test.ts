import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import RadioButton from "./RadioButton.svelte";

describe("RadioButton", () => {
	test("should render with the correct label", () => {
		render(RadioButton, { props: { name: "test", label: "Test Label" } });
		expect(screen.getByText("Test Label")).toBeInTheDocument();
	});

	test("should have the correct name attribute", () => {
		render(RadioButton, { props: { name: "test", label: "Test Label" } });
		expect(screen.getByRole("radio")).toHaveAttribute("name", "test");
	});

	test("should apply the correct class", () => {
		render(RadioButton, {
			props: { name: "test", label: "Test Label", class: "custom-class" },
		});
		expect(screen.getByLabelText("Test Label").parentElement).toHaveClass(
			"radio custom-class",
		);
	});

	test("renders a real input element as the bind:this ref target", () => {
		render(RadioButton, { props: { name: "test", label: "Test Label" } });
		expect(screen.getByRole("radio")).toBeInstanceOf(HTMLInputElement);
	});

	test("should have the correct default value", () => {
		render(RadioButton, {
			props: { name: "test", label: "Test Label", defaultValue: "default" },
		});
		expect(screen.getByRole("radio")).toHaveAttribute("value", "default");
	});

	test.todo("should be selectable");
});
