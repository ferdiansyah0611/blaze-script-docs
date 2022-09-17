# Multiple App

Can run multiple app in one website.

```tsx
// @ts-nocheck
// Apps.tsx
import { init } from "@blaze";

export default function Hello(prevComponent, rootApp) {
    init(this, "auto");
    render(
        () => (
            <div>
                <p>Hello World</p>
            </div>
        )
    );
};
```

```tsx
// main.ts
import { createApp } from "@root/render";
const app = new createApp("#app", Hello, {
    dev: import.meta.env.DEV,
});
const about = new createApp("#about", Hello, {
    dev: import.meta.env.DEV,
});
app.mount();
about.mount();
```