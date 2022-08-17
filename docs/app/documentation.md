# Documentation App

Create documentation web app with auto route generate from markdown file.

## Without Step (Clone from blaze docs)

```bash
git clone git@github.com:ferdiansyah0611/blaze-script-docs.git mydoc && cd mydoc && npm i
```

## With Step

```bash
npm i showdown
```

```tsx
// Document.tsx

import showdown from "showdown";

function Markdown(text) {
    var converter = new showdown.Converter(),
        html = converter.makeHtml(text);
    return html;
}

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
                tool,
            } = action;

            const entity = new EntityRouter(app, {}, tool);

            if (urlRequest === "/") {
                const index = new EntityRender(Index, {
                    arg: [window.$app[keyApplication]],
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
                        html: Markdown(result.component),
                        url: urlRequest,
                    },
                    arg: [],
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
```

```tsx
// @ts-nocheck
// Container.tsx
import { init } from "@blaze";

export default function Container() {
    init(this, "auto");
    mount(() => {
        this.$node.querySelectorAll("code").forEach((el) => {
            window.hljs.highlightElement(el);
        });
    });
    render(() => (
        <div>
            <div setHTML={this.html} skip></div>
        </div>
    ));
}
```

```tsx
// @ts-nocheck
// Index.tsx
import "@style/landing.sass";
import { init } from "@blaze";

export default function Index() {
    init(this, "auto");
    render(() => (
        <div d class="index">
            <p>Index Page</p>
        </div>
    ));
}
```

```tsx
// main.ts
import Document from "./Document";
import Index from "./Index";
import Container from "./Container";

// ...createApp
app.use(
    makeRouter("#route", {
        auto: true,
        customize: Document(Index, Container),
    })
);
```

```bash
echo documentation > docs/doc.md
```

Then open url `http://localhost:3000/doc`
