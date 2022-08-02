import { rendering } from "@root/core";
import { batch } from "@blaze";
import Extension from "./component/Extension";
import "./extension.css";

type Log = {
	msg: string;
	at?: Date;
	type?: "success" | "warn" | "error";
};

export const addLog = (data: Log, trigger: boolean = true) => {
	if (window.$extension) {
		window.$extension.addLog(
			{
				msg: typeof data.msg === "string" ? data.msg : JSON.stringify(data.msg),
				type: data.type,
				at: new Date(),
			},
			trigger
		);
	}
};
export const addComponent = (data, trigger = true) => {
	if (window.$extension) {
		window.$extension.addComponent(data, trigger);
	}
};

export const withExtension = (entry: string, enabled: boolean) => {
	return (_a, blaze, _c, keyApp) => {
		let query = document.querySelector(entry);
		// remove !window.$extension if develop extension
		if (query && enabled && !window.$extension) {
			let component = new Extension(keyApp);
			rendering(component, null, true, {}, 0, component.constructor.name, []);
			query.replaceChildren(component.$node);
			component.$deep.mounted(false);
		}

		blaze.startComponent.push((component) => {
			let old = performance.now(),
				now,
				duration,
				msg;
			return () => {
				now = performance.now();
				duration = (now - old).toFixed(1);
				msg = `[${component.constructor.name}] ${duration}ms`;
				component.$deep.time = duration;
				// extension
				if (window.$extension && !component.disableExtension) {
					batch(() => {
						addLog(
							{
								msg,
							},
							false
						);
						if (!component.props.key) {
							let warn = `[${component.constructor.name}] key is 0. it's work, but add key property if have more on this component.`;
							addLog(
								{
									msg: warn,
									type: "warn",
								},
								false
							);
							console.warn(warn);
						}
					}, window.$extension);
				}
			};
		});
		blaze.afterAppReady.push((component) => {
			addComponent(component, true);
		});
		blaze.onReload.push((component) => {
			batch(() => {
				reload();
				addLog(
					{
						msg: "[HMR] reloading app",
					},
					false
				);
				addComponent(component, false);
			}, window.$extension);
		});
		if (window.$router) {
			window.$router[keyApp].error.push((msg) => {
				addLog({
					msg,
					type: 'error'
				});
			});
			window.$router[keyApp].found.push((msg) => {
				addLog({
					msg,
				});
			});
		}
	};
};

export const reload = () => {
	if (window.$extension) {
		window.$extension.reload();
	}
};
