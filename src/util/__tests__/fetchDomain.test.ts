import { fetchDomain } from '../fetchDomain';

// Mock the parse-domain library
jest.mock('parse-domain', () => ({
    parseDomain: jest.fn((host: string) => {
        if (host === 'localhost' || host === '127.0.0.1') {
            return {
                type: 'Reserved', // Use 'Reserved' for localhost and IP addresses
                hostname: host,
            };
        } else if (host.includes('.')) {
            const parts = host.split('.');
            const domain = parts[parts.length - 2];
            const topLevelDomains = [parts[parts.length - 1]];
            return {
                type: 'Listed',
                domain,
                topLevelDomains,
            };
        }
        return {
            type: 'NotListed',
            hostname: host,
        };
    }),
    ParseResultType: {
        Listed: 'Listed',
        Reserved: 'Reserved',
        NotListed: 'NotListed',
    },
}));

describe('fetchDomain', () => {
    const originalUDAGlobalConfig = window.UDAGlobalConfig;

    // jsdom's `window.location` is non-configurable, so we change the URL through
    // the jsdom instance exposed by test/jsdom-environment.js instead of
    // redefining `window.location`.
    const setHost = (host: string) => {
        (global as any).jsdom.reconfigure({ url: `http://${host}/` });
    };

    beforeAll(() => {
        // Mock UDAGlobalConfig for all tests that expect domain parsing
        Object.defineProperty(window, 'UDAGlobalConfig', {
            value: {
                enableForAllDomains: true,
            },
            writable: true,
            configurable: true,
        });
    });

    afterAll(() => {
        // Restore original UDAGlobalConfig
        Object.defineProperty(window, 'UDAGlobalConfig', {
            value: originalUDAGlobalConfig,
            writable: true,
            configurable: true,
        });
        (global as any).jsdom.reconfigure({ url: 'http://localhost/' });
    });

    it('should fetch a simple domain', () => {
        setHost('example.com');
        const domain = fetchDomain();
        expect(domain).toBe('example.com');
    });

    it('should fetch a domain with www', () => {
        setHost('www.example.com');
        const domain = fetchDomain();
        expect(domain).toBe('example.com');
    });

    it('should fetch a subdomain', () => {
        setHost('sub.example.com');
        const domain = fetchDomain();
        expect(domain).toBe('example.com');
    });

    it('should handle localhost', () => {
        setHost('localhost');
        const domain = fetchDomain();
        expect(domain).toBe('localhost');
    });

    it('should handle IP addresses', () => {
        setHost('127.0.0.1');
        const domain = fetchDomain();
        expect(domain).toBe('127.0.0.1');
    });
});
