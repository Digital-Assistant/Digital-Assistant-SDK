/**
 * Checks the screen size and determines plugin compatibility and alert status.
 *
 * This function is intended to evaluate the current screen resolution against minimum
 * and optimal requirements to decide if a plugin should be enabled and if a warning
 * should be displayed to the user.
 *
 * Minimum requirements:
 * - Height: 720px
 * - Width: 1280px
 *
 * Optimal requirements:
 * - Height: 1080px
 * - Width: 1920px
 *
 * @returns {Object} An object containing:
 *   - `enablePluginForScreen`: `boolean` - Whether the plugin should be enabled.
 *   - `showScreenAlert`: `boolean` - Whether to show a resolution warning.
 */
export declare const checkScreenSize: () => {
    enablePluginForScreen: boolean;
    showScreenAlert: boolean;
};
//# sourceMappingURL=checkScreenSize.d.ts.map