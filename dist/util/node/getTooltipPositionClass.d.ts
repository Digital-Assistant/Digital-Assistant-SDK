/**
 * Defines the possible base positions for a tooltip.
 */
type TooltipPosition = "top" | "right" | "bottom" | "left";
/**
 * Defines the possible position variants, including start and end modifiers.
 */
type TooltipPositionVariant = TooltipPosition | `${TooltipPosition}-start` | `${TooltipPosition}-end`;
/**
 * Represents the result of a tooltip position calculation.
 */
interface TooltipPositionResult {
    finalCssClass: TooltipPositionVariant;
    availablePositions: TooltipPosition[];
}
/**
 * Determines the optimal position for a tooltip relative to its target element.
 *
 * @param targetElement The element the tooltip is attached to.
 * @param tooltipElement The tooltip element itself.
 * @param selectedPosition The preferred position, or 'auto' to determine automatically.
 * @param currentToolTipPositionClass The current position class if the tooltip is already positioned.
 * @param availablePositionsForElement A list of allowed positions for this element.
 * @returns An object containing the final CSS class and a list of available positions.
 */
export declare const getTooltipPositionClass: (targetElement: HTMLElement, tooltipElement: HTMLElement, selectedPosition?: string, currentToolTipPositionClass?: string, availablePositionsForElement?: string[]) => TooltipPositionResult;
export {};
//# sourceMappingURL=getTooltipPositionClass.d.ts.map