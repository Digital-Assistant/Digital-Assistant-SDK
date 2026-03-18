/**
 * Detects the browser and returns whether the UDA plugin is enabled, the browser variable, and the identified browser.
 * @returns {{enableUDAPlugin: boolean, udaBrowserVar: any, udaIdentifiedBrowser: (false | BrowserInfo | BotInfo)}}
 */
export declare const checkBrowser: () => {
    enableUDAPlugin: boolean;
    udaBrowserVar: any;
    udaIdentifiedBrowser: import("detect-browser").BrowserInfo | import("detect-browser").SearchBotDeviceInfo | import("detect-browser").BotInfo | import("detect-browser").NodeInfo | import("detect-browser").ReactNativeInfo | null;
};
//# sourceMappingURL=checkBrowser.d.ts.map