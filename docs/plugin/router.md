# Router

Plugin for routing a page

## Setup

```tsx
import { makeRouter, page, startIn } from "@root/plugin/router";

const App = function () {
    const { render } = init(this);
    // add, where #route in component
    startIn(this);
    render(() => (
        <div>
            <div id="route"></div>
        </div>
    ));
};
// ...
app.use(
    makeRouter("#route", {
        url: [
            page("/", Index),
            page("/test", Test, {
                // if false, component not run and not push/replace url
                beforeEach(router) {
                    // router.go(-1)
                    // etc...
                    return true;
                },
                // if false, auto redirect back
                afterEach(router) {
                    return true;
                },
            }),
            page("/test/:id", TestParam),
            page("", NotFound),
        ],
        // option for resolve url
        resolve: "/test/index.html",
    })
);
app.mount();
```

## Auto Route

Auto route based on files in route folder or any folder. Example:

```text
index.tsx   => /
404.tsx     => ""
[id].tsx    => /:id

admin/index.tsx    => /admin
admin/user/[id].tsx     => /admin/user/:id
admin/[id]/user.tsx     => /admin/:id/user

/admin/page/example/test/index.tsx  => /admin/page/example/test
```

```tsx
app.use(
    makeRouter("#route", {
        // required
        auto: import.meta.glob([
            "@route/*.tsx",
            "@route/**/*.tsx",
            "@route/**/**/*.tsx",
            "@route/**/**/**/*.tsx",
            "@route/**/**/**/**/*.tsx",
            "@route/**/**/**/**/**/*.tsx",
            "@route/**/**/**/**/**/**/*.tsx",
        ]),
        // required
        // why "/src/route" ? because auto object in the top have value glob @route
        // where @route is alias import by "/src/route"
        split: "/src/route",
        // optional (config for route)
        config: {
            "/": {
                beforeEach() {
                    return true;
                },
            },
        },
    })
);
```

### Loader

```tsx
import Loader from "path/component/Loader";

startIn(this, Loader);
```

## Change page

```tsx
<a href="/home" data-link>
    Home
</a>
```

## Search

```tsx
app.use(
    makeRouter("#route", {
        url: [
            // /test?name=ferdiansyah
            page("/test", Test, {
                search: ["name"],
            }),
        ],
    })
);
```

## Access Params & Search

```tsx
const TestParam = function (app) {
    init(this);
    render(
        () => (
            <>
                <p>{app.params.id}</p>
                <p>{app.search.name}</p>
            </>
        ),
        this
    );
};
```

## Listener Route

```tsx
this.$router.watch((data) => {
    console.log("url :", data);
});
```

## Hash Routing

```tsx
makeRouter("#route", {
    hash: true,
});
```

## Customize Path 404

```tsx
makeRouter("#route", {
    url: [
        page("/", Index),
        page("", NotFound, {
            url: "/code/404",
        }),
    ],
});
```

# API

## $router

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Parameter</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>go</td>
            <td>(go: number)</td>
        </tr>
        <tr>
            <td>push</td>
            <td>(url: string)</td>
        </tr>
        <tr>
            <td>back</td>
            <td>-</td>
        </tr>
        <tr>
            <td>watch</td>
            <td>((url: string) => any)</td>
        </tr>
    </tbody>
</table>

## makeRouter(entry: string, option: Option)

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>url</td>
            <td>Page[]</td>
        </tr>
        <tr>
            <td>resolve</td>
            <td>String</td>
        </tr>
        <tr>
            <td>auto</td>
            <td>Glob Vite</td>
        </tr>
        <tr>
            <td>split</td>
            <td>String</td>
        </tr>
        <tr>
            <td>config</td>
            <td>{string: Config}</td>
        </tr>
    </tbody>
</table>

## Config

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Argument</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>beforeEach</td>
            <td>function</td>
            <td>(router)</td>
        </tr>
        <tr>
            <td>afterEach</td>
            <td>function</td>
            <td>(router)</td>
        </tr>
    </tbody>
</table>

## page(url, component, config)

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>url</td>
            <td>string</td>
        </tr>
        <tr>
            <td>component</td>
            <td>Component</td>
        </tr>
        <tr>
            <td>config</td>
            <td>Config</td>
        </tr>
    </tbody>
</table>
