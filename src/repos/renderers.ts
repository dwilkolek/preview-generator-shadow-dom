import AttributeRenderer from "../renderers/attribute-renderer";

class FallbackRenderer implements Renderer {
    render(template: HbsTemplate, data: any) {
        return template(data);
    }
}

export interface Renderer {
    render: (template: HbsTemplate, data: any) => string
}

class RendererRepo {

    fallbackRenderer = new FallbackRenderer();

    constructor() {
        this.addRenderer('String', new AttributeRenderer());
    }

    renderers: { [key: string]: Renderer } = {};

    addRenderer(name: string, renderer: Renderer) {
        this.renderers[name] = renderer;
    }

    getRenderer(name: string): Renderer {
        return this.renderers[name] || this.fallbackRenderer;
    }
}
const rendererRepo = new RendererRepo();
export default rendererRepo;