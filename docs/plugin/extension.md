# Extensions

Extension tools for view component, log, console, etc.

```tsx
import { withExtension } from "@root/plugin/extension";

app.use(withExtension("#extension", import.meta.env.DEV));
```

Add this tag to index.html

```html
<div id="extension"></div>
```