var fallbackTemplate = require("../templates/fallback.hbs");
var stringTemplate = require("../templates/string.hbs");
class TemplateRepo {
    constructor() {
        this.templates = {};
    }
    addTemplate(name, template) {
        this.templates[name] = template;
    }

    getTemplate(name) {
        return this.templates[name] || fallbackTemplate;
    }
}
const templateRepo = new TemplateRepo();
templateRepo.addTemplate('String', stringTemplate);
export default templateRepo;