import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import copy from "clipboard-copy";
import Code from "./Code.svelte";

vi.mock("clipboard-copy");

describe("Code", () => {
	const code = "const a = 1;\nconst b = 2;";
	const title = "Sample Code";
	const language = "javascript";

	test("renders the Code component with title and copy button", () => {
		render(Code, { props: { title, code, language } });
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText("Copy")).toBeInTheDocument();
	});

	test("copies code to clipboard when Copy button is clicked", () => {
		render(Code, { props: { title, code, language } });
		fireEvent.click(screen.getByText("Copy"));
		expect(copy).toHaveBeenCalledWith(code);
	});

	test("renders the correct number of line numbers", () => {
		const { container } = render(Code, { props: { title, code, language } });
		const lineNumbers = container.querySelectorAll(".code-line-number");
		expect(lineNumbers.length).toBe(2);
		expect(lineNumbers[0].textContent?.trim()).toBe("1");
		expect(lineNumbers[1].textContent?.trim()).toBe("2");
	});

	test("line numbers are in a separate element from the code", () => {
		const { container } = render(Code, { props: { title, code, language } });
		const lineNumbersDiv = container.querySelector(".code-line-numbers");
		const codeEl = container.querySelector("pre");
		expect(lineNumbersDiv).toBeInTheDocument();
		expect(codeEl).toBeInTheDocument();
		expect(lineNumbersDiv?.contains(codeEl)).toBe(false);
	});

	test("renders the code content", () => {
		const { container } = render(Code, { props: { title, code, language } });
		expect(container.querySelector("pre")).toBeInTheDocument();
		expect(container.querySelector("code")).toBeInTheDocument();
		expect(container.querySelector("code")?.textContent).toBe(code);
	});

	test("applies the given language", () => {
		const { container } = render(Code, {
			props: { title, code, language: "css" },
		});
		expect(container.querySelector(".language-css")).toBeInTheDocument();
	});

	test("actually tokenizes a supported language, not just escapes it", () => {
		const { container } = render(Code, { props: { title, code, language } });
		const tokens = container.querySelectorAll("code .token");
		expect(tokens.length).toBeGreaterThan(0);
		expect(container.querySelector("code .token.keyword")).toHaveTextContent(
			"const",
		);
	});

	test("falls back to escaped plain text for an unregistered language, without executing markup", () => {
		const unsafeCode = "<img src=x onerror=alert(1)>";
		const { container } = render(Code, {
			props: { title, code: unsafeCode, language: "not-a-real-language" },
		});
		expect(container.querySelector("code .token")).not.toBeInTheDocument();
		expect(container.querySelector("code img")).not.toBeInTheDocument();
		expect(container.querySelector("code")?.textContent).toBe(unsafeCode);
	});
});
