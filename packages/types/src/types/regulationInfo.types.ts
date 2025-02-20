export interface Subject {
    code: string;
    name: string;
}

export interface Semester {
    subjects: Subject[];
    laboratory?: Subject[];
}

export interface Semesters {
    one: Semester;
    two: Semester;
    three: Semester;
    four: Semester;
    five: Semester;
    six: Semester;
    seven: Semester;
    eight: Semester;
}

export interface RegulationInfo {
    regulation: string;
    semesters: Semesters;
}