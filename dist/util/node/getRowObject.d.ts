/**
 * Processes search result data to generate a displayable row object.
 * This function creates a concise representation of a search result, including a sequence name
 * and a path derived from user click nodes.
 *
 * @param data The search result data object. It is expected to have `userclicknodesSet` and `name` properties.
 * @returns An object containing `sequenceName` and `path`, suitable for rendering in a search result list.
 */
export declare const getRowObject: (data: any) => {
    sequenceName: string;
    path: string;
};
//# sourceMappingURL=getRowObject.d.ts.map