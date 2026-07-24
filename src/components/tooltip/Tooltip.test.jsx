import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Tooltip from "./Tooltip";

describe("Tooltip", () => {
	test("renders the children", () => {
		render(
			<Tooltip content="Save this item">
				<button type="button">Save</button>
			</Tooltip>,
		);
		expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
	});

	test("tooltip element is always present in the DOM", () => {
		render(
			<Tooltip content="Save this item">
				<button type="button">Save</button>
			</Tooltip>,
		);
		expect(screen.getByRole("tooltip")).toBeInTheDocument();
	});

	test("tooltip has the correct text content", () => {
		render(
			<Tooltip content="Helpful hint">
				<button type="button">Action</button>
			</Tooltip>,
		);
		expect(screen.getByRole("tooltip")).toHaveTextContent("Helpful hint");
	});

	test("applies the correct position class", () => {
		render(
			<Tooltip content="Hint" position="bottom">
				<button type="button">Action</button>
			</Tooltip>,
		);
		expect(screen.getByRole("tooltip")).toHaveClass("tooltip-bottom");
	});

	test("defaults to the top position", () => {
		render(
			<Tooltip content="Hint">
				<button type="button">Action</button>
			</Tooltip>,
		);
		expect(screen.getByRole("tooltip")).toHaveClass("tooltip-top");
	});

	test("applies an additional className to the tooltip", () => {
		render(
			<Tooltip content="Hint" className="custom-tip">
				<button type="button">Action</button>
			</Tooltip>,
		);
		expect(screen.getByRole("tooltip")).toHaveClass("tooltip", "custom-tip");
	});

	test.each(["top", "bottom", "left", "right"])(
		"renders the %s position without error",
		(position) => {
			render(
				<Tooltip content="Hint" position={position}>
					<button type="button">Action</button>
				</Tooltip>,
			);
			expect(screen.getByRole("tooltip")).toHaveClass(`tooltip-${position}`);
		},
	);

	test("renders rich content in the tooltip", () => {
		render(
			<Tooltip content={<strong>Bold hint</strong>}>
				<button type="button">Action</button>
			</Tooltip>,
		);
		expect(screen.getByText("Bold hint")).toBeInTheDocument();
	});

	test("wrapper has the tooltip-wrapper class", () => {
		const { container } = render(
			<Tooltip content="Hint">
				<button type="button">Action</button>
			</Tooltip>,
		);
		expect(container.querySelector(".tooltip-wrapper")).toBeInTheDocument();
	});
});
