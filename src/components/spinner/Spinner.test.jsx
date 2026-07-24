import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner", () => {
	test("renders with the default md size class", () => {
		const { container } = render(<Spinner />);
		expect(container.firstChild).toHaveClass("spinner-md");
	});

	test("applies the correct size class", () => {
		const { container } = render(<Spinner size="lg" />);
		expect(container.firstChild).toHaveClass("spinner-lg");
	});

	test("has role status", () => {
		render(<Spinner />);
		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	test("has the default aria-label", () => {
		render(<Spinner />);
		expect(screen.getByRole("status")).toHaveAttribute(
			"aria-label",
			"Loading...",
		);
	});

	test("uses a custom label when provided", () => {
		render(<Spinner label="Saving changes..." />);
		expect(screen.getByRole("status")).toHaveAttribute(
			"aria-label",
			"Saving changes...",
		);
	});

	test("applies an additional className", () => {
		const { container } = render(<Spinner className="my-spinner" />);
		expect(container.firstChild).toHaveClass("spinner", "my-spinner");
	});

	test.each(["sm", "md", "lg"])("renders the %s size without error", (size) => {
		const { container } = render(<Spinner size={size} />);
		expect(container.firstChild).toHaveClass(`spinner-${size}`);
	});
});
