# Event

By default, event listener is auto batching and async. If you want disable auto batch, try add attribute `batch={false}` on current element where have event listener.

```tsx
import { init } from "@blaze";

const Hello = function () {
    const { render } = init(this);
    const click = (e) => {
        console.log("clicked");
    };
    render(
        () => (
            <div>
                <button batch={false} onClick={click}>Click Me</button>
            </div>
        )
    );
};
```

## on[Event]Prevent

Event listener auto preventDefault

```tsx
<div>
    <a href="/" onClickPrevent={() => console.log('click')}>Click</a>
</div>
```

## on[Event]Value

Event listener get value attribute

```tsx
<div>
    <input onChangeValue={(value) => console.log(value)} type="text" />
</div>
```