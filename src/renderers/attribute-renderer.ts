import { Renderer } from '../repos/renderers';

export default class AttributeRenderer implements Renderer {
    render(template: HbsTemplate, data: any): string {
        return template({ property: data.property, operator: data.operator, value: data.value });
    }
}