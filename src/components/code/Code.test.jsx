import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import copy from "clipboard-copy";
import Code from "./Code";

vi.mock("clipboard-copy");

describe("Code", () => {
	const code = `const a = 1;\nconst b = 2;`;
	const title = "Sample Code";
	const language = "javascript";

	test("renders the Code component with title and copy button", () => {
		render(<Code title={title} code={code} language={language} />);
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText("Copy")).toBeInTheDocument();
	});

	test("copies code to clipboard when Copy button is clicked", () => {
		render(<Code title={title} code={code} language={language} />);
		fireEvent.click(screen.getByText("Copy"));
		expect(copy).toHaveBeenCalledWith(code);
	});

	test("renders the correct number of line numbers", () => {
		const { container } = render(
			<Code title={title} code={code} language={language} />,
		);
		const lineNumbers = container.querySelectorAll(".code-line-number");
		expect(lineNumbers.length).toBe(2);
		expect(lineNumbers[0].textContent.trim()).toBe("1");
		expect(lineNumbers[1].textContent.trim()).toBe("2");
	});

	test("line numbers are in a separate element from the code", () => {
		const { container } = render(
			<Code title={title} code={code} language={language} />,
		);
		const lineNumbersDiv = container.querySelector(".code-line-numbers");
		const codeEl = container.querySelector("pre");
		expect(lineNumbersDiv).toBeInTheDocument();
		expect(codeEl).toBeInTheDocument();
		expect(lineNumbersDiv.contains(codeEl)).toBe(false);
	});

	test("renders the code content", () => {
		const { container } = render(
			<Code title={title} code={code} language={language} />,
		);
		expect(container.querySelector("pre")).toBeInTheDocument();
		expect(container.querySelector("code")).toBeInTheDocument();
	});

	test("applies the given language", () => {
		const { container } = render(
			<Code title={title} code={code} language="css" />,
		);
		expect(container.querySelector(".language-css")).toBeInTheDocument();
	});
});
