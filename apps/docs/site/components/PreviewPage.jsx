import { useEffect, useState } from "react";

function CropTool({ viewport, componentName }) {
	const [active, setActive] = useState(false);
	const [dragging, setDragging] = useState(false);
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);
	const [clip, setClip] = useState(null);
	const [copied, setCopied] = useState(false);
	const [minimized, setMinimized] = useState(false);
	const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const update = () =>
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	const scaleX = windowSize.width ? viewport.width / windowSize.width : 1;
	const scaleY = windowSize.height ? viewport.height / windowSize.height : 1;
	const isScaled = Math.abs(scaleX - 1) > 0.01 || Math.abs(scaleY - 1) > 0.01;

	const toViewport = (cx, cy) => ({
		x: Math.round(cx * scaleX),
		y: Math.round(cy * scaleY),
	});

	const reset = () => {
		setClip(null);
		setStart(null);
		setEnd(null);
	};

	const handleMouseDown = (e) => {
		setStart({ x: e.clientX, y: e.clientY });
		setEnd({ x: e.clientX, y: e.clientY });
		setDragging(true);
		setClip(null);
	};

	const handleMouseMove = (e) => {
		if (!dragging) return;
		setEnd({ x: e.clientX, y: e.clientY });
	};

	const handleMouseUp = (e) => {
		if (!dragging) return;
		const endPos = { x: e.clientX, y: e.clientY };
		setDragging(false);
		setActive(false);
		const vpStart = toViewport(start.x, start.y);
		const vpEnd = toViewport(endPos.x, endPos.y);
		setClip({
			x: Math.min(vpStart.x, vpEnd.x),
			y: Math.min(vpStart.y, vpEnd.y),
			width: Math.abs(vpEnd.x - vpStart.x),
			height: Math.abs(vpEnd.y - vpStart.y),
		});
		setEnd(endPos);
	};

	const selBox =
		start && end
			? {
					left: Math.min(start.x, end.x),
					top: Math.min(start.y, end.y),
					width: Math.abs(end.x - start.x),
					height: Math.abs(end.y - start.y),
				}
			: null;

	const snippet = clip
		? `"${componentName}": {\n  "strategy": "clip",\n  "clip": { "x": ${clip.x}, "y": ${clip.y}, "width": ${clip.width}, "height": ${clip.height} }\n}`
		: null;

	const handleCopy = () => {
		if (!snippet) return;
		navigator.clipboard.writeText(snippet);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const panelStyle = {
		position: "fixed",
		bottom: "1rem",
		right: "1rem",
		zIndex: 9999,
		background: "#0d0f1c",
		color: "#c8c8d8",
		borderRadius: "8px",
		width: "300px",
		fontFamily: '"Menlo", "Monaco", monospace',
		fontSize: "11px",
		boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
		border: "1px solid rgba(255,255,255,0.1)",
		lineHeight: 1.6,
		overflow: "hidden",
	};

	const btnBase = {
		borderRadius: "4px",
		cursor: "pointer",
		fontFamily: "inherit",
		fontSize: "11px",
		fontWeight: 600,
	};

	return (
		<>
			{active && (
				<div
					role="application"
					aria-label="Drag to draw a crop area"
					style={{
						position: "fixed",
						inset: 0,
						cursor: "crosshair",
						zIndex: 9998,
						userSelect: "none",
					}}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
				>
					{selBox && (
						<div
							style={{
								position: "absolute",
								left: selBox.left,
								top: selBox.top,
								width: selBox.width,
								height: selBox.height,
								border: "2px solid #279ae1",
								background: "rgba(39, 154, 225, 0.15)",
								pointerEvents: "none",
							}}
						/>
					)}
				</div>
			)}

			<div style={panelStyle}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "0.6rem 0.75rem",
						background: "rgba(255,255,255,0.05)",
						borderBottom: minimized
							? "none"
							: "1px solid rgba(255,255,255,0.08)",
					}}
				>
					<span style={{ fontWeight: 700, color: "#7bccff" }}>
						Crop Tool
						{componentName && (
							<span style={{ color: "#8d95a5", marginLeft: "0.5rem" }}>
								— {componentName}
							</span>
						)}
					</span>
					<button
						type="button"
						onClick={() => setMinimized((m) => !m)}
						style={{
							...btnBase,
							background: "none",
							border: "none",
							color: "#8d95a5",
							fontSize: "13px",
							padding: "0 0.25rem",
						}}
					>
						{minimized ? "▲" : "▼"}
					</button>
				</div>

				{!minimized && (
					<div style={{ padding: "0.75rem" }}>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "0.25rem",
								marginBottom: "0.75rem",
							}}
						>
							{[
								["viewport", `${viewport.width} × ${viewport.height}`, false],
								[
									"window",
									`${windowSize.width} × ${windowSize.height}`,
									isScaled,
								],
							].map(([label, value, warn]) => (
								<div key={label} style={{ color: "#8d95a5" }}>
									<div style={{ color: "#95e388" }}>{label}</div>
									<div style={{ color: warn ? "#ffc61a" : "#c8c8d8" }}>
										{value}
									</div>
								</div>
							))}
						</div>

						{isScaled && (
							<div
								style={{
									background: "rgba(255,198,26,0.08)",
									border: "1px solid rgba(255,198,26,0.25)",
									borderRadius: "4px",
									padding: "0.4rem 0.5rem",
									color: "#ffc61a",
									fontSize: "10px",
									marginBottom: "0.75rem",
								}}
							>
								Window ≠ viewport — coordinates will be scaled. Resize to{" "}
								{viewport.width} × {viewport.height} for exact values.
							</div>
						)}

						<div
							style={{
								display: "flex",
								gap: "0.5rem",
								marginBottom: clip ? "0.75rem" : 0,
							}}
						>
							<button
								type="button"
								onClick={() => {
									reset();
									setActive((a) => !a);
								}}
								style={{
									...btnBase,
									flex: 1,
									padding: "0.35rem",
									border: "none",
									background: active ? "#fd5548" : "#279ae1",
									color: "#fff",
								}}
							>
								{active ? "Cancel" : "Draw crop"}
							</button>
							{clip && (
								<button
									type="button"
									onClick={reset}
									style={{
										...btnBase,
										padding: "0.35rem 0.75rem",
										border: "1px solid rgba(255,255,255,0.2)",
										background: "transparent",
										color: "#c8c8d8",
									}}
								>
									Clear
								</button>
							)}
						</div>

						{clip && (
							<>
								<div
									style={{
										display: "grid",
										gridTemplateColumns: "1fr 1fr",
										gap: "0.25rem",
										marginBottom: "0.75rem",
									}}
								>
									{["x", "y", "width", "height"].map((k) => (
										<div
											key={k}
											style={{
												background: "rgba(255,255,255,0.05)",
												padding: "0.3rem 0.5rem",
												borderRadius: "3px",
											}}
										>
											<span style={{ color: "#7bccff" }}>{k}</span>: {clip[k]}
										</div>
									))}
								</div>
								<pre
									style={{
										background: "rgba(255,255,255,0.05)",
										padding: "0.5rem",
										borderRadius: "4px",
										margin: "0 0 0.5rem",
										overflowX: "auto",
										color: "#95e388",
										whiteSpace: "pre-wrap",
										wordBreak: "break-word",
										fontSize: "10px",
									}}
								>
									{snippet}
								</pre>
								<button
									type="button"
									onClick={handleCopy}
									style={{
										...btnBase,
										width: "100%",
										padding: "0.35rem",
										border: "none",
										background: copied ? "#69b65c" : "#279ae1",
										color: "#fff",
										transition: "background 0.2s",
									}}
								>
									{copied ? "✓ Copied!" : "Copy config snippet"}
								</button>
							</>
						)}
					</div>
				)}
			</div>
		</>
	);
}

import {
	Accordion,
	Alert,
	Avatar,
	Badge,
	Breadcrumb,
	Button,
	Card,
	Checkbox,
	Code,
	ComboBox,
	Divider,
	Dropdown,
	Footer,
	FormField,
	Hero,
	Input,
	Modal,
	NavBar,
	Pagination,
	Popover,
	ProgressBar,
	RadioButton,
	Select,
	Skeleton,
	Spinner,
	Switch,
	Table,
	Tabs,
	Terminal,
	Textarea,
	Toast,
	Tooltip,
} from "@anephenix/ui";

const Link = ({ href, children, ...props }) => (
	<a href={href} {...props}>
		{children}
	</a>
);

const tableColumns = [
	{ key: "name", header: "Name" },
	{ key: "role", header: "Role" },
	{ key: "status", header: "Status" },
];
const tableRows = [
	{ id: 1, name: "Alice Chen", role: "Engineer", status: "Active" },
	{ id: 2, name: "Bob Smith", role: "Designer", status: "Active" },
	{ id: 3, name: "Carol Park", role: "Manager", status: "Away" },
];

const previews = {
	Accordion: {
		wrapper: "preview-padded",
		render: () => (
			<Accordion
				items={[
					{
						id: "q1",
						title: "What is this component?",
						content: (
							<p style={{ margin: 0 }}>
								An accordion collapses and expands content sections.
							</p>
						),
					},
					{
						id: "q2",
						title: "How do I use it?",
						content: (
							<p style={{ margin: 0 }}>
								Pass an items array with id, title, and content.
							</p>
						),
					},
					{
						id: "q3",
						title: "Does it support multiple open panels?",
						content: (
							<p style={{ margin: 0 }}>
								Yes — set the allowMultiple prop to true.
							</p>
						),
					},
				]}
				defaultOpen="q1"
			/>
		),
	},

	Alert: {
		wrapper: "preview-padded",
		render: () => (
			<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
				<Alert variant="info" title="Information">
					Here is some useful information for you.
				</Alert>
				<Alert variant="success" title="Saved">
					Your changes have been saved successfully.
				</Alert>
				<Alert variant="warning">Your session will expire in 5 minutes.</Alert>
				<Alert variant="error" title="Error">
					Something went wrong. Please try again.
				</Alert>
			</div>
		),
	},

	Avatar: {
		wrapper: "preview-center",
		render: () => (
			<div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
				<Avatar name="Alice Brown" size="xl" />
				<Avatar name="Bob Smith" size="lg" />
				<Avatar name="Carol Park" size="md" />
				<Avatar size="sm" />
			</div>
		),
	},

	Badge: {
		wrapper: "preview-center",
		render: () => (
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "0.5rem",
					justifyContent: "center",
				}}
			>
				<Badge variant="default">Default</Badge>
				<Badge variant="primary">Primary</Badge>
				<Badge variant="success">Active</Badge>
				<Badge variant="warning">Pending</Badge>
				<Badge variant="error">Error</Badge>
				<Badge variant="info">Info</Badge>
				<Badge variant="secondary">Beta</Badge>
			</div>
		),
	},

	Breadcrumb: {
		wrapper: "preview-center",
		render: () => (
			<Breadcrumb
				items={[
					{ label: "Home", href: "/" },
					{ label: "Products", href: "/products" },
					{ label: "Laptops", href: "/products/laptops" },
					{ label: "MacBook Pro" },
				]}
			/>
		),
	},

	Button: {
		wrapper: "preview-center",
		render: () => (
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "0.75rem",
					justifyContent: "center",
				}}
			>
				<Button
					text="Primary"
					className="button theme-default primary"
					onClick={() => {}}
				/>
				<Button
					text="Secondary"
					className="button theme-default secondary"
					onClick={() => {}}
				/>
				<Button
					text="Tertiary"
					className="button theme-default tertiary"
					onClick={() => {}}
				/>
				<Button
					text="Alternate"
					className="button theme-default primary alternate"
					onClick={() => {}}
				/>
			</div>
		),
	},

	Card: {
		wrapper: "preview-center",
		render: () => (
			<div style={{ display: "flex", gap: "1rem" }}>
				<Card
					title="Getting started"
					subtitle="Up and running in minutes"
					footer={
						<Button
							text="Read docs"
							className="button theme-default primary"
							onClick={() => {}}
						/>
					}
				>
					<p style={{ margin: 0 }}>
						Build consistent UIs with a plain-CSS design system.
					</p>
				</Card>
				<Card title="Components" subtitle="30+ ready-made components">
					<p style={{ margin: 0 }}>
						Accessible, themeable, and zero runtime dependencies.
					</p>
				</Card>
			</div>
		),
	},

	Checkbox: {
		wrapper: "preview-center",
		render: () => (
			<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
				<Checkbox
					name="terms"
					label="I agree to the terms and conditions"
					defaultValue={true}
				/>
				<Checkbox
					name="newsletter"
					label="Subscribe to the newsletter"
					defaultValue={false}
				/>
				<Checkbox
					name="updates"
					label="Receive product updates"
					defaultValue={true}
				/>
			</div>
		),
	},

	Code: {
		wrapper: "preview-center",
		render: () => (
			<Code
				title="greet.js"
				code={`const greet = (name) => {\n  return \`Hello, \${name}!\`;\n};\n\ngreet('World');`}
				language="javascript"
			/>
		),
	},

	ComboBox: {
		wrapper: "preview-center",
		render: () => (
			<div style={{ width: "280px" }}>
				<ComboBox
					options={[
						{ value: "apple", label: "Apple" },
						{ value: "banana", label: "Banana" },
						{ value: "cherry", label: "Cherry" },
						{ value: "grape", label: "Grape" },
						{ value: "mango", label: "Mango" },
						{ value: "orange", label: "Orange" },
					]}
					placeholder="Search fruit..."
				/>
			</div>
		),
	},

	Divider: {
		wrapper: "preview-padded",
		render: () => (
			<div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
				<Divider />
				<Divider variant="dashed" />
				<Divider variant="dotted" />
				<Divider label="or continue with" />
			</div>
		),
	},

	Dropdown: {
		wrapper: "preview-center",
		render: () => (
			<Dropdown
				name="language"
				className=""
				options={[
					{ value: "js", text: "JavaScript" },
					{ value: "ts", text: "TypeScript" },
					{ value: "py", text: "Python" },
					{ value: "go", text: "Go" },
				]}
			/>
		),
	},

	Footer: {
		wrapper: "preview-bare",
		render: () => (
			<Footer
				leftSection={<span>&copy; 2026 Anephenix Ltd.</span>}
				rightSection={
					<div style={{ display: "flex", gap: "1rem" }}>
						<a href="/privacy">Privacy</a>
						<a href="/terms">Terms</a>
					</div>
				}
			/>
		),
	},

	FormField: {
		wrapper: "preview-center",
		render: () => (
			<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
				<FormField error="This field is required">
					<Input name="email" type="email" placeholder="Enter your email" />
				</FormField>
				<FormField error="Password must be at least 8 characters">
					<Input name="password" type="password" placeholder="Password" />
				</FormField>
			</div>
		),
	},

	Hero: {
		wrapper: "preview-padded",
		render: () => (
			<Hero
				title="Build faster with UI"
				description="A complete design system for React with accessible, themeable components."
				ctas={[
					{ href: "/get-started", text: "Get started", buttonClass: "primary" },
					{
						href: "/docs",
						text: "Documentation",
						buttonClass: "secondary alternate",
					},
				]}
				Link={Link}
			/>
		),
	},

	Input: {
		wrapper: "preview-center",
		render: () => (
			<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
				<Input name="name" placeholder="Full name" />
				<Input name="email" type="email" placeholder="Email address" />
				<Input name="search" type="search" placeholder="Search..." />
			</div>
		),
	},

	Modal: {
		wrapper: "preview-bare",
		render: () => (
			<Modal
				isOpen={true}
				onClose={() => {}}
				title="Confirm action"
				footer={
					<>
						<Button
							text="Cancel"
							className="button theme-default secondary alternate"
							onClick={() => {}}
						/>
						<Button
							text="Confirm"
							className="button theme-default primary"
							onClick={() => {}}
						/>
					</>
				}
			>
				<p>
					Are you sure you want to delete this item? This action cannot be
					undone.
				</p>
			</Modal>
		),
	},

	NavBar: {
		wrapper: "preview-bare",
		render: () => (
			<NavBar
				logo={
					<Link href="/">
						<strong>UI</strong>
					</Link>
				}
				links={[
					{
						id: "docs",
						text: "Docs",
						url: "/docs",
						hideOptions: () => true,
					},
					{
						id: "github",
						text: "GitHub",
						url: "https://github.com",
						hideOptions: () => true,
					},
				]}
				loggedIn={false}
				Link={Link}
			/>
		),
	},

	Pagination: {
		wrapper: "preview-center",
		render: () => (
			<Pagination
				currentPage={4}
				totalPages={12}
				onPageChange={() => {}}
				siblingCount={1}
			/>
		),
	},

	Popover: {
		wrapper: "preview-center",
		render: () => (
			<Popover
				trigger={
					<Button
						text="Open options"
						className="button theme-default secondary"
						onClick={() => {}}
					/>
				}
				title="Display options"
				content={
					<div
						style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
					>
						<Switch name="dark" label="Dark mode" />
						<Switch name="compact" label="Compact view" />
					</div>
				}
				position="bottom"
			/>
		),
	},

	ProgressBar: {
		wrapper: "preview-padded",
		render: () => (
			<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
				<ProgressBar value={30} label="Uploading" showValue />
				<ProgressBar value={65} variant="success" label="Complete" showValue />
				<ProgressBar value={80} variant="warning" label="Storage" showValue />
				<ProgressBar indeterminate variant="default" label="Processing..." />
			</div>
		),
	},

	RadioButton: {
		wrapper: "preview-center",
		render: () => (
			<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
				<RadioButton
					name="size"
					label="Small"
					value="sm"
					checked={false}
					onChange={() => {}}
				/>
				<RadioButton
					name="size"
					label="Medium"
					value="md"
					checked={true}
					onChange={() => {}}
				/>
				<RadioButton
					name="size"
					label="Large"
					value="lg"
					checked={false}
					onChange={() => {}}
				/>
			</div>
		),
	},

	Select: {
		wrapper: "preview-center",
		render: () => (
			<Select
				name="country"
				className=""
				options={[
					{ value: "gb", label: "United Kingdom" },
					{ value: "us", label: "United States" },
					{ value: "de", label: "Germany" },
					{ value: "fr", label: "France" },
				]}
			/>
		),
	},

	Skeleton: {
		wrapper: "preview-padded",
		render: () => (
			<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
				<div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
					<Skeleton width={48} height={48} borderRadius="50%" />
					<div style={{ flex: 1 }}>
						<Skeleton width="60%" height="1rem" />
						<div style={{ marginTop: "0.4rem" }}>
							<Skeleton width="40%" height="0.75rem" />
						</div>
					</div>
				</div>
				<Skeleton lines={3} />
				<Skeleton width="80%" />
			</div>
		),
	},

	Spinner: {
		wrapper: "preview-center",
		render: () => (
			<div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
				<Spinner size="sm" />
				<Spinner size="md" />
				<Spinner size="lg" />
			</div>
		),
	},

	Switch: {
		wrapper: "preview-center",
		render: () => (
			<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
				<Switch
					name="notifications"
					label="Enable notifications"
					defaultChecked={true}
				/>
				<Switch name="darkMode" label="Dark mode" defaultChecked={false} />
				<Switch
					name="updates"
					label="Automatic updates"
					defaultChecked={true}
				/>
			</div>
		),
	},

	Table: {
		wrapper: "preview-padded",
		render: () => (
			<Table columns={tableColumns} rows={tableRows} caption="Team members" />
		),
	},

	Tabs: {
		wrapper: "preview-padded",
		render: () => (
			<Tabs
				tabs={[
					{
						id: "overview",
						label: "Overview",
						content: (
							<p style={{ margin: 0 }}>
								This is the overview content for the selected tab.
							</p>
						),
					},
					{
						id: "specs",
						label: "Specifications",
						content: (
							<p style={{ margin: 0 }}>
								Technical specifications and requirements go here.
							</p>
						),
					},
					{
						id: "reviews",
						label: "Reviews",
						content: (
							<p style={{ margin: 0 }}>
								Customer reviews and ratings appear in this panel.
							</p>
						),
					},
				]}
				defaultTab="overview"
			/>
		),
	},

	Terminal: {
		wrapper: "preview-center",
		render: () => (
			<Terminal title="Install" code="npm i @anephenix/ui --save" />
		),
	},

	Textarea: {
		wrapper: "preview-center",
		render: () => (
			<Textarea
				name="message"
				placeholder="Enter your message here..."
				defaultValue="This is an example of a multi-line text area component for longer form content."
			/>
		),
	},

	Toast: {
		wrapper: "preview-center",
		render: () => (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "0.75rem",
					width: "360px",
				}}
			>
				<div style={{ position: "relative", height: "70px" }}>
					<Toast
						isVisible={true}
						title="Saved"
						message="Your changes have been saved."
						variant="success"
						position="top-right"
						onClose={() => {}}
						duration={0}
					/>
				</div>
				<div style={{ position: "relative", height: "70px" }}>
					<Toast
						isVisible={true}
						title="Error"
						message="Something went wrong. Please try again."
						variant="error"
						position="top-right"
						onClose={() => {}}
						duration={0}
					/>
				</div>
			</div>
		),
	},

	Tooltip: {
		wrapper: "preview-center",
		render: () => (
			<div style={{ display: "flex", gap: "2rem" }}>
				<Tooltip content="Save your changes" position="top">
					<Button
						text="Save"
						className="button theme-default primary"
						onClick={() => {}}
					/>
				</Tooltip>
				<Tooltip content="Discard all changes" position="top">
					<Button
						text="Discard"
						className="button theme-default secondary alternate"
						onClick={() => {}}
					/>
				</Tooltip>
			</div>
		),
	},
};

export default function PreviewPage({
	viewport = { width: 1280, height: 1024 },
}) {
	const [name, setName] = useState(null);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		setName(params.get("component"));
	}, []);

	if (!name) return <CropTool viewport={viewport} componentName={null} />;

	const preview = previews[name];

	if (!preview) {
		return (
			<>
				<div className="preview-center preview-ready">
					<p>No preview available for: {name}</p>
				</div>
				<CropTool viewport={viewport} componentName={name} />
			</>
		);
	}

	const { wrapper, render: Render } = preview;

	return (
		<>
			<div className={`${wrapper} preview-ready`}>
				<Render />
			</div>
			<CropTool viewport={viewport} componentName={name} />
		</>
	);
}
