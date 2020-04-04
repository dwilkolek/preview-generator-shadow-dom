import Resolver from './resolver';
import htmlElementsMapping from './html-elements-mapping'
class Group extends HTMLElement {
    constructor() {
        super();
    }

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

    createOperator(operator) {
        let node = document.createElement(htmlElementsMapping.OPERATOR.selector);
        node.setAttribute("operator", operator);
        return node;
    }

}

export default Group