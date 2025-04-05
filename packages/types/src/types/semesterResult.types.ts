export interface SemesterEntry {
    code: string;
    name: string;
    status: boolean;
    grade?: '-' | 'UA' | 'U' | 'C' | 'B' | 'B+' | 'A' | 'A+';
}

export interface SemesterResult {
    registerNo: number;
    name: string;
    year: number;
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
