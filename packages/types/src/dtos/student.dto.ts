import { z } from 'zod';

export const StudentDTOType = z.object({
    profileImage: z.string({
        required_error: 'Please enter profile image URL',
        invalid_type_error: 'Profile image URL must be a string',
    }),

    name: z
        .string({
            required_error: 'Please enter name',
            invalid_type_error: 'Name must be a string',
        })
        .min(3, 'Name must be at least 3 characters')
        .trim(),

    registerNo: z
        .number({
            required_error: 'Please enter register no',
            invalid_type_error: 'Register number must be a number',
        })
        .int('Register number must be an integer')
        .positive('Register number must be positive'),

    cgpa: z
        .number({
            invalid_type_error: 'CGPA must be a number',
        })
        .min(0, 'CGPA cannot be negative')
        .max(10, 'CGPA cannot exceed 10')
        .default(0),

    attendance: z
        .number({
            invalid_type_error: 'Attendance must be a number',
        })
        .min(0, 'Attendance cannot be negative')
        .max(100, 'Attendance cannot exceed 100')
        .default(0),

    dues: z
        .number({
            invalid_type_error: 'Dues must be a number',
        })
        .min(0, 'Dues cannot be negative')
        .default(0),

    dob: z
        .string({
            required_error: 'Please enter Date of Birth',
            invalid_type_error: 'Date of Birth must be a string',
        })
        .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' }),

    gender: z.enum(['Male', 'Female'], {
        errorMap: () => ({ message: 'Please select correct gender' }),
    }),

    department: z
        .string({
            invalid_type_error: 'Department must be a string',
        })
        .default('CSE'),

    year: z
        .number({
            required_error: 'Please enter year',
            invalid_type_error: 'Year must be a number',
        })
        .min(1, 'Year must be at least 1')
        .max(4, 'Year cannot exceed 4'),

    regulation: z.string({
        required_error: 'Please enter regulation',
        invalid_type_error: 'Regulation must be a string',
    }),

    semester: z
        .number({
            required_error: 'Please enter semester',
            invalid_type_error: 'Semester must be a number',
        })
        .min(1, 'Semester must be at least 1')
        .max(8, 'Semester cannot exceed 8'),

    batch: z
        .string({
            required_error: 'Please enter batch',
            invalid_type_error: 'Batch must be a string',
        })
        .min(4, 'Batch must be at least 4 characters'),

    arrears: z
        .number({
            invalid_type_error: 'Arrears must be a number',
        })
        .min(0, 'Arrears cannot be negative')
        .default(0),

    degree: z
        .string({
            invalid_type_error: 'Degree must be a string',
        })
        .default('B.E'),

    email: z
        .string({
            required_error: 'Please enter email',
            invalid_type_error: 'Email must be a string',
        })
        .email('Invalid email format'),

    mobile: z
        .number({
            required_error: 'Please enter mobile no',
            invalid_type_error: 'Mobile number must be a number',
        })
        .int('Mobile number must be an integer')
        .positive('Mobile number must be positive'),

    accomodation: z.enum(['Day Scholar', 'Hosteller'], {
        errorMap: () => ({ message: 'Please select correct accomodation' }),
    }),
});

export type StudentDTO = z.infer<typeof StudentDTOType>;

export const UpdateStudentDTOType = StudentDTOType.partial();
export type UpdateStudentDTO = z.infer<typeof UpdateStudentDTOType>;
