import {
    validateStepName,
    validateTooltip,
    validateDelayTime,
    validateInput,
    validateCustomMetadata,
} from '../formValidators';

describe('formValidators', () => {
    describe('validateStepName', () => {
        it('should return invalid for empty string', () => {
            const result = validateStepName('');
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Step name cannot be empty');
        });

        it('should return invalid for whitespace-only string', () => {
            const result = validateStepName('   ');
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Step name cannot be empty');
        });

        it('should return invalid when exceeding 100 characters', () => {
            const result = validateStepName('a'.repeat(101));
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Step name cannot exceed 100 characters');
        });

        it('should return valid for a normal step name', () => {
            expect(validateStepName('Click Submit').isValid).toBe(true);
        });

        it('should return valid for exactly 100 characters', () => {
            expect(validateStepName('a'.repeat(100)).isValid).toBe(true);
        });
    });

    describe('validateTooltip', () => {
        it('should return invalid for empty string', () => {
            const result = validateTooltip('');
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Tooltip cannot be empty');
        });

        it('should return invalid for whitespace-only string', () => {
            const result = validateTooltip('   ');
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Tooltip cannot be empty');
        });

        it('should return invalid when exceeding 100 characters', () => {
            const result = validateTooltip('a'.repeat(101));
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Tooltip cannot exceed 100 characters');
        });

        it('should return valid for a normal tooltip', () => {
            expect(validateTooltip('Click this button').isValid).toBe(true);
        });

        it('should return valid for exactly 100 characters', () => {
            expect(validateTooltip('a'.repeat(100)).isValid).toBe(true);
        });
    });

    describe('validateDelayTime', () => {
        it('should return invalid for NaN', () => {
            const result = validateDelayTime('abc');
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Delay time must be a valid number');
        });

        it('should return invalid for negative value', () => {
            const result = validateDelayTime(-1);
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Delay time cannot be negative');
        });

        it('should return invalid when exceeding 10000', () => {
            const result = validateDelayTime(10001);
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Delay time cannot exceed 10000 milliseconds');
        });

        it('should return valid for 0', () => {
            expect(validateDelayTime(0).isValid).toBe(true);
        });

        it('should return valid for 10000', () => {
            expect(validateDelayTime(10000).isValid).toBe(true);
        });

        it('should accept string number', () => {
            expect(validateDelayTime('500').isValid).toBe(true);
        });
    });

    describe('validateInput', () => {
        it('should return false for empty string', () => {
            expect(validateInput('')).toBe(false);
        });

        it('should return false when exceeding 100 characters', () => {
            expect(validateInput('a'.repeat(101))).toBe(false);
        });

        it('should return true for alphanumeric with allowed special chars', () => {
            expect(validateInput('Step_1 - test.value')).toBe(true);
        });

        it('should return false for disallowed special characters', () => {
            expect(validateInput('step@name!')).toBe(false);
        });
    });

    describe('validateCustomMetadata', () => {
        it('should return invalid for empty string', () => {
            const result = validateCustomMetadata('');
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Metadata cannot be empty');
        });

        it('should return invalid for whitespace-only string', () => {
            const result = validateCustomMetadata('   ');
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Metadata cannot be empty');
        });

        it('should return invalid when exceeding 200 characters', () => {
            const result = validateCustomMetadata('a'.repeat(201));
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Metadata cannot exceed 200 characters');
        });

        it('should return valid for normal metadata', () => {
            expect(validateCustomMetadata('some metadata value').isValid).toBe(true);
        });

        it('should return valid for exactly 200 characters', () => {
            expect(validateCustomMetadata('a'.repeat(200)).isValid).toBe(true);
        });
    });
});
