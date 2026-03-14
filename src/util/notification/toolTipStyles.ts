/**
 * Tooltip CSS styles migrated from the old UI (UDAN.scss).
 * These styles are intended to be injected into the Shadow DOM where the tooltip is placed.
 */
export const tooltipStyles = `
.uda-tooltip {
    position: absolute;
    min-width: 200px;
    max-width: 300px;
    text-align: center;
    color: #05f; /* $uda-primary-color */
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #05f; /* $uda-primary-color */
    transition: opacity 0.6s;
    background-color: #f2f4fe; /* $uda-tooltip-bg */
    box-shadow: 0 1px 16px #e0e0e0; /* $uda-boxshodow-color */
    z-index: 10000000;
    font-family: 'Raleway', sans-serif;
}

.uda-tooltip-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}

.uda-tooltip-exit-btn {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
    padding: 0;
}

.uda-tooltip-exit-btn svg {
    color: #05f; /* $uda-primary-color */
    stroke: #05f; /* $uda-primary-color */
}

.uda-tooltip-exit-btn:hover {
    background-color: #e0e0e0;
}

.uda-tooltip-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    position: relative;
    gap: 10px;
}

.uda-tutorial-btn {
    background-color: #05f; /* $uda-primary-color */
    border: none;
    outline: none;
    color: #fff; /* $uda-text-color-bg-white */
    border-radius: 5px;
    padding: 5px 12px;
    font-size: 14px;
    cursor: pointer;
    height: 30px;
}

.uda-tutorial-btn:hover {
    background-color: #ff5722; /* $uda-secondary-color */
}

.uda-tooltip-direction-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.3s;
}

.uda-tooltip-direction-btn:hover {
    background-color: #e0e0e0;
}

.uda-tooltip-direction-btn svg {
    color: #05f; /* $uda-primary-color */
}

.uda-tooltip-text-content {
    margin: 5px !important;
    font-size: 14px;
    color: #000;
}

.uda-arrow {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: transparent;
    visibility: hidden;
}

.uda-arrow::before {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #f2f4fe; /* $uda-tooltip-bg */
    visibility: visible;
    content: "";
    transform: rotate(45deg);
}

/* Position-specific arrow styles */
.uda-tooltip[data-popper-placement^="top"] > .uda-arrow {
    bottom: -6px;
}
.uda-tooltip[data-popper-placement^="top"] > .uda-arrow::before {
    border-right: 1px solid #05f;
    border-bottom: 1px solid #05f;
}

.uda-tooltip[data-popper-placement^="right"] > .uda-arrow {
    left: -6px;
}
.uda-tooltip[data-popper-placement^="right"] > .uda-arrow::before {
    border-left: 1px solid #05f;
    border-bottom: 1px solid #05f;
}

.uda-tooltip[data-popper-placement^="bottom"] > .uda-arrow {
    top: -6px;
}
.uda-tooltip[data-popper-placement^="bottom"] > .uda-arrow::before {
    border-top: 1px solid #05f;
    border-left: 1px solid #05f;
}

.uda-tooltip[data-popper-placement^="left"] > .uda-arrow {
    right: -6px;
}
.uda-tooltip[data-popper-placement^="left"] > .uda-arrow::before {
    border-right: 1px solid #05f;
    border-top: 1px solid #05f;
}
`;

/**
 * Injects the tooltip styles into the given ShadowRoot.
 */
export const injectToolTipStyles = (shadowRoot: ShadowRoot) => {
    const styleId = "uda-tooltip-styles";
    if (shadowRoot.getElementById(styleId)) return;

    const styleElement = document.createElement("style");
    styleElement.id = styleId;
    styleElement.textContent = tooltipStyles;
    shadowRoot.appendChild(styleElement);
};
