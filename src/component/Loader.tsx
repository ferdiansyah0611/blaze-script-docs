// @ts-nocheck
import { init } from "@blaze";

export default function Loader() {
	init(this, "auto");
	render(() => <div style="background: #0c0c0cd1;cursor: progress;" class="fixed left-0 top-0 h-screen w-full text-white z-20 flex items-center justify-center">
		<p>Loading...</p>
	</div>)
}