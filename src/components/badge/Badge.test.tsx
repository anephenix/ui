import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
	test("renders the children", () => {
		render(<Badge>Active</Badge>);
		expect(screen.getByText("Active")).toBeInTheDocument();
	});

	test("renders a number as children", () => {
		render(<Badge>{42}</Badge>);
		expect(screen.getByText("42")).toBeInTheDocument();
	});

	test("renders as a span element", () => {
		const { container } = render(<Badge>Label</Badge>);
		expect(container.firstChild?.tagName).toBe("SPAN");
	});

	test("defaults to the default variant", () => {
		const { container } = render(<Badge>Label</Badge>);
		expect(container.firstChild).toHaveClass("badge-default");
	});

	test("defaults to the md size", () => {
		const { container } = render(<Badge>Label</Badge>);
		expect(container.firstChild).toHaveClass("badge-md");
	});

	test("applies the correct variant class", () => {
		const { container } = render(<Badge variant="success">Success</Badge>);
		expect(container.firstChild).toHaveClass("badge-success");
	});

	test("applies the correct size class", () => {
		const { container } = render(<Badge size="lg">Large</Badge>);
		expect(container.firstChild).toHaveClass("badge-lg");
	});

	test("applies an additional className", () => {
		const { container } = render(<Badge className="custom-badge">Label</Badge>);
		expect(container.firstChild).toHaveClass("badge", "custom-badge");
	});

	test.each([
		"default",
		"primary",
		"secondary",
		"success",
		"warning",
		"info",
		"error",
	])("renders the %s variant without error", (variant) => {
		const { container } = render(<Badge variant={variant}>{variant}</Badge>);
		expect(container.firstChild).toHaveClass(`badge-${variant}`);
	});

	test.each(["sm", "md", "lg"])("renders the %s size without error", (size) => {
		const { container } = render(<Badge size={size}>Label</Badge>);
		expect(container.firstChild).toHaveClass(`badge-${size}`);
	});
});
