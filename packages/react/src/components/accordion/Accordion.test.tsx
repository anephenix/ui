import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Accordion from "./Accordion";

const items = [
	{
		id: "one",
		title: "What is this?",
		content: <p>This is the first answer.</p>,
	},
	{
		id: "two",
		title: "How does it work?",
		content: <p>This is the second answer.</p>,
	},
	{
		id: "three",
		title: "Is it free?",
		content: <p>This is the third answer.</p>,
	},
];

describe("Accordion", () => {
	test("renders all item titles", () => {
		render(<Accordion items={items} />);
		expect(screen.getByText("What is this?")).toBeInTheDocument();
		expect(screen.getByText("How does it work?")).toBeInTheDocument();
		expect(screen.getByText("Is it free?")).toBeInTheDocument();
	});

	test("all panels are closed by default", () => {
		render(<Accordion items={items} />);
		for (const { id } of items) {
			expect(document.getElementById(`panel-${id}`)).not.toHaveClass(
				"accordion-panel-open",
			);
		}
	});

	test("clicking a trigger opens its panel", () => {
		render(<Accordion items={items} />);
		fireEvent.click(screen.getByRole("button", { name: /what is this/i }));
		expect(document.getElementById("panel-one")).toHaveClass(
			"accordion-panel-open",
		);
	});

	test("clicking an open trigger closes it", () => {
		render(<Accordion items={items} defaultOpen="one" />);
		fireEvent.click(screen.getByRole("button", { name: /what is this/i }));
		expect(document.getElementById("panel-one")).not.toHaveClass(
			"accordion-panel-open",
		);
	});

	test("trigger has aria-expanded false when closed", () => {
		render(<Accordion items={items} />);
		expect(
			screen.getByRole("button", { name: /what is this/i }),
		).toHaveAttribute("aria-expanded", "false");
	});

	test("trigger has aria-expanded true when open", () => {
		render(<Accordion items={items} defaultOpen="one" />);
		expect(
			screen.getByRole("button", { name: /what is this/i }),
		).toHaveAttribute("aria-expanded", "true");
	});

	test("defaultOpen opens that item initially", () => {
		render(<Accordion items={items} defaultOpen="two" />);
		expect(document.getElementById("panel-two")).toHaveClass(
			"accordion-panel-open",
		);
		expect(document.getElementById("panel-one")).not.toHaveClass(
			"accordion-panel-open",
		);
	});

	test("opening one item closes the previously open item by default", () => {
		render(<Accordion items={items} defaultOpen="one" />);
		fireEvent.click(screen.getByRole("button", { name: /how does it work/i }));
		expect(document.getElementById("panel-two")).toHaveClass(
			"accordion-panel-open",
		);
		expect(document.getElementById("panel-one")).not.toHaveClass(
			"accordion-panel-open",
		);
	});

	test("allowMultiple lets multiple items be open simultaneously", () => {
		render(<Accordion items={items} allowMultiple defaultOpen="one" />);
		fireEvent.click(screen.getByRole("button", { name: /how does it work/i }));
		expect(document.getElementById("panel-one")).toHaveClass(
			"accordion-panel-open",
		);
		expect(document.getElementById("panel-two")).toHaveClass(
			"accordion-panel-open",
		);
	});

	test("calls onChange with the array of open ids when toggled", () => {
		const handleChange = vi.fn();
		render(<Accordion items={items} onChange={handleChange} />);
		fireEvent.click(screen.getByRole("button", { name: /what is this/i }));
		expect(handleChange).toHaveBeenCalledWith(["one"]);
	});

	test("onChange is called with an empty array when the last open item is closed", () => {
		const handleChange = vi.fn();
		render(
			<Accordion items={items} defaultOpen="one" onChange={handleChange} />,
		);
		fireEvent.click(screen.getByRole("button", { name: /what is this/i }));
		expect(handleChange).toHaveBeenCalledWith([]);
	});

	test("trigger aria-controls points to the correct panel id", () => {
		render(<Accordion items={items} />);
		expect(
			screen.getByRole("button", { name: /what is this/i }),
		).toHaveAttribute("aria-controls", "panel-one");
	});

	test("panel aria-labelledby points to the correct trigger id", () => {
		render(<Accordion items={items} />);
		expect(document.getElementById("panel-one")).toHaveAttribute(
			"aria-labelledby",
			"trigger-one",
		);
	});

	test("applies an additional className to the wrapper", () => {
		const { container } = render(
			<Accordion items={items} className="faq-accordion" />,
		);
		expect(container.firstChild).toHaveClass("accordion", "faq-accordion");
	});
});
