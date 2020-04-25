export default class HTMLElementWithData extends HTMLElement {
    protected data: any;
    constructor(data?: any){
        super();
        if (data && data.attributes) {
            Object.assign(data, data.attributes);
        }
        this.data = data;
    }
}