import { toCase } from '../utils/index';
export default class Laconic extends HTMLElement {
    constructor() {
        super();
        console.log(this.childNodes);
    }
}
(() => {
    const elmName = toCase.dash(Laconic.name);
    const customElement = window.customElements.get(elmName);
    if (customElement) {
        return;
    }
    window.customElements.define(elmName + '-core', Laconic);
})();
