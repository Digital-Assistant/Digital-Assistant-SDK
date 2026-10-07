import 'setimmediate';
import './util/translate/i18n/';
import type { RootState } from './store';
import { TranslateService } from './services/TranslateService';
import { DigitalAssistantConfiguration } from './DigitalAssistantConfiguration';
export { DigitalAssistantConfiguration };
import { AuthDataConfig } from './util/user/AuthDataConfig';
import { AuthConfig } from './util/user/UserAuthConfig';
import { AppConfig } from './config/AppConfig';
import { CustomConfig } from './config/CustomConfig';
export { AuthDataConfig, AuthConfig, AppConfig, CustomConfig };
export { store } from './store';
export type { RootState, AppDispatch } from './store';
export * from './store/slices';
export * from './services';
export * from './config';
export * from './util';
export * from './models';
export * from './store/selectors';
export { authManager } from './services/AuthManager';
export declare class DigitalAssistantCore {
    private unsubscribeCallback;
    private translateService;
    private errorLogger;
    private lastRecordingRef;
    constructor(config: DigitalAssistantConfiguration);
    getState(): RootState;
    dispatch(action: any): any;
    subscribe(callback: (state: RootState) => void): () => void;
    unsubscribe(): void;
    getSliceState<T extends keyof RootState>(sliceName: T): RootState[T];
    getApiClient(): import("./services").ApiClient;
    getTranslateService(): TranslateService;
}
//# sourceMappingURL=index.d.ts.map