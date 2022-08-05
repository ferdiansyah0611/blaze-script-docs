import Markdown from "@/lib/Markdown";
import { rendering } from "@root/core";
import { addComponent } from "@root/plugin/extension";

export default function Document(Index, Container) {
    return {
        render: (urlRequest, action) => {
            const {
                check,
                page,
                entry,
                replaceOrPush,
                keyApplication,
                app,
                removeCurrentRouter,
                beforeEach,
                afterEach,
                changeRun,
            } = action;

            if(urlRequest === '/') {
                replaceOrPush(urlRequest);

                const component = new Index(window.$app[keyApplication]);
                component.$config = window.$app[keyApplication].$config;

                rendering(component, null, true, {}, 0, component.constructor, []);
                const query = document.querySelector(entry);
                query.replaceChildren(component.$node);
                component.$deep.mounted(false, app.$router.hmr);

                app.$router.history.push({ url: urlRequest, current: component });
                changeRun(app, urlRequest);

                return;
            }

            let file = {},
                config = {
                    url: [],
                };
            Object.assign(file, import.meta.glob("@app/docs/*.md", { as: "raw" }));
            Object.assign(file, import.meta.glob("@app/docs/**/*.md", { as: "raw" }));
            Object.assign(file, import.meta.glob("@app/docs/**/**/*.md", { as: "raw" }));
            Object.assign(file, import.meta.glob("@app/docs/**/**/**/*.md", { as: "raw" }));
            Object.assign(file, import.meta.glob("@app/docs/**/**/**/**/*.md", { as: "raw" }));
            Object.assign(file, import.meta.glob("@app/docs/**/**/**/**/**/*.md", { as: "raw" }));
            Object.assign(file, import.meta.glob("@app/docs/**/**/**/**/**/**/*.md", { as: "raw" }));

            for (let modules in file) {
                let path = modules.split("../docs")[1].toLowerCase();
                if (path.match(".md")) {
                    let url = path.split(".md")[0];
                    url = url.replaceAll("[", ":").replaceAll("]", "");
                    if (url.indexOf("index") !== -1) {
                        url = url.split("index")[0];
                        if (url.endsWith("/") && url.length > 1) {
                            url = url.replace(/\/$/, "");
                        }
                    }
                    config.url.push(page(url, file[modules]));
                }
            }

            const { result, isValid, params } = check(config, urlRequest);

            if (result) {
                beforeEach(result);
                replaceOrPush(urlRequest);

                const html = Markdown(result.component);
                const component = new Container();
                component.html = html
                component.url = urlRequest
                component.$config = window.$app[keyApplication].$config;

                rendering(component, null, true, {}, 0, component.constructor, []);
                const query = document.querySelector(entry);
                query.replaceChildren(component.$node);
                component.$deep.mounted(false, app.$router.hmr);

                addComponent(component);
                afterEach(result.config);

                if (app.$router.history.length) {
                    removeCurrentRouter(app.$router);
                }

                app.$router.history.push({ url: urlRequest, current: component });
                changeRun(app, urlRequest);
                return;
            }
        },
    };
}
