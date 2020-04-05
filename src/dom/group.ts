import Resolver from './resolver';
import { OPERATOR } from './html-elements-mapping';
import HTMLElementWithData from './html-element-with-data';

export default class Group extends HTMLElementWithData {
    connectedCallback() {
        const operator = this.data.groupOperator;
        const nodes = this.data.nodes;
        this.innerHTML = this.getAttribute('isRoot') ? '' : `<p>${this.data.attributes.name}</p>`;
        for (let i = 0; i < nodes.length; i++) {
            this.appendChild(Resolver.for(nodes[i]));
            if (i + 1 !== nodes.length) {
                this.appendChild(this.createOperator(operator))
            }
        }
        this.classList.add('group-node');
    }

    createOperator(operator: string) {
        let node = document.createElement(OPERATOR.selector);
        node.setAttribute("operator", operator);
        return node;
    }
}
