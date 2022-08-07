# Short Code

You can use modular function in init.

Supporting function in init

-   beforeCreate
-   created
-   mount
-   beforeUpdate
-   updated
-   layout
-   dispatch
-   render
-   batch
-   state
-   watch
-   effect
-   computed

## Short

```tsx
import App, { init } from "@blaze";

const App = function () {
    const { render, mount, layout, state } = init(this);
    state("mystate", {
        id: 1,
    });
    mount(() => console.log("mount"));
    layout(() => console.log("layout"));
    render(() => <p>Hello World</p>);
};
```

## Modular

But with modular always parsing the argument "this"

```tsx
import App, { init, render, mount, layout, state } from "@blaze";

const Hello = function () {
    init(this);
    state(
        "mystate",
        {
            id: 1,
        },
        this
    );
    mount(() => console.log("mount"), this);
    layout(() => console.log("layout"), this);
    render(() => <p>Hello World</p>, this);
};
```

## Auto Dependencies

Transform a file to auto write dependencies, add `// @ts-nocheck` on first line or `// @ts-ignore` in any before dependencies.

Before Compile

```tsx
const Hello = function () {
    init(this, "auto");
    state(
        null,
        {
            id: 1,
        },
        this
    );
    mount(() => {});
    layout(() => {});
    render(() => <p>Hello World</p>);
};
```

After Compile

```tsx
const Hello = function () {
    const { state, mount, layout, render } = init(this);
    state(
        null,
        {
            id: 1,
        }
    );
    mount(() => {});
    layout(() => {});
    render(() => <p>Hello World</p>);
};
```