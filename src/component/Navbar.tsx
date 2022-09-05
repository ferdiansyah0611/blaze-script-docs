import app from "@store/app";

export default function Navbar() {
	// @ts-ignore
	const { render, mount, effect } = init(this);
	app(['openMenu'], this);
	mount(() => {
		console.log('navbar');
	})
	// effect(() => {
	// 	console.log(this.props.open, this.$node);
	// })
	render(() => (
		<div id="navbar">
			<div class="left">
				{this.props.open ?
					<a href="/" on:toggle="ctx.app.openMenu">
						<span class="material-symbols-outlined">menu</span>
						<span>Menu</span>
					</a>
					:
					<p class="p-2 font-bold">Blaze Script</p>
				}
			</div>
			<div class="right">
				<a href="/">Sponsor</a>
				<a href="https://github.com/ferdiansyah0611/blaze-script">Github</a>
			</div>
		</div>
	));
}
