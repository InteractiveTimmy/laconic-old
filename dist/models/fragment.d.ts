export default class Fragment extends HTMLElement {
    protected readonly pParent: HTMLElement;
    protected pRoot: HTMLElement;
    protected pProps: Record<string, string>;
    protected pState: Record<string, string>;
    protected pTemplate: string;
    protected pTemplateContent: string;
    render: () => string;
    constructor();
    readonly parent: HTMLElement;
    readonly root: HTMLElement;
    private findRoot;
    protected connectedCallback(): void;
    static mapElement(elmConstructor: Function, name?: string): void;
}
