# Batch

To prevent re-rendering on change multiple state, you can use batch function

```tsx
import { init } from "@blaze";

const Hello = function () {
    const { state, render, batch } = init(this);
    state("state", {
        name: "ferdiansyah",
        click: 0,
    });
    const click = () => batch(() => {
    	this.state.name = "safina sahda"
    	this.state.click++
    })
    render(() => (
        <div>
            <p>hi, {this.state.name}</p>
            <button onClick={click}>show name</button>
        </div>
    ));
};
```

```tsx
// queue is [id, name]
batch(() => {
    this.state.id = 1;
    this.state.name = 'ferdiansyah';
})
// after batch, effect run one time at same effect, and trigger render.

// effect in here with 2 state, queue id and name is same with effect. and run one time not 2x run.
effect(() => {
    console.log(this.state.id, this.state.name);
})
```