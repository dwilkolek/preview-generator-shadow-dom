import htmlElementsMapping from './dom/html-elements-mapping';

Object.keys(htmlElementsMapping).forEach(key => {
    let customElement = htmlElementsMapping[key];
    customElements.define(customElement.selector, customElement.clazz);    
})