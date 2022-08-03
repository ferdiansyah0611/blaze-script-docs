// don't remove!
declare global {
    interface Window {
        $app: any;
        $blaze: any;
        $extension: any;
        $test: any;
        $router: any;
        $error: any;
        hljs: any;
    }
    interface HTMLElement {
        $children: any;
        $commit: any[];
        $name: string;
        if: boolean;
        else: any;
        value: any;
        d?: any;
        refs?: number;
        i?: any;
        key?: any;
        $index?: number;
        $root?: any;
        updating?: boolean;
    }
    interface ChildNode {
        data: any;
    }
    interface URLSearchParams {
        entries();
    }
}

import MyApp from "@/Apps";
import "./style/app.sass";
import { createApp } from "@root/render";
import { makeRouter, startIn } from "@root/plugin/router";
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
