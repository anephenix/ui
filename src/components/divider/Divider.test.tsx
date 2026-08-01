import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Divider from "./Divider";

describe("Divider", () => {
	test("renders an hr element for the default horizontal divider", () => {
		const { container } = render(<Divider />);
		expect(container.querySelector("hr")).toBeInTheDocument();
	});

	test("horizontal hr has the implicit separator role", () => {
		render(<Divider />);
		expect(screen.getByRole("separator")).toBeInTheDocument();
	});

	test("defaults to horizontal orientation class", () => {
		const { container } = render(<Divider />);
		expect(container.firstChild).toHaveClass("divider-horizontal");
	});

	test("defaults to solid variant class", () => {
		const { container } = render(<Divider />);
		expect(container.firstChild).toHaveClass("divider-solid");
	});

	test("renders a div for vertical orientation", () => {
		const { container } = render(<Divider orientation="vertical" />);
		expect(container.querySelector("div")).toBeInTheDocument();
	});

	test("applies the vertical orientation class", () => {
		const { container } = render(<Divider orientation="vertical" />);
		expect(container.firstChild).toHaveClass("divider-vertical");
	});

	test("renders a div when a label is provided", () => {
		const { container } = render(<Divider label="or" />);
		expect(container.querySelector("div")).toBeInTheDocument();
	});

	test("applies the dashed variant class", () => {
		const { container } = render(<Divider variant="dashed" />);
		expect(container.firstChild).toHaveClass("divider-dashed");
	});

	test("applies the dotted variant class", () => {
		const { container } = render(<Divider variant="dotted" />);
		expect(container.firstChild).toHaveClass("divider-dotted");
	});

	test("renders the label text when provided", () => {
		render(<Divider label="or" />);
		expect(screen.getByText("or")).toBeInTheDocument();
	});

	test("does not render a label element when label is omitted", () => {
		const { container } = render(<Divider />);
		expect(container.querySelector(".divider-label")).not.toBeInTheDocument();
	});

	test("applies an additional className to the wrapper", () => {
		const { container } = render(<Divider className="my-divider" />);
		expect(container.firstChild).toHaveClass("my-divider");
	});

	test("always has the base divider class", () => {
		const { container } = render(<Divider />);
		expect(container.firstChild).toHaveClass("divider");
	});
});
