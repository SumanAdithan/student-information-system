import { addCircular, deleteCircular, getAllCircularData } from '@api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAllCircular = () => {
    return useQuery({
        queryKey: ['allCirculars'],
        queryFn: getAllCircularData,
        retry: false,
    });
};

export const useCircularMutation = () => {
    const queryClient = useQueryClient();
    const addCircularMutation = useMutation({
        mutationFn: addCircular,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allCirculars'] });
        },
    });

    const deleteCircularMutation = useMutation({
        mutationFn: deleteCircular,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allCirculars'] });
        },
    });

    return { addCircularMutation, deleteCircularMutation };
};
