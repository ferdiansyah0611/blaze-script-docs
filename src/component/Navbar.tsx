import { init } from "@blaze";
import app from "@store/app";

export default function Navbar() {
	const { render } = init(this);
	app(this);

	render(() => (
		<div id="navbar">
			<div class="left">
				{this.props.open ?
					<a href="/" toggle="ctx.app.openMenu">
						<span class="material-symbols-outlined">menu</span>
						<span>Menu</span>
					</a>
					:
					<p class="p-2 font-bold">Blaze Script</p>
				}
			</div>
			<div class="right">
				<a href="/">Sponsor</a>
				<a href="/">Github</a>
			</div>
		</div>
	));
}
