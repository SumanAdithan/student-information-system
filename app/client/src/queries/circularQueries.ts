import { addCircular, getAllCircularData } from '@api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAllCircular = () => {
    return useQuery({
        queryKey: ['allCirculars'],
        queryFn: getAllCircularData,
        retry: false,
    });
};

export const useDownloadCircularMutation = () => {
    const queryClient = useQueryClient();
    const addCircularMutation = useMutation({
        mutationFn: addCircular,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allCirculars'] });
        },
    });

    return { addCircularMutation };
};
