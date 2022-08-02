import App, { init } from "@blaze";
import { createApp } from '@root/render';
import withError from "@root/plugin/error";

const Hello = function () {
    const { render } = init(this);
    render(
        () => (
            <p>Hello World</p>
        )
    );
};

const app = new createApp("#app", MyApp, {
    dev: false
});

export default function Apps() {
    app.use(withError());
    app.mount();
    
    return app;
}