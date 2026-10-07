/**
 * Extracts the primary name from a recording sequence object.
 * The name is expected to be stored as a JSON string within the `name` property of the sequence.
 * This function parses the JSON string and returns the first element of the resulting array.
 *
 * @param recordingSequence The recording sequence object, which should have a `name` property.
 * @returns The first name from the parsed array. Returns 'NA' if the name cannot be parsed or is empty.
 *          Returns an empty string if the `recordingSequence` is null or undefined.
 */
export declare const getRecordingName: (recordingSequence: any) => string;
//# sourceMappingURL=getRecordingName.d.ts.map