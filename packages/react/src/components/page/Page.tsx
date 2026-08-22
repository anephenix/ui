import "@anephenix/ui-tokens/components/page/Page.css";

interface PageProps {
	children: React.ReactNode;
}

const Page = ({ children }: PageProps) => (
	<div className="page">{children}</div>
);

export default Page;
