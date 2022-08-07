// @ts-nocheck
import { init } from "@blaze";
import helmet from "@root/plugin/helmet";

export default function Container(){
    init(this, "auto");
    mount(() => {
        this.$node.querySelectorAll('code').forEach(el => {
          window.hljs.highlightElement(el);
        });
        let h1 = this.$node.querySelector('h1')
        let title;
        if(h1) {
            title = h1.innerText + (h1.innerText.indexOf('Blaze Script') === -1 ? ' - Blaze Script' : '')
        }
        else {
            title = 'Blaze Script'
        }
        helmet({title})
    })
    render(() => <div>
        <div setHTML={this.html} skip></div>
    </div>)
}