# Extensions

Extension tools for view component, log, console, etc.

## Usage

```tsx
import { withExtension } from "@root/plugin/extension";

app.use(withExtension("#extension-app", import.meta.env.DEV));
```

Add this tag to index.html

```html
<div id="extension-app"></div>
```

## Logger

```tsx
import { addLog } from "@root/plugin/extension";

addLog({
	msg: 'hello world',
	type: 'success' // "success" | "warn" | "error"
})
```