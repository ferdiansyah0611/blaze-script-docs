declare global{
    interface Window {
        hljs: any;
    }
}

import "../global.d"
import MyApp from "@/Apps";
import "./style/app.sass";
import { createApp } from "@root/render";
import { makeRouter } from "@root/plugin/router";
import withError from "@root/plugin/error";

const app = new createApp("#app", MyApp, {
    dev: false,
});
app.use(withError());
app.use(
    makeRouter("#route", {
        auto: true,
    })
);
app.mount();
