# Extensions

Extension tools for view component, log, console, etc.

## Usage

```tsx
import { withExtension } from "@root/plugin/extension";

app.use(withExtension(import.meta.env.DEV));
```

## Logger

```tsx
import { addLog } from "@root/plugin/extension";

addLog({
	msg: 'hello world',
	type: 'success' // "success" | "warn" | "error"
})
```