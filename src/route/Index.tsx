import "@style/landing.sass";
import { init } from "@blaze";

export default function Index() {
	const { render, mount, state } = init(this);
	mount(() => {});
	state(null, {
		features: [
			{
				icon: "⚡",
				title: "Virtual DOM",
				details: "Virtual DOM make it run reactively and change when certain circumstances",
			},
			{
				icon: "🖖",
				title: "Complete Lifecycle",
				details: "Complete lifecycle can make the application complex",
			},
			{
				icon: "🛠️",
				title: "HMR & Hot Reload",
				details: "With HMR & Hot Reload makes the development process faster",
			},
		],
		members: [
			{
				avatar: "https://www.github.com/ferdiansyah0611.png",
				name: "Ferdiansyah",
				title: "Creator",
				links: [
					{ icon: "github", link: "https://github.com/ferdiansyah0611" },
					{ icon: "twitter", link: "https://twitter.com/ferdiansyah0611" },
				],
			},
		],
	});
	render(() => (
		<div d class="index">
			<section class="introduction">
				<h1>Blaze Script</h1>
				<h2>Framework Single Page Application</h2>
				<p>The Future Of Frontend Development</p>
				<div>
					<a href="/guide/what-is-blaze-script" data-link>
						Get Started
					</a>
					<a href="https://github.com/ferdiansyah0611/blaze-script">View on GitHub</a>
				</div>
			</section>
			<section class="features">
				<h3>Features</h3>
				<div class="list">
					{this.state.features.map((item) => (
						<div>
							<p>{item.icon}</p>
							<h5>{item.title}</h5>
							<p>{item.details}</p>
						</div>
					))}
				</div>
			</section>
			<section class="contributor">
				<h3>Contributor</h3>
				<div className="list">
					{this.state.members.map((item) => (
						<div>
							<img src={item.avatar} alt="avatar"/>
							<h5>{item.name}</h5>
							<p>{item.title}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	));
}
