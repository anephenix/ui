import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import Pagination from "./Pagination.svelte";

describe("Pagination", () => {
	test("returns null when totalPages is less than 2", () => {
		const { container } = render(Pagination, {
			props: { currentPage: 1, totalPages: 1, onPageChange: () => {} },
		});
		expect(container.firstElementChild).toBeNull();
	});

	test("renders page number buttons", () => {
		render(Pagination, {
			props: { currentPage: 1, totalPages: 5, onPageChange: () => {} },
		});
		expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
	});

	test("marks the current page with the active class", () => {
		render(Pagination, {
			props: { currentPage: 3, totalPages: 5, onPageChange: () => {} },
		});
		expect(screen.getByRole("button", { name: "3" })).toHaveClass(
			"pagination-page-active",
		);
	});

	test("sets aria-current on the active page button", () => {
		render(Pagination, {
			props: { currentPage: 2, totalPages: 5, onPageChange: () => {} },
		});
		expect(screen.getByRole("button", { name: "2" })).toHaveAttribute(
			"aria-current",
			"page",
		);
	});

	test("inactive pages do not have aria-current", () => {
		render(Pagination, {
			props: { currentPage: 1, totalPages: 5, onPageChange: () => {} },
		});
		expect(screen.getByRole("button", { name: "3" })).not.toHaveAttribute(
			"aria-current",
		);
	});

	test("previous button is disabled on page 1", () => {
		render(Pagination, {
			props: { currentPage: 1, totalPages: 5, onPageChange: () => {} },
		});
		expect(
			screen.getByRole("button", { name: "Previous page" }),
		).toBeDisabled();
	});

	test("next button is disabled on the last page", () => {
		render(Pagination, {
			props: { currentPage: 5, totalPages: 5, onPageChange: () => {} },
		});
		expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
	});

	test("first button is disabled on page 1", () => {
		render(Pagination, {
			props: { currentPage: 1, totalPages: 5, onPageChange: () => {} },
		});
		expect(screen.getByRole("button", { name: "First page" })).toBeDisabled();
	});

	test("last button is disabled on the last page", () => {
		render(Pagination, {
			props: { currentPage: 5, totalPages: 5, onPageChange: () => {} },
		});
		expect(screen.getByRole("button", { name: "Last page" })).toBeDisabled();
	});

	test("calls onPageChange with the correct page when a page button is clicked", () => {
		const handleChange = vi.fn();
		render(Pagination, {
			props: { currentPage: 1, totalPages: 5, onPageChange: handleChange },
		});
		fireEvent.click(screen.getByRole("button", { name: "3" }));
		expect(handleChange).toHaveBeenCalledWith(3);
	});

	test("calls onPageChange with currentPage - 1 when previous is clicked", () => {
		const handleChange = vi.fn();
		render(Pagination, {
			props: { currentPage: 3, totalPages: 5, onPageChange: handleChange },
		});
		fireEvent.click(screen.getByRole("button", { name: "Previous page" }));
		expect(handleChange).toHaveBeenCalledWith(2);
	});

	test("calls onPageChange with currentPage + 1 when next is clicked", () => {
		const handleChange = vi.fn();
		render(Pagination, {
			props: { currentPage: 3, totalPages: 5, onPageChange: handleChange },
		});
		fireEvent.click(screen.getByRole("button", { name: "Next page" }));
		expect(handleChange).toHaveBeenCalledWith(4);
	});

	test("calls onPageChange with 1 when first button is clicked", () => {
		const handleChange = vi.fn();
		render(Pagination, {
			props: { currentPage: 4, totalPages: 5, onPageChange: handleChange },
		});
		fireEvent.click(screen.getByRole("button", { name: "First page" }));
		expect(handleChange).toHaveBeenCalledWith(1);
	});

	test("calls onPageChange with totalPages when last button is clicked", () => {
		const handleChange = vi.fn();
		render(Pagination, {
			props: { currentPage: 2, totalPages: 5, onPageChange: handleChange },
		});
		fireEvent.click(screen.getByRole("button", { name: "Last page" }));
		expect(handleChange).toHaveBeenCalledWith(5);
	});

	test("hides first and last buttons when showFirstLast is false", () => {
		render(Pagination, {
			props: {
				currentPage: 3,
				totalPages: 5,
				onPageChange: () => {},
				showFirstLast: false,
			},
		});
		expect(
			screen.queryByRole("button", { name: "First page" }),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole("button", { name: "Last page" }),
		).not.toBeInTheDocument();
	});

	test("shows ellipsis when totalPages is large and current page is in the middle", () => {
		render(Pagination, {
			props: { currentPage: 10, totalPages: 20, onPageChange: () => {} },
		});
		const ellipses = screen.getAllByText("…");
		expect(ellipses.length).toBeGreaterThanOrEqual(1);
	});

	test("does not show ellipsis when totalPages is small", () => {
		render(Pagination, {
			props: { currentPage: 3, totalPages: 5, onPageChange: () => {} },
		});
		expect(screen.queryByText("…")).not.toBeInTheDocument();
	});

	test("applies an additional class to the nav", () => {
		const { container } = render(Pagination, {
			props: {
				currentPage: 1,
				totalPages: 5,
				onPageChange: () => {},
				class: "my-pagination",
			},
		});
		expect(container.firstElementChild).toHaveClass(
			"pagination",
			"my-pagination",
		);
	});

	test("renders a nav element with aria-label Pagination", () => {
		render(Pagination, {
			props: { currentPage: 1, totalPages: 5, onPageChange: () => {} },
		});
		expect(
			screen.getByRole("navigation", { name: "Pagination" }),
		).toBeInTheDocument();
	});
});
