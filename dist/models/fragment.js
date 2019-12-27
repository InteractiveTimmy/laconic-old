import { toCase } from '../utils/index';
export default class Fragment extends HTMLElement {
    constructor() {
        super();
        this.render = () => '';
        this.pProps = {};
        this.pState = {};
    }
    get parent() { return this.pParent; }
    get root() { return this.pRoot; }
    findRoot() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let parent = this;
        while (parent.tagName !== 'LACONIC-CORE' && parent.tagName !== 'BODY') {
            parent = parent.parentElement;
        }
        return parent;
    }
    connectedCallback() {
        this.innerHTML = this.render();
        this.pRoot = this.findRoot();
        console.log(this.root);
    }
    static mapElement(elmConstructor, name) {
        const elmName = name || toCase.dash(elmConstructor.name);
        const customElement = window.customElements.get(elmName);
        if (customElement) {
            return;
        }
        window.customElements.define(elmName, elmConstructor);
    }
}
Fragment.mapElement(Fragment, 'laconic-fragment');
