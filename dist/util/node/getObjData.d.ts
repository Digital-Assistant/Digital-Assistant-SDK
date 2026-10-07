/**
 * Parses a JSON string and ensures the resulting object has a `meta` property.
 * This function is designed to safely parse JSON strings that represent recorded metadata.
 * If the parsed object is a plain object and does not have a `meta` property, it will be added.
 *
 * @param obj The JSON string to parse.
 * @returns The parsed object. If parsing fails, an empty object is returned.
 *          If the parsed object is a plain object, it is guaranteed to have a `meta` property.
 */
export declare const getObjData: (obj: string) => any;
//# sourceMappingURL=getObjData.d.ts.map