
import { init } from "@blaze";
import Markdown from "@/lib/Markdown";
import text from '@app/docs/docs/plugin/helmet.md?raw'

const html = Markdown(text);
export default function() {
	const {render, mount} = init(this);
	mount(() => {
		this.$node.querySelectorAll('code').forEach(el => {
		  window.hljs.highlightElement(el);
		});
	})
	render(
		() => (
			<div>
				<div d setHTML={html} class="mt-2"></div>
			</div>
		)
	);
};