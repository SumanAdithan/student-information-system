export interface SemesterResult {
    code: string;
    name: string;
    grade?: number;
}

export interface SemesterGrade {
    registerNo: number;
    name:string;
        results: {
        one: SemesterResult[];
        two:SemesterResult[];
        three:SemesterResult[];
        four:SemesterResult[];
        five:SemesterResult[];
        six: SemesterResult[];
        seven:SemesterResult[];
        eight:SemesterResult[];
    };
}