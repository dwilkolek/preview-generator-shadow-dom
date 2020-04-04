import htmlElementMapping from './html-elements-mapping';
class Operator extends HTMLElement {
    constructor() {
        super(); 
    }

    connectedCallback() {
        const translateNode = document.createElement(htmlElementMapping.TRANSLATE.selector);
        translateNode.setAttribute("ns", "sb");
        translateNode.setAttribute("key", `plan-operator-${this.getAttribute('operator').toLocaleLowerCase()}`);
        translateNode.setAttribute("placeholder", this.getAttribute('operator'));
        this.appendChild(translateNode);
    }

}

export default Operator