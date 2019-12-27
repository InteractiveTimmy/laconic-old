import { toCase } from '../utils/index';
export default class Element extends HTMLElement {
    constructor() {
        super();
        this.pChildren = [];
        this.pProps = {};
        this.pState = {};
        this.pStatus = {};
    }
    render() {
        return this.pChildren.map((child) => child.outerHTML).join('\n');
    }
    get parent() { return this.pParent; }
    get props() { return Object.assign({}, this.pProps); }
    get root() { return this.pRoot; }
    get state() { return Object.assign({}, this.pState); }
    set state(state) {
        if (this.pStatus.initialized) {
            throw new Error('cannot set state using this class member after initialization');
        }
        this.pState = state;
    }
    static get observedAttributes() {
        return Object.keys(this.propTypes);
    }
    trigger(e) {
        switch (e) {
            case 'removed':
                if (this.removed) {
                    this.removed();
                }
                break;
            case 'render':
                if (this.pStatus.initialized) {
                    this.innerHTML = this.render();
                    this.trigger('rendered');
                }
                break;
            case 'rendered':
                if (this.rendered) {
                    this.rendered();
                }
                break;
            case 'updated':
                if (this.updated) {
                    this.updated();
                }
                break;
            default:
        }
    }
    propsUpdated() {
        this.trigger('updated');
        this.trigger('render');
    }
    stateUpdated() {
        this.trigger('updated');
        this.trigger('render');
    }
    setState(newState) {
        Object.keys(newState).forEach((key) => {
            this.pState[key] = newState[key];
        });
        this.stateUpdated();
    }
    findRoot() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let parent = this;
        while (parent.tagName !== 'LACONIC-CORE' && parent.tagName !== 'BODY') {
            parent = parent.parentElement;
        }
        return parent;
    }
    connectedCallback() {
        this.mapObservers();
        this.mapAttributes();
        this.pRoot = this.findRoot();
        this.pStatus.initialized = true;
        this.trigger('render');
    }
    mapAttributes() {
        Object.keys(this.pProps).forEach((key) => {
            delete this.pProps[key];
        });
        Array.from(this.attributes).forEach((attribute) => {
            if (['id', 'class', 'style'].includes(attribute.name)) {
                return;
            }
            this.pProps[attribute.name] = attribute.value;
        });
        if (!this.pStatus.initialized) {
            this.propsUpdated();
        }
    }
    mapChildren() {
        this.pChildren = Array.from(this.children).map((child) => child);
        return this;
    }
    mapObservers() {
        this.pObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                switch (mutation.type) {
                    case 'attributes':
                        this.mapAttributes();
                        break;
                    case 'childList':
                        this.mapChildren();
                        break;
                    default:
                }
            });
        });
        this.pObserver.observe(this, { attributes: true, childList: true });
    }
    static registerElement(elmConstructor, name) {
        const elmName = name || toCase.dash(elmConstructor.name);
        const customElement = window.customElements.get(elmName);
        if (customElement) {
            return;
        }
        window.customElements.define(elmName, elmConstructor);
    }
}
Element.propTypes = {};
