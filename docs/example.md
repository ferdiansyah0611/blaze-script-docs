```tsx
// @ts-nocheck
// Apps.tsx
import { init } from "@blaze";

export default function Example() {
    init(this, "auto");
    const data = state("data", {
        count: 0
    })
    effect(() => {
        console.log('total click', data.count);
    })
    render(() => <div>
        <button onClick={() => data.count++}>
            {data.count} Click
        </button>
    </div>);
}
```