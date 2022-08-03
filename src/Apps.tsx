import { init } from "@blaze";
import { startIn } from "@root/plugin/router";
import "@style/template.sass";
import Sidebar from "@component/Sidebar";
import Navbar from "@component/Navbar";
import Footer from "@component/Footer";
import Paginator from "@component/Paginator";

import apps from "@store/app";

export default function MyApp() {
	const { watch, state, mount, batch, render } = init(this);
	startIn(this);
	apps(this);
	state(null, {
		open: false,
	});
	mount(() => {
		console.log("mount MyApp");
	});
	watch(["ctx.app.active"], (_a, b) => {
		batch(() => {
			this.state.open = b === "/";
		});
	});
	render(() => (
		<div className="app">
			{!this.state.open && <Sidebar />}
			<div class={!this.state.open ? "close" : ""} id="container">
				<Navbar open={!this.state.open} />
				<Paginator open={!this.state.open} />
				<div d skip id="route"></div>
				<Footer />
			</div>
		</div>
	));
}