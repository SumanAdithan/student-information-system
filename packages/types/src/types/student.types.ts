type Gender = 'Male' | 'Female';
type Accommodation = 'Day Scholar' | 'Hosteller';

type ProfileImage = string | File;

export interface Student {
    profileImage?: ProfileImage;
    name: string;
    registerNo: number;
    cgpa?: number;
    attendance?: number;
    dues?: number;
    dob: string;
    gender: Gender;
    department?: string;
    year: number;
    regulation?: string;
    semester: number;
    batch: string;
    arrears?: number;
    degree?: string;
    email: string;
    mobile: number;
    accommodation: Accommodation;
    password?: string;
}

export type StudentWithId = Student & { id: string };
