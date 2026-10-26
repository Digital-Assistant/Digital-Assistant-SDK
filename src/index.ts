import 'setimmediate';
import './util/translate/i18n/';
import type { AppDispatch, RootState } from './store';
import { store } from './store';
import { apiClient } from './services';
import { TranslateService } from './services/TranslateService';
import { ErrorLoggerService } from './services/ErrorLoggerService';
import { DigitalAssistantConfiguration } from './DigitalAssistantConfiguration';
export { DigitalAssistantConfiguration };

import { AuthDataConfig } from './util/user/AuthDataConfig';
import { AuthConfig } from './util/user/UserAuthConfig';
import { AppConfig } from './config/AppConfig';
import { CustomConfig } from './config/CustomConfig';
import { UDAConsoleLogger } from './util/error';

// Export for module usage
export { AuthDataConfig, AuthConfig, AppConfig, CustomConfig };

// Expose globally for both Browser Extension and Independent SDK. globalThis is
// `window` on a page and `self` in the extension's background service worker.
const sdkGlobal = globalThis as any;
sdkGlobal.UDAAuthDataConfig = AuthDataConfig;
sdkGlobal.UDAAuthConfig = AuthConfig;
sdkGlobal.UDAPluginSDK = AppConfig;
sdkGlobal.UDAGlobalConfig = CustomConfig;

// Export the store and types for external consumption
export { store } from './store';
export type { RootState, AppDispatch } from './store';

// Export all slice actions and types
export * from './store/slices';

// Export API client services
export * from './services';

// Export configurations and utilities
export * from './config';
export * from './util';
export * from './models';
// Export selectors
export * from './store/selectors';
export { authManager } from './services/AuthManager';

export class DigitalAssistantCore {
    private unsubscribeCallback: (() => void) | null = null;
    private translateService: TranslateService;
    private errorLogger: ErrorLoggerService;
    private lastRecordingRef: any = null;

    constructor(config: DigitalAssistantConfiguration) {
        UDAConsoleLogger.info('Digital Assistant SDK Core initialized', 3);
        this.errorLogger = new ErrorLoggerService(config);
        this.translateService = new TranslateService(
            apiClient,
            config,
            this.errorLogger,
        );
        // Initialize AuthManager
        import('./services/AuthManager').then(({ authManager }) => {
            authManager.init();
        });

        // Initialize PlaybackService
        import('./util/playback/PlaybackService').then(
            ({ playbackService }) => {
                playbackService.init();
            },
        );
    }

    getState(): RootState {
        return (store as any).getState();
    }

    dispatch(action: any): any {
        return store.dispatch(action);
    }

    subscribe(callback: (state: RootState) => void): () => void {
        return (store as any).subscribe(() => {
            callback((store as any).getState());
        });
    }

    unsubscribe(): void {
        if (this.unsubscribeCallback) {
            this.unsubscribeCallback();
            this.unsubscribeCallback = null;
        }
    }

    getSliceState<T extends keyof RootState>(sliceName: T): RootState[T] {
        return (store as any).getState()[sliceName];
    }

    getApiClient() {
        return apiClient;
    }

    getTranslateService(): TranslateService {
        return this.translateService;
    }
}
