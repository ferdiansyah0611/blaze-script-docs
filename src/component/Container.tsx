// @ts-nocheck
import { init } from "@blaze";

export default function Container(){
    init(this, "auto");
    mount(() => {
        this.$node.querySelectorAll('code').forEach(el => {
          window.hljs.highlightElement(el);
        });
    })
    render(() => <div>
        <div setHTML={this.html} skip></div>
    </div>)
}