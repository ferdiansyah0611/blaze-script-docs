# List Rendering

This section about list rendering.

## Without Key

Without key, if array has add/remove and element gonna replacing with new children.

```tsx
<div>
    {this.state.user.map((item: any) => (
        <div>
            <p>{item.username}</p>
        </div>
    ))}
</div>
```

## Unique Key

With unique key, in anycase children not replacing but detect where element key has changed. Like deleting a key that doesn't exist, increase data array using `insertAdjacentElement`

```tsx
<div>
    {this.state.user.map((item: any) => (
        <div key={item.id}>
            <p>{item.username}</p>
        </div>
    ))}
</div>
```

## For

We recommendation use `for` if children a component

```tsx
<div for>
    {this.state.user.map((item: any) => (
        <User key={item.id} item={item}/>
    ))}
</div>
```