# Tips

Before write or learn, must be read this tips.

## Usage Destruction State

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

## Component

Name component must be unique, but if not unique maybe error on hot reload.