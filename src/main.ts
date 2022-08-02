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

import Apps from "@/Apps";
import "./style/app.sass";

// hmr
if (import.meta.hot) {
    import.meta.hot.accept((modules) => {
        if (modules.default) modules.default();
    });
}

Apps();
