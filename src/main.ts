declare global {
    interface Window {
        hljs: any;
    }
}

import "../global.d";
import MyApp from "@/Apps";
import "./style/app.sass";
import { createApp } from "@root/render";
import { makeRouter } from "@root/plugin/router";

import Container from "@component/Container";
import Document from "./lib/Document";
import Index from "@route/Index";
import { withExtension } from "@root/plugin/extension";

const app = new createApp("#app", MyApp, {
    dev: false,
});
app.use(
    makeRouter("#route", {
        auto: true,
        customize: Document(Index, Container),
        config: {
            "/plugin": {
                children: true
            }
        }
    })
);
app.use(withExtension("#extension", false));
app.mount();
