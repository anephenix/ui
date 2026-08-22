import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import Badge from "./Badge.svelte";

function textSnippet(text: string | number) {
	return createRawSnippet(() => ({
		render: () => `<span>${text}</span>`,
	}));
}

describe("Badge", () => {
	test("renders the children", () => {
		render(Badge, { props: { children: textSnippet("Active") } });
		expect(screen.getByText("Active")).toBeInTheDocument();
	});

	test("renders a number as children", () => {
		render(Badge, { props: { children: textSnippet(42) } });
		expect(screen.getByText("42")).toBeInTheDocument();
	});

	test("renders as a span element", () => {
		const { container } = render(Badge, {
			props: { children: textSnippet("Label") },
		});
		expect(container.firstChild).toBeInstanceOf(HTMLSpanElement);
	});

	test("defaults to the default variant", () => {
		const { container } = render(Badge, {
			props: { children: textSnippet("Label") },
		});
		expect(container.firstChild).toHaveClass("badge-default");
	});

	test("defaults to the md size", () => {
		const { container } = render(Badge, {
			props: { children: textSnippet("Label") },
		});
		expect(container.firstChild).toHaveClass("badge-md");
	});

	test("applies the correct variant class", () => {
		const { container } = render(Badge, {
			props: { variant: "success", children: textSnippet("Success") },
		});
		expect(container.firstChild).toHaveClass("badge-success");
	});

	test("applies the correct size class", () => {
		const { container } = render(Badge, {
			props: { size: "lg", children: textSnippet("Large") },
		});
		expect(container.firstChild).toHaveClass("badge-lg");
	});

	test("applies an additional class", () => {
		const { container } = render(Badge, {
			props: { class: "custom-badge", children: textSnippet("Label") },
		});
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
		const { container } = render(Badge, {
			props: { variant, children: textSnippet(variant) },
		});
		expect(container.firstChild).toHaveClass(`badge-${variant}`);
	});

	test.each(["sm", "md", "lg"])("renders the %s size without error", (size) => {
		const { container } = render(Badge, {
			props: { size, children: textSnippet("Label") },
		});
		expect(container.firstChild).toHaveClass(`badge-${size}`);
	});
});
