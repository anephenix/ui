const links = [
	{
		text: "Home",
		url: "/",
		hideOnDesktop: true,
		hideOptions: ({ loggedIn }) => !loggedIn,
	},
	{
		text: "Get started",
		url: "/get-started",
		hideOnDesktop: false,
		hideOptions: ({ loggedIn }) => !loggedIn,
	},
	{
		text: "Docs",
		url: "/docs",
		hideOptions: ({ loggedIn }) => !loggedIn,
	},
	{
		text: "GitHub",
		url: "https://github.com/anephenix/ui",
		target: "_blank",
		rel: "noopener noreferrer",
		hideOptions: ({ loggedIn }) => !loggedIn,
	},
];

export default links;
