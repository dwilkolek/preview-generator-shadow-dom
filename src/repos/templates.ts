import fallbackTemplate from "../templates/fallback.hbs";
import stringTemplate from "../templates/string.hbs";

export class TemplateRepo {
    templates: { [key: string]: HbsTemplate } = {};

    constructor() {
        debugger
        this.addTemplate('String', stringTemplate);
    }

    addTemplate(name: string, template: HbsTemplate) {
        this.templates[name] = template;
    }

    getTemplate(name: string): HbsTemplate {
        return this.templates[name] || fallbackTemplate;
    }
}
export default new TemplateRepo();