/**
 * Extracts the direct inner text of a DOM element, excluding text from nested elements.
 * This function first attempts to use the native `innerText` or `textContent` properties.
 * If those are not suitable, it falls back to recursively collecting text from immediate child text nodes.
 *
 * @param element The DOM element from which to extract the text.
 * @returns The direct inner text of the element, with whitespace normalized. Returns an empty string if no text is found.
 */
export declare const getDirectInnerText: (element: any) => string;
//# sourceMappingURL=getDirectInnerText.d.ts.map