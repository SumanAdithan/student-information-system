import { getAllStudentsData, getAuthenticatedStudent } from '@api';
import { useQuery } from '@tanstack/react-query';

export const useGetAuthenticatedStudent = () => {
    return useQuery({
        queryKey: ['authenticatedStudent'],
        queryFn: getAuthenticatedStudent,
    });
};

export const useGetAllStudents = () => {
    return useQuery({
        queryKey: ['allStudents'],
        queryFn: getAllStudentsData,
        retry: false,
    });
};
