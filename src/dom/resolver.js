import htmlElementsMapping from './html-elements-mapping';
class Resolver {    
    for(data, optionalIsRoot) {
        let isGroup = data.nodeType == "Group";
        let element = document.createElement((isGroup ? htmlElementsMapping.GROUP : htmlElementsMapping.NODE).selector);
        element.data = data;
        if (optionalIsRoot) {
            element.setAttribute('isRoot', optionalIsRoot);
        }
        return element;
    }
}

export default new Resolver();