# Portal

a component but node render appendChild to body element.

```tsx
import { createPortal } from "@root/render";

const portalApp = function () {
    const { render } = init(this);
    createPortal(this);
    render(() => (
        <div>
            <p>
                Lorem ipsum dolor sit amet
            </p>
        </div>
    ));
};

const MyApp = function () {
    const { render } = init(this);
    render(() => (
        <div>
            <p>
                Lorem ipsum dolor sit amet
            </p>
            <portalApp />
            <portalApp key={2} />
            <portalApp key={3} show={false} />
        </div>
    ));
};
```