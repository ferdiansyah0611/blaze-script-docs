// @ts-nocheck
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
            Array.from(this.$node.querySelector('.body').children).forEach((node) => {
                let type = node.tagName.toLowerCase()
                if(['h1', 'h2', 'h3', 'h4', 'h5'].includes(type)){
                    this.state.list.push({
                        id: "#" + node.id,
                        text: node.innerText,
                        type
                    });
                }
            })
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
                        <a class={head.type} href={head.id}>{head.text}</a>
                    ))}
                </div>
            </div>
        </div>
    ));
}
