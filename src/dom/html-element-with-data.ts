export default class HTMLElementWithData extends HTMLElement {
    constructor(protected data?: any){
        super();
    }
}