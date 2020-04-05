import htmlElementsMapping from './dom/html-elements-mapping';
htmlElementsMapping.forEach(mapping => {
    customElements.define(mapping.selector, mapping.clazz);
})