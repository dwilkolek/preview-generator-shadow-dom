import { TRANSLATE } from './html-elements-mapping';
import Translate from './translate';
import operatorHtmlNode from '../templates/operator-html-node.hbs';

export default class Operator extends HTMLElement {
    connectedCallback() {

        this.innerHTML = operatorHtmlNode({ operator: this.getAttribute('operator').toLocaleLowerCase() });

        //     const translateNode = new Translate();
        //     translateNode.setAttribute("ns", "sb");
        //     translateNode.setAttribute("key", `plan-operator-${this.getAttribute('operator').toLocaleLowerCase()}`);
        //     translateNode.setAttribute("placeholder", this.getAttribute('operator'));
        //     this.appendChild(translateNode);
        // }

    }
}