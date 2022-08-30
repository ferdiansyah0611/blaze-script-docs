export default function Footer() {
	// @ts-ignore
	const { render, state } = init(this);
	state(null, {
		open: true
	})
	render(() => <footer>
		<p>Released under the MIT License</p>
		<p>Copyright &copy; 2022-present Ferdiansyah</p>
	</footer>);
}
