import templates from "../repos/templates";
import renderers from "../repos/renderers";

class Node extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let selectorType = this.data.selectorType;
        this.classList.add(`node-${selectorType}`);
        this.innerHTML = this.doRenderNode(this.data);
    }

    doRenderNode(data) {
        const selectorType = this.data.selectorType;
        return renderers.getRenderer(selectorType)(templates.getTemplate(selectorType), data);
    }
}

export default Node