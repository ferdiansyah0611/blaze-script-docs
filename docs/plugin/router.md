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

Auto route based on files in route folder with max 6 subfolder. Example:

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
        auto: true,
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

let keyApp = 0;
startIn(this, keyApp, Loader);
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
this.$router.watch(data => {
    console.log('url :', data)
})
```

## API

### $router.go(go: number)

```tsx
this.$router.go(-2)
```

### $router.push(url: string)

```tsx
this.$router.push('/home')
```

### $router.back()

```tsx
this.$router.back()
```

### $router.watch((url: string) => any)

```tsx
this.$router.watch((url) => console.log(url))
```