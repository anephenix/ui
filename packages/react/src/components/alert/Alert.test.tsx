import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Alert from "./Alert";

describe("Alert", () => {
	test("renders children", () => {
		render(<Alert>Something went wrong.</Alert>);
		expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
	});

	test("renders the title when provided", () => {
		render(<Alert title="Error">Something went wrong.</Alert>);
		expect(screen.getByText("Error")).toBeInTheDocument();
	});

	test("does not render the title element when title is omitted", () => {
		const { container } = render(<Alert>Content</Alert>);
		expect(container.querySelector(".alert-title")).not.toBeInTheDocument();
	});

	test("renders rich children (React nodes)", () => {
		render(
			<Alert>
				<strong>Bold text</strong> and <em>emphasised text</em>
			</Alert>,
		);
		expect(screen.getByText("Bold text")).toBeInTheDocument();
		expect(screen.getByText("emphasised text")).toBeInTheDocument();
	});

	test("applies the correct variant class", () => {
		const { container } = render(<Alert variant="error">Error</Alert>);
		expect(container.firstChild).toHaveClass("alert-error");
	});

	test("defaults to the info variant", () => {
		const { container } = render(<Alert>Info</Alert>);
		expect(container.firstChild).toHaveClass("alert-info");
	});

	test("applies an additional className", () => {
		const { container } = render(
			<Alert className="custom-alert">Content</Alert>,
		);
		expect(container.firstChild).toHaveClass("alert", "custom-alert");
	});

	test("renders the dismiss button when onClose is provided", () => {
		render(<Alert onClose={() => {}}>Content</Alert>);
		expect(
			screen.getByRole("button", { name: /dismiss/i }),
		).toBeInTheDocument();
	});

	test("does not render the dismiss button when onClose is omitted", () => {
		render(<Alert>Content</Alert>);
		expect(
			screen.queryByRole("button", { name: /dismiss/i }),
		).not.toBeInTheDocument();
	});

	test("calls onClose when the dismiss button is clicked", () => {
		const handleClose = vi.fn();
		render(<Alert onClose={handleClose}>Content</Alert>);
		fireEvent.click(screen.getByRole("button", { name: /dismiss/i }));
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	test("has role alert for error variant", () => {
		render(<Alert variant="error">Error message</Alert>);
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	test("has role alert for warning variant", () => {
		render(<Alert variant="warning">Warning message</Alert>);
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	test("has role status for info variant", () => {
		render(<Alert variant="info">Info message</Alert>);
		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	test("has role status for success variant", () => {
		render(<Alert variant="success">Success message</Alert>);
		expect(screen.getByRole("status")).toBeInTheDocument();
	});
});
