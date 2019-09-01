import Fragment from './fragment';

export default class Component extends Fragment {
  /*
  protected readonly pClasses: string[];
  protected readonly pParent: HTMLElement;
  protected readonly pRoot: HTMLElement; // TODO - update this to proper root container
  protected readonly pStyles: Record<string, string>;
  protected pId: string;
  protected pTemplate: string;
  protected pTemplateContent: string;
  protected pTemplateStyles: string;
  public render: () => string;

  public constructor() {
    super();

    this.pClasses = [];
    this.pStyles = {};
    // TODO - append shadow dom
  }

  get classes(): string[] { return [...this.pClasses]; }
  get id(): string { return this.pId; }
  set id(id: string) { this.pId = id; }
  get parent(): HTMLElement { return this.pParent; }
  get root(): HTMLElement { return this.pRoot; }
  get styles(): Record<string, string> { return { ...this.pStyles }; }

  public addStyles(styles: Record<string, string>): this {
    Object.keys(styles).forEach((key): void => {
      this.pStyles[key] = styles[key];
    });

    return this;
  }

  public clrStyles(): this {
    Object.keys(this.pStyles).forEach((key): void => {
      delete this.pStyles[key];
    });

    return this;
  }

  public delStyles(...styles: string[]): this {
    styles.forEach((style): void => {
      delete this.pStyles[style];
    });

    return this;
  }

  public setStyles(styles: Record<string, string>): this {
    Object.keys(this.pStyles).forEach((key): void => {
      delete this.pStyles[key];
    });

    Object.keys(styles).forEach((key): void => {
      this.pStyles[key] = styles[key];
    });

    return this;
  }

  private updateStyleTemplate(): this {
    this.pTemplateStyles = Object.keys(this.pStyles)
      .map((key): string => `${toCase.dash(key)}: ${this.pStyles[key]}`)
      .join('\n\t');

    return this;
  }

  private connectedCallback(): void {
    this.render();
  }

  private static psMapElement(elementClass: HTMLElement): void {
    const elmName = toCase.dash(elementClass.constructor.name);
    const customElement = window.customElements.get(elmName);

    if (customElement) { return; }

    window.customElements.define(elmName, elementClass.constructor);
  }
  */
}
