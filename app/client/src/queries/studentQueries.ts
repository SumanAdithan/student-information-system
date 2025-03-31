import { createNewStudent, deleteStudent, getAllStudentsData, getAuthenticatedStudent, updateStudent } from '@api';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useStudentMutations = () => {
    const queryClient = useQueryClient();
    const createStudentMutation = useMutation({
        mutationFn: createNewStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allStudents'] });
        },
    });

    const updateStudentMutation = useMutation({
        mutationFn: updateStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allStudents'] });
        },
    });

    const deleteStudentMutation = useMutation({
        mutationFn: deleteStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allStudents'] });
        },
    });

    return { createStudentMutation, updateStudentMutation, deleteStudentMutation };
};
