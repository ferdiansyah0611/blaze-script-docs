// @ts-nocheck
import { init } from "@blaze";
import { startIn } from "@root/plugin/router";
import "@style/template.sass";
import Sidebar from "@component/Sidebar";
import Navbar from "@component/Navbar";
import Footer from "@component/Footer";
import Paginator from "@component/Paginator";

import apps from "@store/app";

export default function MyApp() {
	init(this, "auto");
	startIn(this);
	apps(['active'], this);
	state(null, {
		open: false,
	});
	mount(() => {
		dispatch('app.active', location.pathname)
		this.state.open = location.pathname === "/";

		this.$router.onChange(data => {
			this.state.open = data === "/";
			dispatch('app.active', data)
		});
	});
	render(() => (
		<div className="app">
			{!this.state.open && <Sidebar />}
			<div class={!this.state.open ? "close" : ""} id="container">
				<Navbar open={!this.state.open} />
				<div d skip id="route"></div>
				<Paginator open={!this.state.open} />
				<Footer />
			</div>
		</div>
	));
}