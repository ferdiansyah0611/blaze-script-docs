// @ts-nocheck
import { init } from "@blaze";
import helmet from "@root/plugin/helmet";

import Paginator from "@component/Paginator";
import Footer from "@component/Footer";
import apps from "@store/app";

export default function Container() {
    init(this, "auto");
    state(null, {
        list: [],
    });
    apps(["active"], this);
    mount(() => {
        this.$node.querySelectorAll("code").forEach((el) => {
            window.hljs.highlightElement(el);
        });
        let h1 = this.$node.querySelector("h1");
        let title;
        if (h1) {
            title = h1.innerText + (h1.innerText.indexOf("Blaze Script") === -1 ? " - Blaze Script" : "");
        } else {
            title = "Blaze Script";
        }

        helmet({ title });

        batch(() => {
            this.$node.querySelectorAll("h1").forEach((data) => {
                this.state.list.push({
                    id: "#" + data.id,
                    text: data.innerText
                });
            });
            this.$node.querySelectorAll("h2").forEach((data) => {
                this.state.list.push({
                    id: "#" + data.id,
                    text: data.innerText
                });
            });
        });
    });
    render(() => (
        <div>
            <div>
                <div class="body" setHTML={this.html} skip></div>
                <Paginator open={!(this.ctx.app.active === '/')} />
                <Footer/>
            </div>
            <div>
                <div class="list">
                    {this.state.list.map((head) => (
                        <a href={head.id}>{head.text}</a>
                    ))}
                </div>
            </div>
        </div>
    ));
}
