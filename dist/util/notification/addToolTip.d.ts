/**
 * Adds a tooltip to a target element, positioned using Popper.js.
 *
 * @param invokingNode The node that triggered the tooltip.
 * @param tooltipNode The target element to which the tooltip is attached.
 * @param recordedData Data from a recording, which may contain tooltip information.
 * @param navigationCookieData Data from a navigation cookie.
 * @param enableClick A boolean to enable a click on the invoking node.
 * @param enableFocus A boolean to enable focus on the invoking node.
 * @param enableAnimate A boolean to enable animation.
 * @param message The message to be displayed in the tooltip.
 * @param showButtons A boolean to show buttons in the tooltip.
 * @param isNavigating A boolean indicating if a navigation is in progress.
 */
export declare const addToolTip: (invokingNode: any, tooltipNode: any, recordedData: any, navigationCookieData: any, enableClick?: boolean, enableFocus?: boolean, enableAnimate?: boolean, message?: string, showButtons?: boolean, isNavigating?: boolean) => void;
/**
 * Updates the tooltip's position based on the user's selection.
 * @param position The new position for the tooltip ('top', 'right', 'bottom', or 'left').
 */
export declare const updateTooltipPosition: (position: string) => void;
/**
 * Removes the tooltip element from the DOM.
 */
export declare const removeToolTip: () => void;
//# sourceMappingURL=addToolTip.d.ts.map