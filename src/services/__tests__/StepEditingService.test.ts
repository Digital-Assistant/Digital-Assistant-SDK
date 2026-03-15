import {
    validateStepNameWithProfanity,
    updateStepMetadata,
    saveStepChanges,
    updateStepType,
    toggleSkipDuringPlay,
    togglePersonalInfo,
    updateTooltipMetadata,
    updateDelayTimeMetadata,
} from '../StepEditingService';
import {
    profanityCheck,
    updateRecordClicks,
    updateSequnceIndex
} from '../RecordService';
import {
    validateStepName,
    validateTooltip,
    validateDelayTime
} from '../../util/validation/formValidators';

jest.mock('../RecordService');
jest.mock('../../util/validation/formValidators');

describe('StepEditingService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('validateStepNameWithProfanity', () => {
        it('returns success false if basic validation fails', async () => {
            (validateStepName as jest.Mock).mockReturnValue({ isValid: false, error: 'Too short' });

            const result = await validateStepNameWithProfanity('a');

            expect(result.success).toBe(false);
            expect(result.error).toBe('Too short');
        });

        it('returns success true and cleaned value if profanity detected', async () => {
            (validateStepName as jest.Mock).mockReturnValue({ isValid: true });
            (profanityCheck as jest.Mock).mockResolvedValue({
                Terms: [
                    { Term: 'badword' },
                    { Term: 'nasty' }
                ]
            });

            const result = await validateStepNameWithProfanity('This is a badword and nasty string', true);

            expect(result.success).toBe(true);
            expect(result.data?.hasProfanity).toBe(true);
            expect(result.data?.cleanedValue).toBe('This is a  and  string');
            expect(result.error).toBe('Profanity detected and removed');
        });

        it('returns no profanity if response Terms is empty', async () => {
            (validateStepName as jest.Mock).mockReturnValue({ isValid: true });
            (profanityCheck as jest.Mock).mockResolvedValue({ Terms: [] });

            const result = await validateStepNameWithProfanity('Clean string', true);

            expect(result.success).toBe(true);
            expect(result.data?.hasProfanity).toBe(false);
            expect(result.data?.cleanedValue).toBe('Clean string');
        });
    });

    describe('updateStepMetadata', () => {
        it('updates metadata correctly in recordData', () => {
            const recordData = [
                { objectdata: JSON.stringify({ meta: { existing: 'val' } }) }
            ];

            const result = updateStepMetadata({
                recordData,
                index: 0,
                metaKey: 'newKey',
                value: 'newVal'
            });

            const updatedObj = JSON.parse(result[0].objectdata);
            expect(updatedObj.meta.existing).toBe('val');
            expect(updatedObj.meta.newKey).toBe('newVal');
        });
    });

    describe('toggleSkipDuringPlay', () => {
        it('toggles skipDuringPlay flag', () => {
            const recordData = [
                { objectdata: JSON.stringify({ meta: { skipDuringPlay: false } }) }
            ];

            const result = toggleSkipDuringPlay(recordData, 0);
            expect(JSON.parse(result[0].objectdata).meta.skipDuringPlay).toBe(true);

            const result2 = toggleSkipDuringPlay(result, 0);
            expect(JSON.parse(result2[0].objectdata).meta.skipDuringPlay).toBe(false);
        });
    });

    describe('saveStepChanges', () => {
        it('updates local records and calls backend in update mode', async () => {
            const recordData = [
                { objectdata: JSON.stringify({ meta: {} }), clickednodename: 'old' }
            ];

            const params = {
                recordData,
                index: 0,
                stepEditValue: 'new name',
                isUpdateMode: true,
                recordingId: 123
            };

            (updateRecordClicks as jest.Mock).mockResolvedValue({ success: true });
            (updateSequnceIndex as jest.Mock).mockResolvedValue({ success: true });

            const result = await saveStepChanges(params);

            expect(result.success).toBe(true);
            expect(result.data[0].clickednodename).toBe('new name');
            expect(updateRecordClicks).toHaveBeenCalled();
            expect(updateSequnceIndex).toHaveBeenCalledWith(123);
        });

        it('only updates local records in non-update mode', async () => {
            const recordData = [
                { objectdata: JSON.stringify({ meta: {} }), clickednodename: 'old' }
            ];

            const params = {
                recordData,
                index: 0,
                stepEditValue: 'new name',
                isUpdateMode: false
            };

            const result = await saveStepChanges(params);

            expect(result.success).toBe(true);
            expect(result.data[0].clickednodename).toBe('new name');
            expect(updateRecordClicks).not.toHaveBeenCalled();
        });
    });
});
