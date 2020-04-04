const fallbackRenderer = (template, data) => {
    return template(data);
}

class RendererRepo {
    constructor() {
        this.renderers = {};
    }
    addRenderer(name, template) {
        this.renderers[name] = template;
    }

    getRenderer(name) {
        return this.renderers[name] || fallbackRenderer;
    }    
}
const rendererRepo = new RendererRepo();
rendererRepo.addRenderer('String', (template, data) => {
    return template({property: data.property, operator: data.operator, value: data.value});
});
export default rendererRepo;