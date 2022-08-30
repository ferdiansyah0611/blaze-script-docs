export default function ItemList() {
	// @ts-ignore
	const { render, state, watch, batch } = init(this);
	state(null, {
		open: true,
	});
	watch(["props.item.collapsed"], (_a, b) => {
		if (b) {
			batch(() => (this.state.open = false));
		}
	});
	render(() => {
		const { item, active } = this.props;
		return (
			<div class="detail">
				<h5 class="flex" on:toggle="state.open">
					<span class="flex-1">{item.text}</span>
					<span class="material-symbols-outlined">{this.state.open ? 'expand_less' : 'expand_more'}</span>
				</h5>
				{this.state.open && (
					<ul>
						{item.items.map((children) => (
							<li>
								<a class={active === children.link ? "active" : ""} data-link href={children.link}>
									{children.text}
								</a>
							</li>
						))}
					</ul>
				)}
			</div>
		);
	});
}
