import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./Modal";

beforeAll(() => {
	HTMLDialogElement.prototype.showModal = vi.fn(function () {
		this.open = true;
	});
	HTMLDialogElement.prototype.close = vi.fn(function () {
		this.open = false;
	});
});

describe("Modal", () => {
	test("renders the title when open", () => {
		render(<Modal isOpen={true} title="Test Modal" onClose={() => {}} />);
		expect(screen.getByText("Test Modal")).toBeInTheDocument();
	});

	test("renders children in the modal body", () => {
		render(
			<Modal isOpen={true} title="Test Modal" onClose={() => {}}>
				<p>Modal content</p>
			</Modal>,
		);
		expect(screen.getByText("Modal content")).toBeInTheDocument();
	});

	test("calls showModal when isOpen is true", () => {
		render(<Modal isOpen={true} title="Test Modal" onClose={() => {}} />);
		expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
	});

	test("calls close when isOpen transitions to false", () => {
		const { rerender } = render(
			<Modal isOpen={true} title="Test Modal" onClose={() => {}} />,
		);
		rerender(<Modal isOpen={false} title="Test Modal" onClose={() => {}} />);
		expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
	});

	test("calls onClose when the close button is clicked", () => {
		const handleClose = vi.fn();
		render(<Modal isOpen={true} title="Test Modal" onClose={handleClose} />);
		fireEvent.click(screen.getByRole("button", { name: /close/i }));
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	test("renders the footer when provided", () => {
		render(
			<Modal
				isOpen={true}
				title="Test Modal"
				onClose={() => {}}
				footer={<button type="button">Confirm</button>}
			/>,
		);
		expect(screen.getByText("Confirm")).toBeInTheDocument();
	});

	test("does not render the footer element when footer prop is omitted", () => {
		const { container } = render(
			<Modal isOpen={true} title="Test Modal" onClose={() => {}} />,
		);
		expect(container.querySelector(".modal-footer")).not.toBeInTheDocument();
	});

	test("calls onClose when the backdrop (dialog element) is clicked", () => {
		const handleClose = vi.fn();
		const { container } = render(
			<Modal isOpen={true} title="Test Modal" onClose={handleClose} />,
		);
		const dialog = container.querySelector("dialog");
		fireEvent.click(dialog, { target: dialog });
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	test("does not call onClose when content inside the modal is clicked", () => {
		const handleClose = vi.fn();
		render(
			<Modal isOpen={true} title="Test Modal" onClose={handleClose}>
				<p>Inner content</p>
			</Modal>,
		);
		fireEvent.click(screen.getByText("Inner content"));
		expect(handleClose).not.toHaveBeenCalled();
	});

	test("renders a close button with an accessible label", () => {
		render(<Modal isOpen={true} title="Test Modal" onClose={() => {}} />);
		expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
	});
});
