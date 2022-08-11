# Model Input

Auto handling input with max 5 deep object and can trigger manually.

```tsx
<div>
    <input type="text" model="state.name" placeholder="Name" />
    <input type="text" model="state.sub.sub2.sub3.name" placeholder="Name" />
</div>
```

Same as

```tsx
<div>
    <input type="text" onChangeValue={(value) => (this.state.name = value)} placeholder="Name" />
    <input type="text" onChangeValue={(value) => (this.state.sub.sub2.sub3name = value)} placeholder="Name" />
</div>
```

## Live (Keyup Event)

If you want keyup as event on model, add attribute `live`.

```tsx
<input live type="text" model="state.name" />
```

## Trigger

You can enable/disable trigger where input has changed.

```tsx
<input trigger={1} type="text" model="state.user.name" />
```