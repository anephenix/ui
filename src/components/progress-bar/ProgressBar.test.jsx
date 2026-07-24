import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
	test("renders the progressbar role", () => {
		render(<ProgressBar value={50} />);
		expect(screen.getByRole("progressbar")).toBeInTheDocument();
	});

	test("sets the fill width to the correct percentage", () => {
		const { container } = render(<ProgressBar value={75} />);
		const fill = container.querySelector(".progress-bar-fill");
		expect(fill).toHaveStyle({ width: "75%" });
	});

	test("clamps value at 100% when value exceeds max", () => {
		const { container } = render(<ProgressBar value={150} max={100} />);
		const fill = container.querySelector(".progress-bar-fill");
		expect(fill).toHaveStyle({ width: "100%" });
	});

	test("clamps value at 0% when value is negative", () => {
		const { container } = render(<ProgressBar value={-10} />);
		const fill = container.querySelector(".progress-bar-fill");
		expect(fill).toHaveStyle({ width: "0%" });
	});

	test("respects a custom max value", () => {
		const { container } = render(<ProgressBar value={1} max={4} />);
		const fill = container.querySelector(".progress-bar-fill");
		expect(fill).toHaveStyle({ width: "25%" });
	});

	test("sets aria-valuenow to the given value", () => {
		render(<ProgressBar value={40} />);
		expect(screen.getByRole("progressbar")).toHaveAttribute(
			"aria-valuenow",
			"40",
		);
	});

	test("sets aria-valuemin and aria-valuemax", () => {
		render(<ProgressBar value={50} max={200} />);
		const bar = screen.getByRole("progressbar");
		expect(bar).toHaveAttribute("aria-valuemin", "0");
		expect(bar).toHaveAttribute("aria-valuemax", "200");
	});

	test("defaults aria-label to 'Progress'", () => {
		render(<ProgressBar value={50} />);
		expect(screen.getByRole("progressbar")).toHaveAttribute(
			"aria-label",
			"Progress",
		);
	});

	test("uses the label prop as aria-label", () => {
		render(<ProgressBar value={50} label="Upload progress" />);
		expect(screen.getByRole("progressbar")).toHaveAttribute(
			"aria-label",
			"Upload progress",
		);
	});

	test("renders the label text when provided", () => {
		render(<ProgressBar value={50} label="Uploading..." />);
		expect(screen.getByText("Uploading...")).toBeInTheDocument();
	});

	test("does not render a header when label and showValue are both absent", () => {
		const { container } = render(<ProgressBar value={50} />);
		expect(
			container.querySelector(".progress-bar-header"),
		).not.toBeInTheDocument();
	});

	test("shows the percentage value when showValue is true", () => {
		render(<ProgressBar value={60} showValue={true} />);
		expect(screen.getByText("60%")).toBeInTheDocument();
	});

	test("applies the correct variant class to the fill", () => {
		const { container } = render(<ProgressBar value={50} variant="success" />);
		expect(container.querySelector(".progress-bar-fill")).toHaveClass(
			"progress-bar-success",
		);
	});

	test("applies the correct size class to the track", () => {
		const { container } = render(<ProgressBar value={50} size="lg" />);
		expect(container.querySelector(".progress-bar")).toHaveClass(
			"progress-bar-lg",
		);
	});

	test("applies the indeterminate class and omits aria-valuenow when indeterminate", () => {
		const { container } = render(<ProgressBar indeterminate={true} />);
		expect(container.querySelector(".progress-bar-fill")).toHaveClass(
			"progress-bar-indeterminate",
		);
		expect(screen.getByRole("progressbar")).not.toHaveAttribute(
			"aria-valuenow",
		);
	});

	test("does not show value text when indeterminate even if showValue is true", () => {
		const { container } = render(
			<ProgressBar indeterminate={true} showValue={true} />,
		);
		expect(
			container.querySelector(".progress-bar-value"),
		).not.toBeInTheDocument();
	});

	test("applies an additional className to the wrapper", () => {
		const { container } = render(<ProgressBar value={50} className="my-bar" />);
		expect(container.firstChild).toHaveClass("my-bar");
	});

	test("defaults to the md size", () => {
		const { container } = render(<ProgressBar value={50} />);
		expect(container.querySelector(".progress-bar")).toHaveClass(
			"progress-bar-md",
		);
	});

	test("defaults to the default variant", () => {
		const { container } = render(<ProgressBar value={50} />);
		expect(container.querySelector(".progress-bar-fill")).toHaveClass(
			"progress-bar-default",
		);
	});
});
