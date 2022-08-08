# Blaze API

```tsx
const keyApp = 0;
const blaze = window.$app[keyApp];
```

## onMakeElement

```tsx
blaze.onMakeElement.push((el) => {
	console.log(el);
});
```

## onMakeComponent

```tsx
blaze.onMakeComponent.push((component) => {
	console.log(component);
});
```

## onAfterAppReady

```tsx
blaze.onAfterAppReady.push((component) => {
	console.log(component);
});
```

## onReload

```tsx
blaze.onReload.push((component) => {
	console.log(el);
});
```

## onStartComponent

```tsx
blaze.onStartComponent.push((component) => {
	console.log(component);
});
```

## onEndComponent

```tsx
blaze.onEndComponent.push((component) => {
	console.log(component);
});
```