import { createNewFaculty, deleteFaculty, getAllfacultiesData, updateFaculty } from '@api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAllFaculties = () => {
    return useQuery({
        queryKey: ['allFaculties'],
        queryFn: getAllfacultiesData,
        retry: false,
    });
};

export const useFacultyMutations = () => {
    const queryClient = useQueryClient();
    const createFacultyMutation = useMutation({
        mutationFn: createNewFaculty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allFaculties'] });
        },
    });

    const updateFacultyMutation = useMutation({
        mutationFn: updateFaculty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allFaculties'] });
        },
    });

    const deleteFacultyMutation = useMutation({
        mutationFn: deleteFaculty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allFaculties'] });
        },
    });

    return { createFacultyMutation, updateFacultyMutation, deleteFacultyMutation };
};
