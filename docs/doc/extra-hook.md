# Extra Hook

## useTransition

Give the loading status to the component without having to create a state.

```tsx
import { useTransition } from "@root/extra";

export default function Index() {
	init(this, "auto");
	const load = useTransition("loading", this);
	mount(() => {
		load(async () => {
			await new Promise((resolve) => {
				setTimeout(() => resolve(true), 5000);
			});
		});
	});
	render(() => (
		<div>
			<p if={this.loading}>loading</p>
			<p else>done</p>
		</div>
	));
}
```

## useId

return value uuid unique.

```tsx
import { useId } from "@root/extra";

console.log(useId());
```