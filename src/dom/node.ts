import templates from "../repos/templates";
import renderers from "../repos/renderers";
import HTMLElementWithData from './html-element-with-data';

export default class Node extends HTMLElementWithData {
    connectedCallback() {
        let selectorType = this.data.selectorType;
        this.classList.add(`node-${selectorType}`);
        this.innerHTML = this.doRenderNode();
    }

    doRenderNode() {
        const selectorType = this.data.selectorType;
        return renderers.getRenderer(selectorType).render(templates.getTemplate(selectorType), this.data);
    }
}
