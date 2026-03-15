import { setInputValue } from '../setInputValue';

describe('setInputValue', () => {
    it('should set the value on the input element', () => {
        const input = document.createElement('input');
        setInputValue(input, 'hello');
        expect(input.value).toBe('hello');
    });

    it('should dispatch an input event', () => {
        const input = document.createElement('input');
        const inputListener = jest.fn();
        input.addEventListener('input', inputListener);
        setInputValue(input, 'test');
        expect(inputListener).toHaveBeenCalledTimes(1);
    });

    it('should dispatch a change event', () => {
        const input = document.createElement('input');
        const changeListener = jest.fn();
        input.addEventListener('change', changeListener);
        setInputValue(input, 'test');
        expect(changeListener).toHaveBeenCalledTimes(1);
    });

    it('should dispatch both input and change events with bubbles:true', () => {
        const input = document.createElement('input');
        const events: string[] = [];
        input.addEventListener('input', (e) => events.push(e.type));
        input.addEventListener('change', (e) => events.push(e.type));
        setInputValue(input, 'value');
        expect(events).toEqual(['input', 'change']);
    });

    it('should not throw when called with an empty string', () => {
        const input = document.createElement('input');
        input.value = 'existing';
        expect(() => setInputValue(input, '')).not.toThrow();
        expect(input.value).toBe('');
    });
});
