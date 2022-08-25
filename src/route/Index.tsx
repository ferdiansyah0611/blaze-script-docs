// @ts-nocheck
import "@style/landing.sass";
import { init } from "@blaze";
import Example from "@app/docs/_example.md?raw";
import ExampleList from "@app/docs/_example_list.md?raw";
import Markdown from "@/lib/Markdown";
import Footer from "@component/Footer";

export default function Index() {
	const { render, mount, state, created } = init(this);
	created(() => {
		this.state.example = Markdown(Example);
		this.state.exampleList = Markdown(ExampleList);
	});
	mount(() => {
		this.$node.querySelectorAll("code").forEach((el) => {
			window.hljs.highlightElement(el);
		});
	});
	state(null, {
		example: "",
		exampleList: "",
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
				title: "Auto Dependencies",
				details: "With auto dependencies makes the development process faster",
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
		<div diff>
			<div className="index">
				<section class="introduction containers">
					<div class="description">
						<h1>Blaze Script</h1>
						<h2>Framework Single Page Application</h2>
						<p>Reactivity For Building Modern User Interfaces</p>
						<div>
							<a href="/guide/what-is-blaze-script" data-link>
								Get Started
							</a>
							<a href="https://github.com/ferdiansyah0611/blaze-script">View on GitHub</a>
						</div>
					</div>
					<div class="example_code">
						<div class="text-sm" skip setHTML={this.state.example}></div>
						<h4>Result</h4>
						<Result />
					</div>
				</section>
				<section class="features containers">
					<h3>Features</h3>
					<div class="list">
						{this.state.features.map((item, i) => (
							<div>
								<p>{item.icon}</p>
								<h5>{item.title}</h5>
								<p>{item.details}</p>
							</div>
						))}
					</div>
				</section>
				<section class="containers !py-0 flex justify-center">
					<div class="detail">
						<div>
							<h3>Fully Loaded With All Features</h3>
							<div>
								<span>Fragments</span>
								<span>Portal</span>
								<span>Context</span>
								<span>Lazy Component</span>
								<span>Batch</span>
								<span>Magic Attribute</span>
							</div>
						</div>
						<div>
							<h3>Plugin Out Of The Box</h3>
							<div>
								<span>Router (Navigation)</span>
								<span>Query (Request Cache)</span>
								<span>Form (Validation)</span>
								<span>Helmet (Title & Description)</span>
								<span>Local (localstorage)</span>
								<span>Tester (Testing)</span>
								<span>Media Query</span>
								<span>Extension (DevTools)</span>
								<span>Error Handling</span>
							</div>
						</div>
					</div>
				</section>
				<section class="contributor containers">
					<h3>Contributor</h3>
					<div className="list">
						{this.state.members.map((item) => (
							<div>
								<img src={item.avatar} alt="avatar" />
								<h5>{item.name}</h5>
								<p>{item.title}</p>
							</div>
						))}
					</div>
				</section>
			</div>
			<Footer />
		</div>
	));
}

export function Result() {
	init(this, "auto");
	state("data", {
		count: 0,
	});
	effect(() => {
		console.log("total click", this.data.count);
	});
	render(() => (
		<div>
			<button onClick={() => this.data.count++}>{this.data.count} Click</button>
		</div>
	));
}

export function List() {
	init(this, "auto");
	state("data", {
		list: ["typescript", "node js", "vdom"],
		input: "",
	});
	const submit = () => {
		this.data.list = [...this.data.list, this.data.input];
		this.data.input = "";
	};
	const remove = (text) => (this.data.list = this.data.list.filter((item) => item !== text));
	render(() => (
		<div>
			<ul className="flex flex-col">
				{this.data.list.map((item) => (
					<li key={item}>
						<span>{item} </span>
						<button onClick={() => remove(item)}>delete</button>
					</li>
				))}
			</ul>
			<input
				live
				placeholder="Type Here"
				className="bg-black text-white p-2 border border-gray-500 focus:outline-none"
				type="text"
				model="data.input"
			/>
			<div>
				<p>Your Input: {this.data.input}</p>
				<button onClick={submit}>Submit</button>
			</div>
		</div>
	));
}
