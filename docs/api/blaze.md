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

# System Blaze

About function or class or etc use in system of blaze

## Type & Interface

```tsx
export interface InterfaceApp {
	mount: () => any;
	use: (plugin: any) => any;
}
export interface InterfaceBlaze {
	run: any;
}
export interface VirtualEvent {
	name: string;
	call: () => any;
	fn?: () => any;
}

export interface RegisteryComponent {
	key: number;
	component: Component;
}
export interface Watch {
	dependencies: string[];
	handle: (a, b) => any;
}
export interface Mount {
	handle: (defineConfig: any, update: boolean, enabled: boolean) => any;
	run: boolean;
}

export interface State<T>{
	name: string | any;
	initial: T;
	component: Component | null;
	registryCall?: () => Component[];
	listeningCall?: () => any[];
}

export interface Component {
	$h: any;
	$node: HTMLElement;
	$router: any;
	$portal?: string;
	ctx: Object;
	props: Object | any;
	render();
	children: HTMLElement | boolean | any;
	disableExtension?: boolean;
	$deep: {
		batch: boolean;
		disableTrigger: boolean;
		disableExtension?: boolean;
		hasMount: boolean;
		update: number;
		registry: RegisteryComponent[];
		watch: Watch[];
		trigger();
		remove(notClear?: boolean, notNode?: boolean);
		dispatch?: any;
		time?: string;
		disableAddUnmount?: boolean;
		active?: boolean;
		queue?: any[];
		// lifecycle
		beforeCreate?: Function[];
		created?: Function[];
		mount: Mount[];
		mounted(update?: boolean, hmr?: boolean);
		unmount: Function[];
		layout?: Function[];
		beforeUpdate?: Function[];
		updated?: Function[];
		effect?: Function[];
	};
	$config?: {
		dev: boolean;
		key?: number;
	};
}

export type ConfigEntityRender = {
	inject?: any;
	arg?: any[];
	key: number;
};

export type EntityCompile = {
	first: boolean;
	key?: number;
	data?: any;
	children?: HTMLElement[];
	deep?: Component["$deep"];
};
```

## EntityRender

Utilite for compile a component, remove, mount, and DOM. 

```tsx
import { EntityRender } from "@root/system/core";

const render = new EntityRender(Component, {
	inject: {
		test: 1
	}
})
render.before(() => {})
render.beforeCompile(() => {})
render.start()
render.compile(option) // option: EntityCompile
render.saveToExtension()
render.mount(update)
render.remove()
render.replaceChildren(entry)
render.appendChild(target)
render.done()
```

## Lifecycle

Utilite for call a lifecycle function of component.

```tsx
import Lifecycle from "@root/system/lifecycle";

const app = new Lifecycle(ComponentObject)
app.mount(props, update, enabled)
app.unmount()
app.layout()
app.beforeCreate()
app.created()
app.beforeUpdate()
app.updated()
app.watch(logic, valueUpdate)
app.effect(depend, value)
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