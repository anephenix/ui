import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import Divider from "./Divider.svelte";

describe("Divider", () => {
	test("renders an hr element for the default horizontal divider", () => {
		const { container } = render(Divider);
		expect(container.querySelector("hr")).toBeInTheDocument();
	});

	test("horizontal hr has the implicit separator role", () => {
		render(Divider);
		expect(screen.getByRole("separator")).toBeInTheDocument();
	});

	test("defaults to horizontal orientation class", () => {
		const { container } = render(Divider);
		expect(container.firstElementChild).toHaveClass("divider-horizontal");
	});

	test("defaults to solid variant class", () => {
		const { container } = render(Divider);
		expect(container.firstElementChild).toHaveClass("divider-solid");
	});

	test("renders a div for vertical orientation", () => {
		const { container } = render(Divider, {
			props: { orientation: "vertical" },
		});
		expect(container.querySelector("div")).toBeInTheDocument();
	});

	test("applies the vertical orientation class", () => {
		const { container } = render(Divider, {
			props: { orientation: "vertical" },
		});
		expect(container.firstElementChild).toHaveClass("divider-vertical");
	});

	test("renders a div when a label is provided", () => {
		const { container } = render(Divider, { props: { label: "or" } });
		expect(container.querySelector("div")).toBeInTheDocument();
	});

	test("applies the dashed variant class", () => {
		const { container } = render(Divider, { props: { variant: "dashed" } });
		expect(container.firstElementChild).toHaveClass("divider-dashed");
	});

	test("applies the dotted variant class", () => {
		const { container } = render(Divider, { props: { variant: "dotted" } });
		expect(container.firstElementChild).toHaveClass("divider-dotted");
	});

	test("renders the label text when provided", () => {
		render(Divider, { props: { label: "or" } });
		expect(screen.getByText("or")).toBeInTheDocument();
	});

	test("does not render a label element when label is omitted", () => {
		const { container } = render(Divider);
		expect(container.querySelector(".divider-label")).not.toBeInTheDocument();
	});

	test("applies an additional class to the wrapper", () => {
		const { container } = render(Divider, { props: { class: "my-divider" } });
		expect(container.firstElementChild).toHaveClass("my-divider");
	});

	test("always has the base divider class", () => {
		const { container } = render(Divider);
		expect(container.firstElementChild).toHaveClass("divider");
	});
});
