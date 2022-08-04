import { init } from "@blaze";
import app from "@store/app";

export default function Paginator() {
	const { render, state, watch, batch } = init(this);
	app(['active', 'menu'], this);
	state(null, {
		open: true,
		previous: {},
		next: {},
	});
	// layout(() => console.log(this))
	watch(["ctx.app.active"], (_a, b) => {
		this.ctx.app.menu.forEach((item, i, menu) => {
			item.items.find((items, index, arr) => {
				if (items.link === b) {
					batch(() => {
						if (arr[index - 1]) {
							this.state.previous = arr[index - 1];
						}
						else if(i > 0 && menu[i - 1]) {
							this.state.previous = menu[i - 1].items.at(-1)
						}
						else {
							this.state.previous = {}
						}

						if (arr[index + 1]) {
							this.state.next = arr[index + 1];
						}
						else if(menu[i + 1]) {
							this.state.next = menu[i + 1].items.at(0)
						}
						else {
							this.state.next = {}
						}
					});
					return items;
				}
			});
		});
	});
	render(() => {
		return (
			<div class="paginator">
			{
				this.props.open &&
				<>
					{this.state.previous.text && (
						<a data-link href={this.state.previous.link}>
							<span>Previous Page</span>
							<span>{this.state.previous.text}</span>
						</a>
					)}
					{this.state.next.text && (
						<a data-link href={this.state.next.link}>
							<span>Next Page</span>
							<span>{this.state.next.text}</span>
						</a>
					)}
				</>
			}
			</div>
		);
	});
}
