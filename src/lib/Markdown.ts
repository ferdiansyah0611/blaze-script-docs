import showdown from "showdown";

export default function Markdown(text){
    var converter = new showdown.Converter(),
        html      = converter.makeHtml(text);
    return html;
}