import { toCase } from '../utils/index';

export default abstract class Element extends HTMLElement {
  private pChildren: HTMLElement[];
  private pObserver: MutationObserver;
  private pParent: HTMLElement;
  private pRoot: HTMLElement;
  private pProps: Record<string, string>;
  private pState: Record<string, string>;
  private pStatus: Record<string, boolean>;

  protected abstract rendered?(): void;
  protected abstract updated?(): void;
  protected abstract removed?(): void;

  public static propTypes: Record<string, string> = {};

  public constructor() {
    super();

    this.pChildren = [];
    this.pProps = {};
    this.pState = {};
    this.pStatus = {};
  }

  protected render(): string {
    return this.pChildren.map((child): string => child.outerHTML).join('\n');
  }

  protected get parent(): HTMLElement { return this.pParent; }
  protected get props(): Record<string, string> { return { ...this.pProps }; }
  protected get root(): HTMLElement { return this.pRoot; }

  protected get state(): Record<string, string> { return { ...this.pState }; }
  protected set state(state: Record<string, string>) {
    if (this.pStatus.initialized) {
      throw new Error('cannot set state using this class member after initialization');
    }
    this.pState = state;
  }

  private static get observedAttributes(): string[] {
    return Object.keys(this.propTypes);
  }

  private trigger(e: 'removed' | 'render' | 'rendered' | 'updated'): void {
    switch (e) {
      case 'removed':
        if (this.removed) { this.removed(); }
        break;

      case 'render':
        if (this.pStatus.initialized) {
          this.innerHTML = this.render();
          this.trigger('rendered');
        }
        break;

      case 'rendered':
        if (this.rendered) { this.rendered(); }
        break;

      case 'updated':
        if (this.updated) { this.updated(); }
        break;

      default:
    }
  }

  private propsUpdated(): void {
    this.trigger('updated');
    this.trigger('render');
  }

  private stateUpdated(): void {
    this.trigger('updated');
    this.trigger('render');
  }

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

  private connectedCallback(): void {
    this.mapObservers();
    this.mapAttributes();

    this.pRoot = this.findRoot();

    this.pStatus.initialized = true;

    this.trigger('render');
  }

  private mapAttributes(): void {
    Object.keys(this.pProps).forEach((key): void => {
      delete this.pProps[key];
    });

    Array.from(this.attributes).forEach((attribute): void => {
      if (['id', 'class', 'style'].includes(attribute.name)) { return; }
      this.pProps[attribute.name] = attribute.value;
    });

    if (!this.pStatus.initialized) { this.propsUpdated(); }
  }

  private mapChildren(): this {
    this.pChildren = Array.from(this.children).map((child): HTMLElement => child as HTMLElement);

    return this;
  }

  private mapObservers(): void {
    this.pObserver = new MutationObserver((mutations: MutationRecord[]): void => {
      mutations.forEach((mutation): void => {
        switch (mutation.type) {
          case 'attributes': this.mapAttributes(); break;
          case 'childList': this.mapChildren(); break;
          default:
        }
      });
    });

    this.pObserver.observe(this, { attributes: true, childList: true });
  }

  public static registerElement(elmConstructor: Function, name?: string): void {
    const elmName = name || toCase.dash(elmConstructor.name);
    const customElement = window.customElements.get(elmName);

    if (customElement) { return; }

    window.customElements.define(elmName, elmConstructor);
  }
}
