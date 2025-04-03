export interface SemesterEntry {
    code: string;
    name: string;
    grade?: string;
}

export interface SemesterResult {
    registerNo: number;
    name: string;
    results: {
        one: SemesterEntry[];
        two: SemesterEntry[];
        three: SemesterEntry[];
        four: SemesterEntry[];
        five: SemesterEntry[];
        six: SemesterEntry[];
        seven: SemesterEntry[];
        eight: SemesterEntry[];
    };
}
