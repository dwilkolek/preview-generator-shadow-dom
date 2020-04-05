import { TRANSLATE } from '../dom/html-elements-mapping';
import * as  Handlebars from 'handlebars';

export default (ns: string, entity: string, key: string, placeholder: string) => {
    if (entity) {
        return new Handlebars.SafeString(`<${TRANSLATE.selector} entity="${entity}" ns="${ns}" key="${key}" placeholder="${placeholder}"></${TRANSLATE.selector}>`);
    } else {
        return new Handlebars.SafeString(`<${TRANSLATE.selector} ns="${ns}" key="${key}" placeholder="${placeholder}"></${TRANSLATE.selector}>`);
    }
}
