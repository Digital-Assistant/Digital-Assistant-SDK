// Mock dependencies
jest.mock('../getScreenSize', () => ({
    getScreenSize: jest.fn(),
}));
jest.mock('../../error/error-log', () => ({
    UDAConsoleLogger: {
        info: jest.fn(),
    },
    UDAErrorLogger: {
        error: jest.fn(),
    },
}));

import { checkScreenSize } from '../checkScreenSize';
import { getScreenSize } from '../getScreenSize';
import { UDAErrorLogger } from '../../error/error-log';

describe('checkScreenSize', () => {
    // Helper to mock screen dimensions and return a window-like object.
    // `checkScreenSize` accepts the window reference as a parameter so tests do
    // not need to mutate the non-configurable jsdom `window` global.
    const mockWindow = (width: any, height: any, devicePixelRatio: number) => {
        (getScreenSize as jest.Mock).mockReturnValue({
            screen: { width, height },
        });
        return { devicePixelRatio };
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should enable plugin and not show alert for optimal resolution', () => {
        const result = checkScreenSize(mockWindow(1920, 1080, 1));
        expect(result).toEqual({
            enablePluginForScreen: true,
            showScreenAlert: false,
        });
    });

    it('should enable plugin and show alert for resolution below optimal but above minimum', () => {
        const result = checkScreenSize(mockWindow(1300, 800, 1));
        expect(result).toEqual({
            enablePluginForScreen: true,
            showScreenAlert: true,
        });
    });

    it('should disable plugin for resolution below minimum height', () => {
        const result = checkScreenSize(mockWindow(1300, 700, 1));
        expect(result).toEqual({
            enablePluginForScreen: false,
            showScreenAlert: true,
        });
    });

    it('should disable plugin for resolution below minimum width', () => {
        const result = checkScreenSize(mockWindow(1200, 800, 1));
        expect(result).toEqual({
            enablePluginForScreen: false,
            showScreenAlert: true,
        });
    });

    it('should handle high DPI displays correctly', () => {
        // Effective resolution: 1600x900 * 2 = 3200x1800 (Optimal)
        const result = checkScreenSize(mockWindow(1600, 900, 2));
        expect(result).toEqual({
            enablePluginForScreen: true,
            showScreenAlert: false,
        });
    });

    it('should return safe defaults and log error if window is not defined', () => {
        const result = checkScreenSize(null);
        expect(result).toEqual({
            enablePluginForScreen: false,
            showScreenAlert: true,
        });
        expect(UDAErrorLogger.error).toHaveBeenCalledWith(
            'Screen size check failed: Window object is not available',
        );
    });

    it('should return safe defaults for invalid screen size object', () => {
        (getScreenSize as jest.Mock).mockReturnValue(null);
        const result = checkScreenSize({ devicePixelRatio: 1 });
        expect(result).toEqual({
            enablePluginForScreen: false,
            showScreenAlert: true,
        });
        expect(UDAErrorLogger.error).toHaveBeenCalledWith(
            'Screen size check failed: Invalid screen size object',
        );
    });

    it('should return safe defaults for invalid resolution values', () => {
        const result = checkScreenSize(mockWindow(0, 0, 1)); // Invalid resolution
        expect(result).toEqual({
            enablePluginForScreen: false,
            showScreenAlert: true,
        });
        expect(UDAErrorLogger.error).toHaveBeenCalledWith(
            'Screen size check failed: Invalid resolution values',
        );
    });

    it('should return safe defaults for non-numeric resolution values', () => {
        const result = checkScreenSize(mockWindow('invalid', '1080', 1));
        expect(result).toEqual({
            enablePluginForScreen: false,
            showScreenAlert: true,
        });
        expect(UDAErrorLogger.error).toHaveBeenCalledWith(
            'Screen size check failed: Invalid resolution values',
        );
    });

    it('should return safe defaults for invalid device pixel ratio', () => {
        const result = checkScreenSize(mockWindow(1920, 1080, 0)); // Invalid device pixel ratio
        expect(result).toEqual({
            enablePluginForScreen: false,
            showScreenAlert: true,
        });
        expect(UDAErrorLogger.error).toHaveBeenCalledWith(
            'Screen size check failed: Invalid device pixel ratio',
        );
    });
});
