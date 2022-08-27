# Transform

Transorming file like a context and component.

## component(string)

From

```tsx
component("ItemPost");
```

To Be

```tsx
import ItemPost from "@component/ItemPost";
```

## store(string, string[])

From

```tsx
store("app", ['profile', 'user']);
```

To Be

```tsx
import app from "@store/app";

function example(){
	init(this, "auto");
	// inject to function where have init(this)
	app(['profile', 'user'], this);
}
```