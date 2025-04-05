export interface InternalEntry {
    code: string;
    name: string;
    status?: boolean;
    mark?: number;
}

export interface InternalResult {
    registerNo: number;
    name: string;
    year: number;
    results: {
        one: InternalEntry[];
        two: InternalEntry[];
        three: InternalEntry[];
        four: InternalEntry[];
    };
}
