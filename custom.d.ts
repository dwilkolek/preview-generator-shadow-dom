interface HbsTemplate {
    (data?: any): string
}

declare module "*.hbs" {
    export var hbs: HbsTemplate
    export default hbs;
}

declare module '*.css';