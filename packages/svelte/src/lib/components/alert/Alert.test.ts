import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import Alert from "./Alert.svelte";

function textSnippet(html: string) {
	return createRawSnippet(() => ({
		render: () => `<span>${html}</span>`,
	}));
}

describe("Alert", () => {
	test("renders children", () => {
		render(Alert, {
			props: { children: textSnippet("Something went wrong.") },
		});
		expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
	});

	test("renders the title when provided", () => {
		render(Alert, {
			props: { title: "Error", children: textSnippet("Something went wrong.") },
		});
		expect(screen.getByText("Error")).toBeInTheDocument();
	});

	test("does not render the title element when title is omitted", () => {
		const { container } = render(Alert, {
			props: { children: textSnippet("Content") },
		});
		expect(container.querySelector(".alert-title")).not.toBeInTheDocument();
	});

	test("renders rich children", () => {
		render(Alert, {
			props: {
				children: createRawSnippet(() => ({
					render: () =>
						"<div><strong>Bold text</strong> and <em>emphasised text</em></div>",
				})),
			},
		});
		expect(screen.getByText("Bold text")).toBeInTheDocument();
		expect(screen.getByText("emphasised text")).toBeInTheDocument();
	});

	test("applies the correct variant class", () => {
		const { container } = render(Alert, {
			props: { variant: "error", children: textSnippet("Error") },
		});
		expect(container.firstChild).toHaveClass("alert-error");
	});

	test("defaults to the info variant", () => {
		const { container } = render(Alert, {
			props: { children: textSnippet("Info") },
		});
		expect(container.firstChild).toHaveClass("alert-info");
	});

	test("applies an additional class", () => {
		const { container } = render(Alert, {
			props: { class: "custom-alert", children: textSnippet("Content") },
		});
		expect(container.firstChild).toHaveClass("alert", "custom-alert");
	});

	test("renders the dismiss button when onClose is provided", () => {
		render(Alert, {
			props: { onClose: () => {}, children: textSnippet("Content") },
		});
		expect(
			screen.getByRole("button", { name: /dismiss/i }),
		).toBeInTheDocument();
	});

	test("does not render the dismiss button when onClose is omitted", () => {
		render(Alert, { props: { children: textSnippet("Content") } });
		expect(
			screen.queryByRole("button", { name: /dismiss/i }),
		).not.toBeInTheDocument();
	});

	test("calls onClose when the dismiss button is clicked", () => {
		const handleClose = vi.fn();
		render(Alert, {
			props: { onClose: handleClose, children: textSnippet("Content") },
		});
		fireEvent.click(screen.getByRole("button", { name: /dismiss/i }));
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	test("has role alert for error variant", () => {
		render(Alert, {
			props: { variant: "error", children: textSnippet("Error message") },
		});
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	test("has role alert for warning variant", () => {
		render(Alert, {
			props: { variant: "warning", children: textSnippet("Warning message") },
		});
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	test("has role status for info variant", () => {
		render(Alert, {
			props: { variant: "info", children: textSnippet("Info message") },
		});
		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	test("has role status for success variant", () => {
		render(Alert, {
			props: { variant: "success", children: textSnippet("Success message") },
		});
		expect(screen.getByRole("status")).toBeInTheDocument();
	});
});
