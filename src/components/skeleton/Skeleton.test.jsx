import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Skeleton from "./Skeleton";

describe("Skeleton", () => {
	test("renders a single skeleton element by default", () => {
		const { container } = render(<Skeleton />);
		expect(container.querySelectorAll(".skeleton")).toHaveLength(1);
	});

	test("has aria-hidden on the skeleton element", () => {
		const { container } = render(<Skeleton />);
		expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
	});

	test("applies the default width as a style", () => {
		const { container } = render(<Skeleton />);
		expect(container.firstChild).toHaveStyle({ width: "100%" });
	});

	test("applies the default height as a style", () => {
		const { container } = render(<Skeleton />);
		expect(container.firstChild).toHaveStyle({ height: "1rem" });
	});

	test("applies a string width", () => {
		const { container } = render(<Skeleton width="50%" />);
		expect(container.firstChild).toHaveStyle({ width: "50%" });
	});

	test("converts a numeric width to px", () => {
		const { container } = render(<Skeleton width={200} />);
		expect(container.firstChild).toHaveStyle({ width: "200px" });
	});

	test("converts a numeric height to px", () => {
		const { container } = render(<Skeleton height={40} />);
		expect(container.firstChild).toHaveStyle({ height: "40px" });
	});

	test("applies a custom borderRadius", () => {
		const { container } = render(<Skeleton borderRadius="50%" />);
		expect(container.firstChild).toHaveStyle({ borderRadius: "50%" });
	});

	test("applies an additional className", () => {
		const { container } = render(<Skeleton className="custom-skeleton" />);
		expect(container.firstChild).toHaveClass("skeleton", "custom-skeleton");
	});

	test("renders multiple skeleton lines when lines > 1", () => {
		const { container } = render(<Skeleton lines={3} />);
		expect(container.querySelectorAll(".skeleton")).toHaveLength(3);
	});

	test("wraps multiple lines in a skeleton-group element", () => {
		const { container } = render(<Skeleton lines={3} />);
		expect(container.querySelector(".skeleton-group")).toBeInTheDocument();
	});

	test("the last line in a multi-line skeleton is 70% wide", () => {
		const { container } = render(<Skeleton lines={3} width="100%" />);
		const lines = container.querySelectorAll(".skeleton");
		expect(lines[lines.length - 1]).toHaveStyle({ width: "70%" });
	});

	test("non-last lines use the specified width", () => {
		const { container } = render(<Skeleton lines={3} width="100%" />);
		const lines = container.querySelectorAll(".skeleton");
		expect(lines[0]).toHaveStyle({ width: "100%" });
		expect(lines[1]).toHaveStyle({ width: "100%" });
	});

	test("applies className to the wrapper when lines > 1", () => {
		const { container } = render(
			<Skeleton lines={3} className="custom-group" />,
		);
		expect(container.querySelector(".skeleton-group")).toHaveClass(
			"custom-group",
		);
	});
});
