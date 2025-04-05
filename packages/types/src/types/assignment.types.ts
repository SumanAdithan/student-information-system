export interface AssignmentEntry {
    code: string;
    name: string;
    status?: boolean;
    mark?: number;
}

export interface AssignmentResult {
    registerNo: number;
    name: string;
    year: number;
    results: {
        one: AssignmentEntry[];
        two: AssignmentEntry[];
        three: AssignmentEntry[];
    };
}
