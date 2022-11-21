import app from '@store/app'
import ItemList from "./ItemList";
import MediaQuery from "@root/plugin/mediaquery"

export default function Sidebar() {
	// @ts-ignore
	const { render, watch, mount } = init(this);
	app(['openMenu', 'menu', 'active'], this);
	MediaQuery("(max-width: 768px", (matches) => {
		if(matches) {
			this.ctx.app.openMenu = false
		} else {
			this.ctx.app.openMenu = true
		}
	}, this)
	watch(['ctx.app.openMenu'], (_a, b) => {
		let c = document.querySelector('#container')
		if(c) {
			if(b) {
				c.classList.add('open')
				return c.classList.remove('close')
			}
			c.classList.remove('open')
			return c.classList.add('close')
		}
	})
	render(() => (
		<div id="sidebar" class={this.ctx.app.openMenu ? 'open' : 'close'}>
			<div class="title">
				<img class="logo" src="/logo192.png" alt=""/>
				<p>Blaze Script</p>
			</div>
			<div on:toggle="ctx.app.openMenu" id="overlay" class={this.ctx.app.openMenu ? 'open' : 'close'}></div>
			{this.ctx.app.menu.map((item) => (
				<ItemList key={item.text} active={this.ctx.app.active} item={item} />
			))}
		</div>
	));
}
