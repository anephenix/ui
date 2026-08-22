import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import Skeleton from "./Skeleton.svelte";

describe("Skeleton", () => {
	test("renders a single skeleton element by default", () => {
		const { container } = render(Skeleton);
		expect(container.querySelectorAll(".skeleton")).toHaveLength(1);
	});

	test("has aria-hidden on the skeleton element", () => {
		const { container } = render(Skeleton);
		expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
	});

	test("applies the default width as a style", () => {
		const { container } = render(Skeleton);
		expect(container.firstElementChild).toHaveStyle({ width: "100%" });
	});

	test("applies the default height as a style", () => {
		const { container } = render(Skeleton);
		expect(container.firstElementChild).toHaveStyle({ height: "16px" });
	});

	test("applies a string width", () => {
		const { container } = render(Skeleton, { props: { width: "50%" } });
		expect(container.firstElementChild).toHaveStyle({ width: "50%" });
	});

	test("converts a numeric width to px", () => {
		const { container } = render(Skeleton, { props: { width: 200 } });
		expect(container.firstElementChild).toHaveStyle({ width: "200px" });
	});

	test("converts a numeric height to px", () => {
		const { container } = render(Skeleton, { props: { height: 40 } });
		expect(container.firstElementChild).toHaveStyle({ height: "40px" });
	});

	test("applies a custom borderRadius", () => {
		const { container } = render(Skeleton, { props: { borderRadius: "50%" } });
		expect(container.firstElementChild).toHaveStyle({ borderRadius: "50%" });
	});

	test("applies an additional class", () => {
		const { container } = render(Skeleton, {
			props: { class: "custom-skeleton" },
		});
		expect(container.firstElementChild).toHaveClass(
			"skeleton",
			"custom-skeleton",
		);
	});

	test("renders multiple skeleton lines when lines > 1", () => {
		const { container } = render(Skeleton, { props: { lines: 3 } });
		expect(container.querySelectorAll(".skeleton")).toHaveLength(3);
	});

	test("wraps multiple lines in a skeleton-group element", () => {
		const { container } = render(Skeleton, { props: { lines: 3 } });
		expect(container.querySelector(".skeleton-group")).toBeInTheDocument();
	});

	test("the last line in a multi-line skeleton is 70% wide", () => {
		const { container } = render(Skeleton, {
			props: { lines: 3, width: "100%" },
		});
		const lines = container.querySelectorAll(".skeleton");
		expect(lines[lines.length - 1]).toHaveStyle({ width: "70%" });
	});

	test("non-last lines use the specified width", () => {
		const { container } = render(Skeleton, {
			props: { lines: 3, width: "100%" },
		});
		const lines = container.querySelectorAll(".skeleton");
		expect(lines[0]).toHaveStyle({ width: "100%" });
		expect(lines[1]).toHaveStyle({ width: "100%" });
	});

	test("applies class to the wrapper when lines > 1", () => {
		const { container } = render(Skeleton, {
			props: { lines: 3, class: "custom-group" },
		});
		expect(container.querySelector(".skeleton-group")).toHaveClass(
			"custom-group",
		);
	});
});
