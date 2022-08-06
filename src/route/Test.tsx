import { init } from "@blaze";

export default function Test(){
	init(this, "auto");
	// @ts-ignore
	render(() => <div>
		<p>test</p>
	</div>)
}