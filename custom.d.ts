type HbsTemplate = Handlebars.TemplateDelegate;
declare module "*.hbs" {
    export var hbs: HbsTemplate
    export default hbs;
}

declare module '*.css';