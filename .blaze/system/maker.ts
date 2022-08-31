import { deepObjectState } from "./core";
import { batch } from "./utils";
import { Component } from "../blaze.d";

/**
 * @makeChildren
 * manage children element, like appendChild a node/string/number
 */
export const makeChildren = (children: Element[], el: Element) => {
	if (children.length === 1 && typeof children[0] === "string") {
		el.append(document.createTextNode(children[0]));
	} else if (children.length) {
		children.forEach((item, i) => {
			// logic
			if (!item && typeof item !== "number") {
				return;
			}
			if (item.hasOwnProperty("if") && !item.if) {
				return;
			}
			if (item.else) {
				let previous = Array.from(children)[i - 1];
				if (previous.hasOwnProperty("if") && previous.if) {
					return;
				}
			}
			// node
			if (item && item.nodeName) {
				el.appendChild(item);
				return;
			}
			// string/number
			if (["string", "number"].includes(typeof item)) {
				el.append(document.createTextNode(item.toString()));
				return;
			}
			if (Array.isArray(item)) {
				for (const subchildren of item) {
					if (subchildren) {
						el.appendChild(subchildren);
					}
				}
			}
		});
	}
};

/**
 * @makeAttribute
 * manage attribute element, like dataset, event, etc
 */
export const makeAttribute = (data: any, el: HTMLElement, component: Component) => {
	let addEventVirtualToEl = (name: string, call: (e: any) => any, fn?: any) => {
		if (!el.events) el.events = [];
		return (
			el.events.push({
				name,
				call,
				fn,
			}) - 1
		);
	};
	let changeObject = (item) => el[item] = data[item];

	Object.keys(data).forEach((item: any) => {
		if (item === "model") {
			let error = window.$error;
			try {
				let path = data[item],
					name = data.live ? "keyup" : "change",
					call = (e: any) => {
						if (el['type'] === "checkbox") {
							deepObjectState(e.currentTarget.model, e.currentTarget, component, e.currentTarget.checked);
						} else {
							deepObjectState(e.currentTarget.model, e.currentTarget, component, e.currentTarget.value);
						}
					};

				el.addEventListener(name, call);
				addEventVirtualToEl(name, call);

				let value = deepObjectState(path, data, component);
				if (el['type'] === "checkbox") {
					el['checked'] = Boolean(value);
				} else if (value && value.toString().indexOf("[object Object]") === -1) {
					el['value'] = value;
				}

				changeObject(item);
				return;
			} catch (err) {
				if (error) {
					error.open(
						`Error Model`,
						`State on path ${data[item]} is undefined. Please check the state!\nCall Stack:\n${err.stack}`
					);
				}
				return;
			}
		}
		// class
		if (item.match(/class|className/g) && Array.isArray(data[item])) {
			el.className = data[item].join(" ");
			return;
		}
		if (item === "class") {
			el.className = data[item];
			return;
		}
		// style object
		if (item === "style" && typeof data[item] === "object") {
			for (let [name, value] of Object.entries(data[item])) {
				if (typeof value === "number") {
					value = value + "px";
				}
				el.style[name] = value;
			}
			return;
		}
		// dataset
		if (item.match(/^data-/)) {
			let name = item.split("data-")[1];
			let strip = name.indexOf("-");
			if (strip !== -1) {
				name = name.slice(0, strip) + name[strip + 1].toUpperCase() + name.slice(strip + 2);
			}
			el.dataset[name] = data[item];
			return;
		}
		// refs
		if (item === "refs" && !component.$deep.update && data[item]) {
			if (typeof data.i === "number") {
				if (!component[data[item]]) {
					component[data[item]] = [];
				}
				component[data[item]][data.i] = el;
			} else {
				component[data[item]] = el;
			}
			// don't return
		}
		if (item === "key") {
			el.dataset.n = component.constructor.name;
			if (["number", "string"].includes(typeof data.key)) {
				el.dataset.i = data.key;
			}
		}
		// setHTML
		if (item === "setHTML" && data[item]) {
			el.innerHTML = escape(data[item]);
			return;
		}
		// event
		if (item.match(/^on[A-Z][a-z]+/)) {
			if (typeof data[item] === "function") {
				let find = item.match(/Prevent|StopPropagation|Value/),
					name,
					call,
					index = 0,
					removeOnEmpty = (e) => {
						e.currentTarget.removeEventListener(e.type, call);
					};

				if (find) {
					let isValue = find[0] === "Value";
					name = item.split(find[0]).join("").toLowerCase().slice(2);
					call = async (e: any) => {
						e.preventDefault();
						let event = e.currentTarget.events[index];
						if (!event) return removeOnEmpty(e);
						if (!data.batch) {
							await event.fn(isValue ? e.target.value : e);
						} else {
							batch(async () => await event.fn(isValue ? e.target.value : e), component);
						}
					};
				} else {
					name = item.toLowerCase().slice(2);
					call = async (e) => {
						let event = e.currentTarget.events[index];
						if (!event) return removeOnEmpty(e);
						if (!data.batch) {
							await event.fn(e);
						} else {
							batch(async () => await event.fn(e), component);
						}
					};
				}
				el.addEventListener(name, call);
				index = addEventVirtualToEl(name, call, data[item]);
			}
			return;
		}
		// directive
		if (item === "on:toggle") {
			let call = (e: any) => {
				e.preventDefault();
				if (e.currentTarget["on:toggle"].indexOf("component.") === -1) {
					e.currentTarget["on:toggle"] = "component." + e.currentTarget["on:toggle"];
					e.currentTarget["on:toggle"] += " = !" + e.currentTarget["on:toggle"];
				}
				eval(e.currentTarget["on:toggle"]);
			};
			el.addEventListener("click", call);
			addEventVirtualToEl("click", call);

			changeObject(item);
			return;
		}
		if (item === "on:show") {
			if (!data[item]) {
				el.style.display = "none";
			}
			changeObject(item);
			return;
		}
		if (item === "on:active") {
			if (data[item]) {
				el.classList.add("active");
			} else {
				el.classList.remove("active");
			}
			changeObject(item);
			return;
		}
		el[item] = data[item];
	});
};

function escape(html: string) {
	let div = document.createElement("div");
	div.innerHTML = html;
	Array.from(div.querySelectorAll("script")).forEach((script) => script.remove());
	return div.innerHTML;
}
