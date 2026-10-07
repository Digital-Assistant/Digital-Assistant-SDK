/**
 * Calculates the absolute coordinates (x, y) of an HTML element relative to the document.
 * This function traverses up the DOM tree from the given element, accumulating the `offsetLeft` and `offsetTop`
 * of each `offsetParent` and subtracting the `scrollLeft` and `scrollTop` to get the final
 * position on the page.
 *
 * @param element The HTML element for which to calculate the absolute offsets.
 * @returns An object with `x` and `y` properties representing the absolute coordinates.
 */
export declare const getAbsoluteOffsets: (element: HTMLElement) => {
    x: number;
    y: number;
};
//# sourceMappingURL=getAbsoluteOffsets.d.ts.map