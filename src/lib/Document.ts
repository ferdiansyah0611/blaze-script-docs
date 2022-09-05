import Markdown from "@/lib/Markdown";
import { EntityRender } from "@root/system/core";
import { App } from "@root/system/global";

export default function Document(Index, Container) {
    return {
        render: async (urlRequest, action) => {
            const {
                check,
                page,
                entry,
                keyApplication,
                app,

                EntityRouter,
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
                        entity.handling(urlRequest);
                    })
                    .start()
                    .compile({
                        first: true,
                        key: 0,
                    })
                    .replaceChildren(entry)
                    .mount(tool.hmr)
                    .saveToExtension()
                    .done(function () {
                        this.component.$node["dataset"]["keep"] = true;
                        entity.add(this.component);
                        EntityRouter.change(urlRequest, tool);
                    });

                return;
            }

            let file = {},
                config = {
                    url: [],
                };

            file = import.meta.glob([
                "@app/docs/*.md",
                "@app/docs/**/*.md",
                "@app/docs/**/**/*.md",
                "@app/docs/**/**/**/*.md",
                "@app/docs/**/**/**/**/*.md",
                "@app/docs/**/**/**/**/**/*.md",
                "@app/docs/**/**/**/**/**/**/*.md"
            ], { as: "raw" });

            for (let modules in file) {
                let path = modules.split("/docs")[1].toLowerCase();
                if (path.match(".md") && !path.startsWith("/_")) {
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
                        html: Markdown(await result.component()),
                        url: urlRequest,
                    },
                    arg: [App.get(keyApplication, 'app')],
                    key: keyApplication,
                });
                container
                    .before(() => {
                        entity.beforeEach(result.config);
                        entity.removePrevious();
                        entity.handling(urlRequest);
                    })
                    .start()
                    .compile({
                        first: true,
                        key: 0,
                    })
                    .replaceChildren(entry)
                    .mount(tool.hmr)
                    .saveToExtension()
                    .done(function () {
                        this.component.$node["dataset"]["keep"] = true;
                        entity.afterEach(result.config);
                        entity.add(this.component);
                        EntityRouter.change(urlRequest, tool);
                    });
            }
        },
    };
}
