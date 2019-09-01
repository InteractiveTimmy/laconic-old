import { toCase } from '../utils/index';

export default class Fragment extends HTMLElement {
  protected readonly pParent: HTMLElement;
  protected pRoot: HTMLElement;
  protected pProps: Record<string, string>;
  protected pState: Record<string, string>;
  protected pTemplate: string;
  protected pTemplateContent: string;
  public render: () => string = () => '';

  public constructor() {
    super();

    this.pProps = {};
    this.pState = {};
  }

  get parent(): HTMLElement { return this.pParent; }
  get root(): HTMLElement { return this.pRoot; }

  private findRoot(): HTMLElement {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let parent: HTMLElement = this;

    while (parent.tagName !== 'LACONIC-CORE' && parent.tagName !== 'BODY') {
      parent = parent.parentElement;
    }

    return parent;
  }

  protected connectedCallback(): void {
    this.innerHTML = this.render();

    this.pRoot = this.findRoot();

    console.log(this.root);
  }

  public static mapElement(elmConstructor: Function, name?: string): void {
    const elmName = name || toCase.dash(elmConstructor.name);
    const customElement = window.customElements.get(elmName);

    if (customElement) { return; }

    window.customElements.define(elmName, elmConstructor);
  }
}

Fragment.mapElement(Fragment, 'laconic-fragment');
