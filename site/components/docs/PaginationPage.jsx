import { useState } from "react";
import { Code, Pagination } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const usageSnippet = `const [page, setPage] = useState(1);

<Pagination
  currentPage={page}
  totalPages={20}
  onPageChange={setPage}
/>`;

export default function PaginationPage({ currentPath }) {
	const [page, setPage] = useState(1);
	const [multiPage, setMultiPage] = useState(10);

	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Pagination</h1>
				<p>
					A navigation component for moving through paged content. Always shows
					the first and last page; collapses distant page numbers into an
					ellipsis. Returns <code>null</code> when <code>totalPages</code> is
					less than 2.
				</p>

				<h2>Import</h2>
				<Code
					code={"import { Pagination } from '@anephenix/ui';"}
					language="jsx"
				/>

				<h2>Usage</h2>
				<Code code={usageSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["currentPage", "number", "The currently active page (1-based)"],
						["totalPages", "number", "Total number of pages"],
						[
							"onPageChange",
							"function",
							"Called with the new page number when any button is clicked",
						],
						[
							"siblingCount",
							"number",
							"Pages shown on each side of the current page. Defaults to 1",
						],
						[
							"showFirstLast",
							"bool",
							"Show First («) and Last (») buttons. Defaults to true",
						],
						["className", "string", "Optional additional CSS class on the nav"],
					]}
				/>

				<h2>Example</h2>

				<h3>Standard (5 pages)</h3>
				<div className="docs-example">
					<Pagination
						currentPage={page}
						totalPages={5}
						onPageChange={setPage}
					/>
					<p style={{ marginTop: "0.75rem", fontSize: "13px", opacity: 0.7 }}>
						Current page: {page}
					</p>
				</div>

				<h3>Large page count with ellipsis (20 pages)</h3>
				<div className="docs-example">
					<Pagination
						currentPage={multiPage}
						totalPages={20}
						onPageChange={setMultiPage}
					/>
					<p style={{ marginTop: "0.75rem", fontSize: "13px", opacity: 0.7 }}>
						Current page: {multiPage}
					</p>
				</div>

				<h3>Without first / last buttons</h3>
				<div className="docs-example">
					<Pagination
						currentPage={3}
						totalPages={10}
						onPageChange={() => {}}
						showFirstLast={false}
					/>
				</div>
			</div>
		</DocsLayout>
	);
}
