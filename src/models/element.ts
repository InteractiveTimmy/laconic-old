import { toCase } from '../utils/index';

export default abstract class Element<P, S> extends HTMLElement {
  /** An observed array of immediate `HTMLElement` children. */
  private pChildElements: HTMLElement[];

  /** `MutationObserver` object for observed members. */
  private pObserver: MutationObserver;

  /** Immediate parent `HTMLElement`. */
  private pParent: HTMLElement;

  /** Application's `Root` class instance. */
  private pRoot: Element<any, any>;

  /** Typed `Element` attributes. */
  private pProps: P;

  /** Typed `Element` state values. */
  private pState: S;

  /** Status checks. */
  private pStatus: Record<string, boolean>;

  /**
   * Gets called every time {@link Element.trigger | `trigger('rendered')`} is
   * called.
   *
   * @public
   * @override
   */
  protected abstract rendered?(): void;

  /**
   * Gets called every time {@link Element.trigger | `trigger('updated')`} is
   * called.
   *
   * @public
   * @override
   */
  protected abstract unpdated?(): void;

  /**
   * Gets called every time {@link Element.trigger | `trigger('removed')`} is
   * called.
   *
   * @public
   * @override
   */
  protected abstract removed?(): void;

  /**
   * Class constructor.
   * @public
   */
  public constructor() {
    super();

    this.pChildElements = [];
    this.pProps = {} as P;
    this.pState = {} as S;
    this.pStatus = {};
  }

  /**
   * Get the current `Element`'s state.
   * @public
   *
   * @returns - The current `Element` {@link Element.state | state}
   */
  public get state(): S { return { ...this.pState }; }

  /**
   * Get the current `Element`'s props.
   * @public
   *
   * @returns - The current `Element` {@link Element.props | props}
   */
  public get props(): P { return { ...this.pProps }; }

  public get root(): HTMLElement<any, any> { return this.pRoot; }
}
