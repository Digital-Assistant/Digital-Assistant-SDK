/**
 * Author: Yureswar Ravuri
 * Type: MAP
 * Objective: Config Objects
 */
export interface CustomConfigPropTypes {
    enableEditClickedName: boolean;
    enableSkipDuringPlay: boolean;
    enableTooltipAddition: boolean;
    enableMultilingual: boolean;
    enablePermissions: boolean;
    permissions: object;
    enableProfanity: boolean;
    enableNodeTypeSelection: boolean;
    enableRecording: boolean;
    enableOverlay: boolean;
    environment: string;
    enableUdaIcon: boolean;
    udaDivId: string;
    enableForAllDomains: boolean;
    enableSpeechToText: boolean;
    enableSlowReplay: boolean;
    enableCustomIcon: boolean;
    customIcon: string;
    realm: string | undefined;
    clientId: string | undefined;
    clientSecret: string | undefined;
    keycloakUrl?: string;
    enableHidePanelAfterCompletion: boolean;
    enableStatusSelection: boolean;
    enableUDAIconDuringRecording: boolean;
    enableEditingOfRecordings: boolean;
    enableAISearch: boolean;
}
export declare const CustomConfig: CustomConfigPropTypes;
//# sourceMappingURL=CustomConfig.d.ts.map