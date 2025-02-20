export interface AssignmentResult {
    code: string;
    name: string;
    status?: boolean;
    mark?: number;
}

export interface Assignment {
    registerNo: number;
    name: string;
    results: {
        one: AssignmentResult[];
        two: AssignmentResult[];
        three: AssignmentResult[];
    };
}












