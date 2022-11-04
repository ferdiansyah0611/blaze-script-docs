import { context } from "@blaze";

const App = context(
	"app",
	{
		menu: [
			{
				text: "Introduction",
				items: [
					{ text: "Home", link: "/" },
					{ text: "What is blaze script", link: "/guide/what-is-blaze-script" },
					{ text: "Tips", link: "/guide/tips" },
				],
			},
			{
				text: "Component",
				collapsible: true,
				items: [
					{ text: "Introduction", link: "/component/introduction" },
					{ text: "Lifecycle", link: "/component/lifecycle" },
					{ text: "Portal", link: "/component/portal" },
					{ text: "Lazy", link: "/component/lazy" },
					{ text: "Transform", link: "/component/transform" },
				],
			},
			{
				text: "Documentation",
				collapsible: true,
				collapsed: true,
				items: [
					{ text: "Attribute", link: "/doc/attribute" },
					{ text: "List Rendering", link: "/doc/list-rendering" },
					{ text: "Batch", link: "/doc/batch" },
					{ text: "Watch & Effect", link: "/doc/watch" },
					{ text: "Computed", link: "/doc/computed" },
					{ text: "Event Listener", link: "/doc/event" },
					{ text: "Model Input", link: "/doc/input" },
					{ text: "Short Code", link: "/doc/short" },
					{ text: "Multiple App", link: "/doc/multiple-app" },
					{ text: "Extra Hook", link: "/doc/extra-hook" },
				],
			},
			{
				text: "State Management",
				collapsible: true,
				collapsed: true,
				items: [
					{ text: "State", link: "/state-management/state" },
					{ text: "Context", link: "/state-management/context" },
				],
			},
			{
				text: "Tutorial",
				collapsible: true,
				collapsed: true,
				items: [
					{ text: "Create Note App", link: "/app/note" },
					{ text: "Create Documentation App", link: "/app/documentation" },
				],
			},
			{
				text: "Plugin",
				collapsible: true,
				collapsed: true,
				items: [
					{ text: "Router", link: "/plugin/router" },
					{ text: "Form", link: "/plugin/form" },
					{ text: "Helmet", link: "/plugin/helmet" },
					{ text: "Extension", link: "/plugin/extension" },
					{ text: "Local", link: "/plugin/local" },
					{ text: "Media Query", link: "/plugin/media-query" },
					{ text: "Query", link: "/plugin/query" },
					{ text: "Tester", link: "/plugin/tester" },
					{ text: "Error", link: "/plugin/error" },
				],
			},
			{
				text: "API",
				collapsible: true,
				collapsed: true,
				items: [
					{ text: "Blaze", link: "/api/blaze" },
					{ text: "Plugin", link: "/api/plugin" },
				],
			},
			{
				text: "Developer",
				collapsible: true,
				collapsed: true,
				items: [{ text: "Completion", link: "/developer/completion" }],
			},
		],
		active: "/",
		openMenu: true,
		test: {
			ok: 1,
		},
	},
	{
		active(state, data) {
			state.active = data;
		},
	}
);

export default App;
