import Markdown from "@/lib/Markdown";
import { EntityRender } from "@root/system/core";
import { App } from "@root/system/global";

export default function Document(Index, Container) {
    return {
        render: (urlRequest, action) => {
            const {
                check,
                page,
                entry,
                keyApplication,
                app,

                EntityRouter,
                popstate,
                tool
            } = action;

            const entity = new EntityRouter(app, {}, tool);

            if (urlRequest === "/") {
                const index = new EntityRender(Index, {
                    arg: [App.get(keyApplication, 'app')],
                    key: keyApplication,
                });
                index
                    .before(() => {
                        entity.removePrevious();
                        entity.handling(urlRequest, popstate);
                    })
                    .start()
                    .compile({
                        first: true,
                        key: 0,
                    })
                    .replaceChildren(entry)
                    .mount(app.$router.hmr)
                    .saveToExtension()
                    .done(function () {
                        entity.add(urlRequest, this.component);
                        EntityRouter.change(app, urlRequest);
                    });
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

            const { result } = check(config, urlRequest);

            if (result) {
                const container = new EntityRender(Container, {
                    inject: {
                        html: Markdown(result.component),
                        url: urlRequest,
                    },
                    arg: [App.get(keyApplication, 'app')],
                    key: keyApplication,
                });
                container
                    .before(() => {
                        entity.beforeEach(result.config);
                        entity.removePrevious();
                        entity.handling(urlRequest, popstate);
                    })
                    .start()
                    .compile({
                        first: true,
                        key: 0,
                    })
                    .replaceChildren(entry)
                    .mount(app.$router.hmr)
                    .saveToExtension()
                    .done(function () {
                        entity.afterEach(result.config);
                        entity.add(urlRequest, this.component);
                        EntityRouter.change(app, urlRequest);
                    });
            }
        },
    };
}
