export interface Student {
    profileImage: string;
    name: string;
    registerNo: number;
    cgpa: number;
    attendance?: number;
    dues: number;
    dob: string;
    gender: String;
    department: string;
    year: number;
    regulation: string;
    semester: number;
    batch: string;
    arrears: number;
    degree: string;
    email: string;
    mobile: number;
    accomodation: String;
    semesterWord?: String;
}

export interface UpdateStudent {
    updatedItems: Partial<Student>;
}