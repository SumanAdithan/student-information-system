type FacultyPosition =
    | 'Principal'
    | 'Vice Principal'
    | 'Dean'
    | 'Head of Department'
    | 'Professor'
    | 'Associate Professor'
    | 'Assistant Professor'
    | 'Lecturer'
    | 'Guest Lecturer'
    | 'Lab Assistant';

export type FacultySubjectType = {
    subjectName: string;
    code: string;
    year: string;
};

export interface Faculty {
    name: string;
    email: string;
    position: FacultyPosition;
    total_subjects: number;
    total_classes: string;
    subjects?: FacultySubjectType[];
    password?: string;
    qrCode?: string;
}
