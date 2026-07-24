import { Code } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const exampleSnippet = `import { Page, NavBar, Footer } from '@anephenix/ui';

export default function Layout({ children }) {
  return (
    <Page>
      <NavBar logo={logo} links={links} loggedIn={false} Link={Link} />
      <main>{children}</main>
      <Footer leftSection={left} rightSection={right} />
    </Page>
  );
}`;

export default function PageComponentPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Page</h1>
				<p>
					A full-page wrapper <code>&lt;div&gt;</code> with the{" "}
					<code>page</code> CSS class. It sets the layout to a full-width
					column, so all page sections stack vertically. Typically the outermost
					container in your app.
				</p>

				<h2>Import</h2>
				<Code code={"import { Page } from '@anephenix/ui';"} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["children", "node", "Content to render inside the page wrapper"],
					]}
				/>

				<h2>Usage</h2>
				<Code code={exampleSnippet} language="jsx" />
			</div>
		</DocsLayout>
	);
}
