export interface InternalEntry {
    code: string;
    name: string;
    mark?: number;
}

export interface InternalResult {
    registerNo: number;
    name: string;
    results: {
        one: InternalEntry[];
        two: InternalEntry[];
        three: InternalEntry[];
        semester: InternalEntry[];
    };
}
