
import { init } from "@blaze";
import Markdown from "@/lib/Markdown";
import text from '@app/docs/docs/guide/what-is-blaze-script.md?raw'

const html = Markdown(text);

export default function WhatIsBlaze() {
	const {render, mount} = init(this);
	mount(() => {
		this.$node.querySelectorAll('code').forEach(el => {
		  window.hljs.highlightElement(el);
		});
	})
	render(
		() => (
			<div d>
				<div setHTML={html} class="mt-2"></div>
			</div>
		)
	);
};