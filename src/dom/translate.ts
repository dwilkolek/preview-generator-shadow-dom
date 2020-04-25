import Translator, { DEFAULT_ENTITY_TYPE } from '../repos/translator'
export default class Translate extends HTMLElement {
    connectedCallback() {
        const ns = this.getAttribute("ns");
        const entity = this.getAttribute("entity") || DEFAULT_ENTITY_TYPE;
        const key = this.getAttribute("key");
        const placeholder = this.getAttribute("placeholder");
        this.innerHTML = placeholder || key;

        Translator.translate(ns, key, entity).then(tranlsation => {
            this.innerHTML = tranlsation;
            this.classList.add('translated');
        }).catch(console.log)
    }
}