import htmlElementsMapping from '../dom/html-elements-mapping';

const t = function (ns, entity, key, placeholder) {
    if (entity) {
        return `<${htmlElementsMapping.TRANSLATE.selector} entity="${entity}" ns="${ns}" key="${key}" placeholder="${placeholder}"></${htmlElementsMapping.TRANSLATE.selector}>`;
    } else {
        return `<${htmlElementsMapping.TRANSLATE.selector} ns="${ns}" key="${key}" placeholder="${placeholder}"></${htmlElementsMapping.TRANSLATE.selector}>`;
    }
    
};
export default t;