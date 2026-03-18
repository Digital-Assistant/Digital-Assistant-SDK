export declare let timer: any;
/**
 * Export observer as a getter for backward compatibility.
 * This allows existing code using `observer.observe()` to continue working.
 */
export declare const observer: {
    observe: (target: Node, options?: MutationObserverInit) => void;
    disconnect: () => void;
    takeRecords: () => MutationRecord[];
};
/**
 * Initializes the DOM change observation.
 * This function starts the `MutationObserver` to watch for attribute changes,
 * child list modifications, and subtree changes on the `document.body`.
 */
export declare function initializeDomChanges(): void;
/**
 * @internal
 * This function is exported for testing purposes only to reset the module-level timer.
 */
export declare function _resetTimerForTest(): void;
//# sourceMappingURL=domChanges.d.ts.map