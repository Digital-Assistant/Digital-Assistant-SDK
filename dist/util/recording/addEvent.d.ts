/**
 * Attaches an event listener to a given DOM node.
 * If a callback function is provided, it will be used as the event handler.
 * Otherwise, a default handler that records user clicks will be attached.
 *
 * @param node The DOM node to which the event listener will be added.
 * @param eventType The type of event to listen for (e.g., 'click', 'mouseover').
 * @param callback An optional function to serve as the event handler. If null, a default click recorder is used.
 */
export declare const addEvent: (node: any, eventType: string, callback?: (Function | null)) => void;
//# sourceMappingURL=addEvent.d.ts.map