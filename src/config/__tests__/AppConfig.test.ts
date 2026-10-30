import { AppConfig } from '../AppConfig';
import { CustomConfig } from '../CustomConfig';

describe('AppConfig', () => {
    const original = { ...CustomConfig };
    let warn: jest.SpyInstance;

    beforeEach(() => {
        warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    });

    afterEach(() => {
        Object.assign(CustomConfig, original);
        warn.mockRestore();
    });

    it('updates known keys of the right type', () => {
        const result = AppConfig({
            enableEditClickedName: false,
            udaDivId: 'my-div',
        });

        expect(CustomConfig.enableEditClickedName).toBe(false);
        expect(CustomConfig.udaDivId).toBe('my-div');
        expect(result).toBe(CustomConfig);
    });

    it('keeps the old value and warns on a type mismatch', () => {
        AppConfig({ enableSkipDuringPlay: 'yes' as unknown as boolean });

        expect(CustomConfig.enableSkipDuringPlay).toBe(
            original.enableSkipDuringPlay,
        );
        expect(warn).toHaveBeenCalledWith(
            expect.stringContaining(
                'Type mismatch for property "enableSkipDuringPlay"',
            ),
        );
    });

    it('ignores unknown keys and warns', () => {
        AppConfig({ notAKey: 1 } as never);

        expect(CustomConfig).not.toHaveProperty('notAKey');
        expect(warn).toHaveBeenCalledWith(
            expect.stringContaining('Unknown configuration property: notAKey'),
        );
    });

    it('throws when the input is not an object', () => {
        expect(() => AppConfig(null as never)).toThrow(
            'Invalid configuration data',
        );
        expect(() => AppConfig('x' as never)).toThrow(
            'Invalid configuration data',
        );
    });

    it('does not set realm, clientId or clientSecret unless given', () => {
        AppConfig({ enableOverlay: false });

        expect(CustomConfig.realm).toBe(original.realm);
        expect(CustomConfig.clientId).toBe(original.clientId);
        expect(CustomConfig.clientSecret).toBe(original.clientSecret);
    });

    it('accepts realm, clientId and clientSecret as strings', () => {
        AppConfig({ realm: 'r', clientId: 'c', clientSecret: 's' });

        expect(CustomConfig.realm).toBe('r');
        expect(CustomConfig.clientId).toBe('c');
        expect(CustomConfig.clientSecret).toBe('s');
    });

    it('fires UDAConfigUpdated on window', () => {
        const handler = jest.fn();
        window.addEventListener('UDAConfigUpdated', handler);
        AppConfig({ enableOverlay: true });
        window.removeEventListener('UDAConfigUpdated', handler);

        expect(handler).toHaveBeenCalledTimes(1);
    });
});
