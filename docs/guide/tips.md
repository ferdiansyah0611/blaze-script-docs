# Tips

This section about tips

## Usage Destruction State / Context

```tsx
const state = state(null, {
	id: 1
})
const update = () => state.id++
```

If component hot reload, function update is not work. But work like this :

```tsx
state(null, {
	id: 1
})
const update = () => {
	const state = this.state
	state.id++
}
```