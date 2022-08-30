import { render } from "@blaze";

export default function NotFound() {
	// @ts-ignore
	init(this);
	render(
		() => (
			<>
				<p>404</p>
			</>
		),
		this
	);
};