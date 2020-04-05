import { TRANSLATE } from '../dom/html-elements-mapping';

export default (ns: string, entity: string, key: string, placeholder: string) => {
    if (entity) {
        return `<${TRANSLATE.selector} entity="${entity}" ns="${ns}" key="${key}" placeholder="${placeholder}"></${TRANSLATE.selector}>`;
    } else {
        return `<${TRANSLATE.selector} ns="${ns}" key="${key}" placeholder="${placeholder}"></${TRANSLATE.selector}>`;
    }

}
