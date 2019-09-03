import { toCase } from '../utils/index';

export default class Element extends HTMLElement {
  private pChildren: HTMLElement[];
  private pObserver: MutationObserver;
  private pParent: HTMLElement;
  private pRoot: HTMLElement;
  private pProps: Record<string, string>;
  private pState: Record<string, string>;

  public initialize: () => void = () => null;
  public rendered: () => void = () => null;
  public updated: () => void = () => null;
  public removed: () => void = () => null;
  public render: () => string = () => '';

  public static propTypes: Record<string, string> = {};

  public constructor() {
    super();

    this.pProps = {};
    this.pState = {};
  }

  protected get parent(): HTMLElement { return this.pParent; }
  protected get root(): HTMLElement { return this.pRoot; }

  protected get state(): Record<string, string> { return { ...this.pState }; }
  protected get props(): Record<string, string> { return { ...this.pProps }; }

  private static get observedAttributes(): string[] {
    return Object.keys(this.propTypes);
  }

  private propsUpdated(): void { this.updated(); }
  private stateUpdated(): void { this.updated(); }

  protected setState(newState: Record<string, string>): void {
    Object.keys(newState).forEach((key): void => {
      this.pState[key] = newState[key];
    });

    this.stateUpdated();
  }

  private findRoot(): HTMLElement {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let parent: HTMLElement = this;

    while (parent.tagName !== 'LACONIC-CORE' && parent.tagName !== 'BODY') {
      parent = parent.parentElement;
    }

    return parent;
  }

  private attributeChangedCallback(): void {
    console.log('changed');
    this.mapAttributes();
    this.propsUpdated();
  }

  private connectedCallback(): void {
    this.mapObservers();
    this.mapAttributes();
    this.initialize();
    this.innerHTML = this.render();
    this.rendered();
    this.pRoot = this.findRoot();
  }

  private mapAttributes(): void {
    Object.keys(this.pProps).forEach((key): void => {
      delete this.pProps[key];
    });

    Array.from(this.attributes).forEach((attribute): void => {
      if (['id', 'class', 'style'].includes(attribute.name)) { return; }
      this.pProps[attribute.name] = attribute.value;
    });
  }

  private mapChildren(): void {

  }

  private mapObservers(): void {
    this.pObserver = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver): void => {
      mutations.forEach((mutation): void => {
        switch (mutation.type) {
          case 'attributes': break;
          case 'children': break;
        }
      })
    });
  }

  public static registerElement(elmConstructor: Function, name?: string): void {
    const elmName = name || toCase.dash(elmConstructor.name);
    const customElement = window.customElements.get(elmName);

    if (customElement) { return; }

    window.customElements.define(elmName, elmConstructor);
  }
}
