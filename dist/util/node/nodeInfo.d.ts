/**
 * Node Information Utility Module
 *
 * This module provides comprehensive utilities for extracting detailed information
 * about DOM elements, including their positioning, screen dimensions, zoom factors,
 * and coordinate calculations. It handles cross-browser compatibility and provides
 * accurate measurements for both viewport and page-relative positioning.
 */
/**
 * Retrieves comprehensive information about a DOM element's positioning and context.
 *
 * This function aggregates multiple pieces of information about a DOM element, including
 * its position relative to the viewport, its position on the page, screen dimensions,
 * and current zoom settings. This data is essential for accurate element positioning
 * and interaction calculations.
 *
 * @param {HTMLElement} node - The DOM element to analyze. Must be a valid HTMLElement
 *                             that exists in the document and has positioning information.
 *
 * @returns {Object} A complete node information object containing:
 *   - nodePosition: A DOMRect with viewport-relative positioning.
 *   - screenSize: Screen dimensions and scroll information.
 *   - nodePagePosition: Page-relative positioning with scroll offsets.
 *   - zoomInfo: Comprehensive zoom factor information.
 *
 * @example
 * const element = document.getElementById('myElement');
 * const info = getNodeInfo(element);
 * console.log(info.nodePosition.top); // Viewport-relative top position
 * console.log(info.nodePagePosition.top); // Page-relative top position
 */
export declare const getNodeInfo: (node: HTMLElement) => {
    nodePosition: any;
    screenSize: any;
    nodePagePosition: any;
    zoomInfo: {
        systemDpiScale: number;
        browserZoomFactor: number;
        totalEffectiveZoom: number;
        systemDpiScalePercentage: string;
        browserZoomFactorPercentage: string;
        totalEffectiveZoomPercentage: string;
    };
};
/**
 * Detects the current browser zoom factor, independent of system DPI scaling.
 *
 * This function creates a temporary DOM element with known CSS dimensions and measures
 * its actual rendered size to determine the browser's zoom level. This method is
 * independent of system DPI scaling and provides accurate browser zoom detection
 * across different browsers and operating systems.
 *
 * The technique works by:
 * 1. Creating a test element with fixed CSS dimensions (100px).
 * 2. Measuring the actual rendered dimensions.
 * 3. Calculating the ratio to determine the zoom factor.
 *
 * @returns {number} The browser zoom factor as a decimal (1.0 = 100%, 1.5 = 150%, etc.).
 *                   Returns 1.0 if not in a browser environment or if detection fails.
 *
 * @example
 * const zoom = getBrowserZoomFactor();
 * console.log(`Browser zoom: ${(zoom * 100).toFixed(0)}%`);
 * // Output: "Browser zoom: 125%" for a 125% zoom level
 */
export declare const getBrowserZoomFactor: () => number;
/**
 * Provides comprehensive zoom information, including browser zoom and system DPI scaling.
 *
 * This function combines browser zoom detection with system DPI information to provide
 * a complete picture of all scaling factors affecting element rendering. It distinguishes
_DOC_
 * between user-controlled browser zoom and system-level DPI scaling, which is crucial
 * for accurate positioning and interaction calculations.
 *
 * @returns {Object} A comprehensive zoom information object containing:
 *   - systemDpiScale: The system DPI scaling factor (from devicePixelRatio).
 *   - browserZoomFactor: The browser zoom level (user-controlled).
 *   - totalEffectiveZoom: The combined effect of both scaling factors.
 *   - systemDpiScalePercentage: DPI scaling as a percentage string.
 *   - browserZoomFactorPercentage: Browser zoom as a percentage string.
 *   - totalEffectiveZoomPercentage: Total zoom as a percentage string.
 *
 * @example
 * const zoomInfo = getEffectiveZoomInfo();
 * console.log(`System DPI: ${zoomInfo.systemDpiScalePercentage}`);
 * console.log(`Browser Zoom: ${zoomInfo.browserZoomFactorPercentage}`);
 * console.log(`Total Effective: ${zoomInfo.totalEffectiveZoomPercentage}`);
 */
export declare const getEffectiveZoomInfo: () => {
    systemDpiScale: number;
    browserZoomFactor: number;
    totalEffectiveZoom: number;
    systemDpiScalePercentage: string;
    browserZoomFactorPercentage: string;
    totalEffectiveZoomPercentage: string;
};
//# sourceMappingURL=nodeInfo.d.ts.map