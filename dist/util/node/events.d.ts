/**
 * Attaches an event listener to the document.
 * @param eventType The type of event to listen for (e.g., 'click').
 * @param listener The function to be called when the event is triggered.
 */
export declare const on: (eventType: any, listener: any) => void;
/**
 * Removes an event listener from the document.
 * @param eventType The type of event to remove the listener for.
 * @param listener The listener function to be removed.
 */
export declare const off: (eventType: any, listener: any) => void;
/**
 * Attaches an event listener that will be executed only once.
 * After the listener is called, it is automatically removed.
 * @param eventType The type of event to listen for.
 * @param listener The function to be called once when the event is triggered.
 */
export declare const once: (eventType: any, listener: any) => void;
/**
 * Triggers a custom event on the document.
 * @param eventType The name of the custom event to trigger.
 * @param data The data to be passed with the event.
 */
export declare const trigger: (eventType: any, data: any) => void;
//# sourceMappingURL=events.d.ts.map