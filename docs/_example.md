```tsx
import { init } from "@blaze";

export default function Example() {
    init(this, "auto");
    state("data", {
        count: 0
    })
    effect(() => {
        console.log('total click', this.data.count);
    })
    render(() => <div>
        <button onClick={() => this.data.count++}>
            {this.data.count} Click
        </button>
    </div>);
}
```