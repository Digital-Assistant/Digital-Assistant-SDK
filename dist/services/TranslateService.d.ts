import { DigitalAssistantConfiguration } from "../DigitalAssistantConfiguration";
import { ApiClient } from "./apiClient";
import { ErrorLoggerService } from "./ErrorLoggerService";
/**
 * Service for handling text translation.
 */
export declare class TranslateService {
    private apiClient;
    private config;
    private errorLogger;
    /**
     * Creates an instance of TranslateService.
     * @param apiClient - The API client for making requests.
     * @param config - The configuration for the Digital Assistant.
     * @param errorLogger - The service for logging errors.
     */
    constructor(apiClient: ApiClient, config: DigitalAssistantConfiguration, errorLogger: ErrorLoggerService);
    /**
     * Translates text from a source language to a target language.
     *
     * @param text - The text to translate.
     * @param sourceLang - The source language of the text.
     * @param targetLang - The target language for the translation.
     * @returns A promise that resolves with the translated text.
     */
    translateText(text: string, sourceLang: string, targetLang?: string): Promise<string>;
}
//# sourceMappingURL=TranslateService.d.ts.map