export interface InternalResult {
    code: string;
    name: string;
    mark?: number;
}

export interface InternalMark {
    registerNo: number;
    name:string;
    results: {
        one:InternalResult[];
        two:InternalResult[];
        three:InternalResult[];
        semester:InternalResult[];
    
    };
}
