import { TRANSLATE } from './html-elements-mapping';
import Translate from './translate';
export default class Operator extends HTMLElement {
    connectedCallback() {
        const translateNode = new Translate();
        translateNode.setAttribute("ns", "sb");
        translateNode.setAttribute("key", `plan-operator-${this.getAttribute('operator').toLocaleLowerCase()}`);
        translateNode.setAttribute("placeholder", this.getAttribute('operator'));
        this.appendChild(translateNode);
    }

}
