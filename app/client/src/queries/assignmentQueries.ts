import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllAssignmentData, getAuthenticatedAssignment, updateAssignmentData } from '@api';

export const useGetAuthenticatedAssignment = () => {
    return useQuery({
        queryKey: ['authenticatedAssignment'],
        queryFn: getAuthenticatedAssignment,
    });
};

export const useGetAllAssignment = (year: string, status: string, result: string) => {
    const params = {
        year,
        status,
        result,
    };
    return useQuery({
        queryKey: ['allAssignments', year, status, result],
        queryFn: () => getAllAssignmentData(params),
        enabled: !!year && !!result,
        retry: false,
    });
};

export const useAssignmentMutation = () => {
    const queryClient = useQueryClient();
    const updateAssignmentMutation = useMutation({
        mutationFn: updateAssignmentData,
        onSuccess: (_, { year, status, result }) => {
            queryClient.invalidateQueries({
                queryKey: ['allAssignments', String(year), String(status), String(result)],
            });
        },
    });

    return { updateAssignmentMutation };
};
