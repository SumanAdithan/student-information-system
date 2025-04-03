interface Subject {
    code: string;
    name: string;
    regulation: string;
    semester: string;
}

export interface SubjectsResponse {
    data: Subject[];
}
