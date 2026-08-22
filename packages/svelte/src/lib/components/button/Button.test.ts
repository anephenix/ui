import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/svelte";
import Button from "./Button.svelte";

describe("Button", () => {
	test("renders with correct text", () => {
		const { getByText } = render(Button, { props: { text: "Click me" } });
		expect(getByText("Click me")).toBeInTheDocument();
	});

	test("calls onclick when clicked", () => {
		const handleClick = vi.fn();
		const { getByText } = render(Button, {
			props: { text: "Click me", onclick: handleClick },
		});
		fireEvent.click(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test("passes class to the button element", () => {
		const { container } = render(Button, {
			props: { text: "Click me", class: "custom-class" },
		});
		expect(container.firstChild).toHaveClass("custom-class");
	});

	test("renders a real button element as the bind:this ref target", () => {
		const { container } = render(Button, { props: { text: "Click me" } });
		expect(container.querySelector("button")).toBeInstanceOf(HTMLButtonElement);
	});

	test("sets the name attribute on the button element", () => {
		const { getByRole } = render(Button, {
			props: { text: "Click me", name: "test-button" },
		});
		expect(getByRole("button")).toHaveAttribute("name", "test-button");
	});
});
