import { Button, Code, Modal } from "@anephenix/ui";
import { useState } from "react";
import DocsLayout from "../DocsLayout.jsx";
import { LivePreview } from "./LivePreview.jsx";
import { PropTable } from "./shared.jsx";

const usageSnippet = `const [isOpen, setIsOpen] = useState(false);

<Button
  text="Open modal"
  className="button theme-default primary"
  onClick={() => setIsOpen(true)}
/>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm action"
  footer={
    <>
      <Button
        text="Cancel"
        className="button theme-default secondary alternate"
        onClick={() => setIsOpen(false)}
      />
      <Button
        text="Confirm"
        className="button theme-default primary"
        onClick={() => setIsOpen(false)}
      />
    </>
  }
>
  <p>Are you sure you want to do this?</p>
</Modal>`;

export default function ModalPage({ currentPath }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Modal</h1>
				<p>
					A dialog overlay built on the native HTML <code>&lt;dialog&gt;</code>{" "}
					element. Traps focus automatically, closes on Escape, and supports an
					optional footer for action buttons. Closes when the backdrop is
					clicked.
				</p>

				<h2>Import</h2>
				<Code code={"import { Modal } from '@anephenix/ui';"} language="jsx" />

				<h2>Usage</h2>
				<Code code={usageSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["isOpen", "bool", "Controls whether the modal is shown"],
						[
							"onClose",
							"function",
							"Called when the user dismisses the modal (close button, backdrop click, or Escape key)",
						],
						["title", "string", "Heading shown in the modal header"],
						["children", "node", "Content rendered in the modal body"],
						[
							"footer",
							"node",
							"Optional footer content — typically action buttons",
						],
					]}
				/>

				<h2>Example</h2>
				<LivePreview component="Modal" />
				<div className="docs-example">
					<Button
						text="Open modal"
						className="button theme-default primary"
						onClick={() => setIsOpen(true)}
					/>
					<Modal
						isOpen={isOpen}
						onClose={() => setIsOpen(false)}
						title="Confirm action"
						footer={
							<>
								<Button
									text="Cancel"
									className="button theme-default secondary alternate"
									onClick={() => setIsOpen(false)}
								/>
								<Button
									text="Confirm"
									className="button theme-default primary"
									onClick={() => setIsOpen(false)}
								/>
							</>
						}
					>
						<p>Are you sure you want to do this?</p>
					</Modal>
				</div>
			</div>
		</DocsLayout>
	);
}
