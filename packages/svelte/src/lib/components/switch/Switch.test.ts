import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import Switch from "./Switch.svelte";

describe("Switch", () => {
	test("renders the label text", () => {
		render(Switch, { props: { label: "Enable notifications" } });
		expect(screen.getByText("Enable notifications")).toBeInTheDocument();
	});

	test("renders without a label span when label is omitted", () => {
		const { container } = render(Switch);
		expect(container.querySelector(".switch-label")).not.toBeInTheDocument();
	});

	test("is unchecked by default", () => {
		render(Switch, { props: { label: "Toggle" } });
		expect(screen.getByRole("switch")).not.toBeChecked();
	});

	test("is checked when checked is true", () => {
		render(Switch, { props: { label: "Toggle", checked: true } });
		expect(screen.getByRole("switch")).toBeChecked();
	});

	test("toggles on click in uncontrolled mode", () => {
		render(Switch, { props: { label: "Toggle", checked: false } });
		const input = screen.getByRole("switch");
		fireEvent.click(input);
		expect(input).toBeChecked();
		fireEvent.click(input);
		expect(input).not.toBeChecked();
	});

	test("calls onchange when toggled", () => {
		const handleChange = vi.fn();
		render(Switch, {
			props: { label: "Toggle", checked: false, onchange: handleChange },
		});
		fireEvent.click(screen.getByRole("switch"));
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange.mock.calls[0][0].target.checked).toBe(true);
	});

	test("does not toggle when disabled", async () => {
		const user = userEvent.setup();
		render(Switch, {
			props: { label: "Toggle", checked: false, disabled: true },
		});
		const input = screen.getByRole("switch");
		await user.click(input);
		expect(input).not.toBeChecked();
	});

	test("applies the switch-disabled class when disabled", () => {
		const { container } = render(Switch, {
			props: { label: "Toggle", disabled: true },
		});
		expect(container.firstChild).toHaveClass("switch-disabled");
	});

	test("applies an additional class to the label", () => {
		const { container } = render(Switch, {
			props: { label: "Toggle", class: "my-switch" },
		});
		expect(container.firstChild).toHaveClass("switch", "my-switch");
	});

	test("does not apply switch-disabled class when enabled", () => {
		const { container } = render(Switch, {
			props: { label: "Toggle", disabled: false },
		});
		expect(container.firstChild).not.toHaveClass("switch-disabled");
	});

	test("sets the name attribute on the input", () => {
		render(Switch, { props: { label: "Toggle", name: "notifications" } });
		expect(screen.getByRole("switch")).toHaveAttribute("name", "notifications");
	});

	test("has role switch on the input", () => {
		render(Switch, { props: { label: "Toggle" } });
		expect(screen.getByRole("switch")).toBeInTheDocument();
	});

	test("renders a real input element as the bind:this ref target", () => {
		render(Switch, { props: { label: "Toggle" } });
		expect(screen.getByRole("switch")).toBeInstanceOf(HTMLInputElement);
	});

	test("reflects the checked prop when it changes externally", () => {
		const { rerender } = render(Switch, {
			props: { label: "Toggle", checked: false },
		});
		expect(screen.getByRole("switch")).not.toBeChecked();
		rerender({ label: "Toggle", checked: true });
		expect(screen.getByRole("switch")).toBeChecked();
	});
});
