import { ErrorLoggerService } from '../ErrorLoggerService';
import { store } from '../../store';
import { setUserSessionData } from '../../store/slices/userSlice';

jest.mock('winston', () => {
    const logFn = jest.fn();
    const mockLogger = { log: logFn };
    return {
        createLogger: jest.fn(() => mockLogger),
        transports: {
            Http: jest.fn(),
            Console: jest.fn(),
        },
        format: {
            combine: jest.fn(),
            timestamp: jest.fn(),
            json: jest.fn(),
        },
        __mockLogger: mockLogger,
    };
});

const winston = require('winston');

describe('ErrorLoggerService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        store.dispatch({ type: 'user/clearUserData' });
    });

    describe('constructor', () => {
        it('should fall back to console logger when host is missing', () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
            new ErrorLoggerService({ logging: { path: '/log' } } as any);
            expect(consoleSpy).toHaveBeenCalledWith('Remote error logging is not configured. Falling back to console.');
            consoleSpy.mockRestore();
        });

        it('should fall back to console logger when path is missing', () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
            new ErrorLoggerService({ logging: { host: 'logs.example.com' } } as any);
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });

        it('should fall back to console logger when logging config is absent', () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
            new ErrorLoggerService({} as any);
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });

        it('should create Http transport when host and path are provided', () => {
            jest.spyOn(console, 'warn').mockImplementation(() => {});
            new ErrorLoggerService({ logging: { host: 'logs.example.com', path: '/log', ssl: true, port: 443 } } as any);
            expect(winston.transports.Http).toHaveBeenCalledWith(
                expect.objectContaining({ host: 'logs.example.com', path: '/log' })
            );
        });
    });

    describe('error', () => {
        it('should log the message without user enrichment when no user in store', () => {
            jest.spyOn(console, 'warn').mockImplementation(() => {});
            const service = new ErrorLoggerService({} as any);
            service.error('Something went wrong');
            expect(winston.__mockLogger.log).toHaveBeenCalledWith('error', 'Something went wrong', expect.any(Object));
        });

        it('should enrich message with userId when user is in store', () => {
            jest.spyOn(console, 'warn').mockImplementation(() => {});
            store.dispatch(setUserSessionData({ authData: { id: 'user-42' } }));
            const service = new ErrorLoggerService({} as any);
            service.error('DB error');
            expect(winston.__mockLogger.log).toHaveBeenCalledWith(
                'error',
                'UserID: user-42 | Error: DB error',
                expect.any(Object)
            );
        });

        it('should pass exception object to logger', () => {
            jest.spyOn(console, 'warn').mockImplementation(() => {});
            const service = new ErrorLoggerService({} as any);
            const err = new Error('boom');
            service.error('Crash', err);
            expect(winston.__mockLogger.log).toHaveBeenCalledWith('error', expect.any(String), { exception: err });
        });

        it('should default exception to empty object when not provided', () => {
            jest.spyOn(console, 'warn').mockImplementation(() => {});
            const service = new ErrorLoggerService({} as any);
            service.error('No exception');
            expect(winston.__mockLogger.log).toHaveBeenCalledWith('error', expect.any(String), { exception: {} });
        });
    });
});
