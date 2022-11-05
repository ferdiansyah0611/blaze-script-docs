# Local

localStorage Plugin for Component

```tsx
import local from "@root/plugin/local";

const userLocal = local("user", this);
```

## Access Value

```tsx
console.log(this.local.user)
```

## Update Value

```tsx
const change = () => userLocal("hi, " + Math.random(1000))
const rechange = () => userLocal((previous) => previous + ". hi, " + Math.random(1000))
```

## Delete Value

```tsx
const clear = userLocal()
```