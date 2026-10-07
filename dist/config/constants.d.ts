/**
 * Author: Lakshman Veti
 * Type: MAP
 * Objective: Config Objects
 */
interface ConfigType {
    current: string;
    UDADebug: boolean;
    UDA_CONTAINER_CLASS: string;
    UDA_CLICK_IGNORE_CLASS: string;
    UDA_DOMAIN: string | undefined;
    UDA_API_URL: string | undefined;
    UDASessionID: string;
    UDA_POST_INTERVAL: number;
    UDALastMutationTime: number;
    UDALogLevel: number;
    RECORDING_IS_PLAYING: string;
    RECORDING_MANUAL_PLAY: string;
    RECORDING_SWITCH_KEY: string;
    RECORDING_SEQUENCE: string;
    RECORDING_SEQUENCE_REDUX: string;
    SELECTED_RECORDING: string;
    USER_AUTH_DATA_KEY: string;
    UserScreenAcceptance: string;
    USER_SESSION_KEY: string;
    UDAKeyCloakKey: string;
    USER_SESSION_ID: string;
    SYNC_INTERVAL: number;
    AUTO_PLAY_SLEEP_TIME: number;
    lastClickedTime: number | null;
    specialNodeKey: string;
    enableInfiniteScroll: boolean;
    enableInfiniteScrollPageLength: number;
    UDA_URL_Param: string;
    Environment: string;
    DEBOUNCE_INTERVAL: number;
    indexInterval: number;
    clickObjects: any[];
    nodeId: number;
    isRecording: boolean;
    htmlIndex: any[];
    invokeTime: number;
    apiInvokeTime: number;
    maxStringLength: number;
    autoplayCompleted: boolean;
    autoplayPaused: boolean;
    invokedActionManually: boolean;
    profanity: {
        enabled: boolean;
        provider: string;
        config: {
            key1: string | undefined;
            key2: string | undefined;
            endPoint: string | undefined;
            region: string | undefined;
        };
    };
    multilingual: {
        enabled: boolean;
        searchInLang: string;
        selectedLang: string;
        displayText: string;
        translatedText: string;
        translate: {
            provider: string;
            apikey: string | undefined;
            translateTo: string;
            apiurl: string | undefined;
        };
    };
    bcpLang: (string | string[])[][];
    enableNodeTypeChangeSelection: boolean;
    enableNodeTypeSelection: boolean;
    cspUserAcceptance: {
        storageName: string;
        data: {
            proceed: boolean;
        };
    };
    screenAcceptance: {
        storageName: string;
        data: {
            proceed: boolean;
        };
    };
    playNextAction: boolean;
    navigatedToNextPage: {
        check: boolean;
        url: string;
    };
}
export declare const CONFIG: ConfigType;
export {};
//# sourceMappingURL=constants.d.ts.map