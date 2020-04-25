import Resolver from './resolver';
import { OPERATOR } from './html-elements-mapping';
import HTMLElementWithData from './html-element-with-data';
import groupHtmlNode from '../templates/group-html-node.hbs';

export default class Group extends HTMLElementWithData {
    connectedCallback() {
        const operator = this.data.groupOperator;
        const nodes = this.data.nodes;

        let isRoot = this.getAttribute('isRoot');
        let host: Element = this;
        if (!isRoot) {
            this.innerHTML = groupHtmlNode({ name: this.data.name });
            host = this.getElementsByClassName('message-body')[0]
        }
        for (let i = 0; i < nodes.length; i++) {
            host.appendChild(Resolver.for(nodes[i]));
            if (i + 1 !== nodes.length) {
                host.appendChild(this.createOperator(operator))
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
