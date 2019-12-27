export default class Simple extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = 'hello';
    }
}
