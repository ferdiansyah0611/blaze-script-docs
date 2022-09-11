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
		registry: {
			value: any;
			add: (key, value) => any;
			delete: (key) => any;
			each: (callback) => any;
			map: (callback) => any;
		};
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
	__proto__: any;
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