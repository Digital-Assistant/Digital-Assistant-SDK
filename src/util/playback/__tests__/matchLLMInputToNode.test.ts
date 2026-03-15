import { matchLLMInputToNode } from '../matchLLMInputToNode';
import { getSelectedRecordFromStore } from '../invokeNode';
import { addToolTip } from '../../notification';
import { setInputValue } from '../setInputValue';
import { invokeNextNode } from '../invokeNextNode';

jest.mock('../invokeNode', () => ({ getSelectedRecordFromStore: jest.fn(() => null) }));
jest.mock('../../notification', () => ({ addToolTip: jest.fn() }));
jest.mock('../setInputValue', () => ({ setInputValue: jest.fn() }));
jest.mock('../invokeNextNode', () => ({ invokeNextNode: jest.fn() }));
jest.mock('../../error', () => ({ UDAConsoleLogger: { info: jest.fn(), error: jest.fn() } }));
jest.mock('../../translate', () => ({ translate: jest.fn((k: string) => k) }));
jest.mock('../../node', () => ({
    checkNodeValues: jest.fn(() => false),
    getAbsoluteOffsets: jest.fn(() => ({ x: 0, y: 0 })),
    processDistanceOfNodes: jest.fn((nodes: any[]) => nodes[0]),
}));

const makeSelectedNode = (inputType = '') => ({
    objectdata: JSON.stringify({ meta: { inputType }, node: { nodeName: 'DIV', offset: null } }),
});

const makeRecordingDetails = (inputValues: any[]) => ({
    matchedRecording: { inputValues },
});

describe('matchLLMInputToNode', () => {
    beforeEach(() => jest.clearAllMocks());

    it('should return false when no llmInput is found', () => {
        const node = document.createElement('input');
        const result = matchLLMInputToNode(node, makeSelectedNode('firstName'), makeRecordingDetails([]), 0);
        expect(result).toBe(false);
    });

    it('should return false when llmInput has no InputValue', () => {
        const node = document.createElement('input');
        const details = makeRecordingDetails([{ Input: 'firstName', InputValue: '' }]);
        const result = matchLLMInputToNode(node, makeSelectedNode('firstName'), details, 0);
        expect(result).toBe(false);
    });

    it('should handle text input: call addToolTip and setInputValue', () => {
        const node = document.createElement('input');
        node.setAttribute('type', 'text');
        const details = makeRecordingDetails([{ Input: 'firstName', InputValue: 'John' }]);
        const result = matchLLMInputToNode(node, makeSelectedNode('firstName'), details, 0);
        expect(addToolTip).toHaveBeenCalled();
        expect(setInputValue).toHaveBeenCalledWith(node, 'John');
        expect(result).toBe(true);
    });

    it('should handle date input: call addToolTip and setInputValue', () => {
        const node = document.createElement('input');
        node.setAttribute('type', 'date');
        const details = makeRecordingDetails([{ Input: 'dob', InputValue: '2000-01-01' }]);
        const result = matchLLMInputToNode(node, makeSelectedNode('dob'), details, 0);
        expect(setInputValue).toHaveBeenCalledWith(node, '2000-01-01');
        expect(result).toBe(true);
    });

    it('should handle checkbox input: check matching checkbox', () => {
        document.body.innerHTML = `<input type="checkbox" name="agree" value="yes" />`;
        const node = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
        const details = makeRecordingDetails([{ Input: 'agree', InputValue: 'yes' }]);
        const result = matchLLMInputToNode(node, makeSelectedNode('agree'), details, 0);
        expect(result).toBe(true);
        expect((document.querySelector('input[name="agree"]') as HTMLInputElement).checked).toBe(true);
    });

    it('should handle radio input: check matching radio', () => {
        document.body.innerHTML = `<input type="radio" name="gender" value="male" />`;
        const node = document.querySelector('input[type="radio"]') as HTMLInputElement;
        const details = makeRecordingDetails([{ Input: 'gender', InputValue: 'male' }]);
        const result = matchLLMInputToNode(node, makeSelectedNode('gender'), details, 0);
        expect(result).toBe(true);
    });

    it('should handle select element: select matching option and invoke next node', () => {
        document.body.innerHTML = `<select><option value="opt1">Option 1</option><option value="opt2">Option 2</option></select>`;
        const node = document.querySelector('select') as HTMLSelectElement;
        const details = makeRecordingDetails([{ Input: 'choice', InputValue: 'opt2' }]);
        const result = matchLLMInputToNode(node, makeSelectedNode('choice'), details, 100);
        expect(node.options[1].selected).toBe(true);
        expect(invokeNextNode).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    it('should handle textarea element: call setInputValue', () => {
        const parent = document.createElement('div');
        const node = document.createElement('textarea') as any;
        parent.appendChild(node);
        const details = makeRecordingDetails([{ Input: 'comments', InputValue: 'Hello' }]);
        const result = matchLLMInputToNode(node, makeSelectedNode('comments'), details, 0);
        expect(setInputValue).toHaveBeenCalledWith(node, 'Hello');
        expect(result).toBe(true);
    });

    it('should return false on JSON parse error', () => {
        const node = document.createElement('input');
        const badNode = { objectdata: 'not-json' };
        const result = matchLLMInputToNode(node, badNode, {}, 0);
        expect(result).toBe(false);
    });

    it('should return false when no inputType is set on meta', () => {
        const node = document.createElement('div');
        const details = makeRecordingDetails([{ Input: 'field', InputValue: 'value' }]);
        const result = matchLLMInputToNode(node, makeSelectedNode(''), details, 0);
        expect(result).toBe(false);
    });
});
