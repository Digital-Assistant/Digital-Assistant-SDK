/// <reference types="jest" />
declare const localStorageMock: {
    getItem: jest.Mock<string, [key: string], any>;
    setItem: jest.Mock<void, [key: string, value: string], any>;
    removeItem: jest.Mock<void, [key: string], any>;
    clear: jest.Mock<void, [], any>;
};
declare let reducer: any;
declare let actions: any;
declare const getFreshModule: () => any;
//# sourceMappingURL=editableStepFormSlice.test.d.ts.map