# Blaze API

```tsx
import { getBlaze } from "@root/system/core";

const appKey = 0;
const blaze = getBlaze(appKey);
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

# System Blaze

About function or class or etc use in system of blaze

## Type & Interface

```tsx
import {
	AppType,
	BlazeType,
	InitType,
	ComponentProcessArgType,
	VirtualEvent,
	RegisteryComponent,
	Watch,
	Mount,
	State,
	Component,
	EntityRenderType,
	ConfigEntityRender,
	EntityCompile,
} from "@blaze.d";
```

## EntityRender

Utilite for compile a component, remove, mount, and DOM.

```tsx
import { EntityRender } from "@root/system/core";
import { EntityRenderType } from "@blaze.d";

const render: EntityRenderType = new EntityRender(Component, {
	inject: {
		test: 1,
	},
});
render.before(() => {});
render.beforeCompile(() => {});
render.start();
render.compile(option); // option: EntityCompile
render.saveToExtension();
render.mount(update);
render.remove();
render.replaceChildren(entry);
render.appendChild(target);
render.done();
```

## Lifecycle

Utilite for call a lifecycle function of component.

```tsx
import Lifecycle from "@root/system/lifecycle";

const app = new Lifecycle(ComponentObject);
app.mount(props, update, enabled);
app.unmount();
app.layout();
app.beforeCreate();
app.created();
app.beforeUpdate();
app.updated();
app.watch(logic, valueUpdate);
app.effect(depend, value);
```

## Global

About global variable for save object, like a context, app, router, and HMR. Can access in global window on dev environment.

```tsx
import { Store, App, Router, HMR } from "@root/system/global"

Store.get()
Store.set(name, value)

App.get(key?, selectObject)
App.set(value)

Router.get(key?)
Router.set(value)

HMR.get()
HMR.set(value)
HMR.clear()
```
