import { getAllDuesData, getAuthenticatedDues, updateDuesData } from '@api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAuthenticatedDues = () => {
    return useQuery({
        queryKey: ['authenticatedDues'],
        queryFn: getAuthenticatedDues,
    });
};

export const useGetAllDues = (year: string, partialPaid: string) => {
    const params = {
        year,
        partialPaid,
    };
    return useQuery({
        queryKey: ['allDuesData', year, partialPaid],
        queryFn: () => getAllDuesData(params),
        enabled: !!year,
        retry: false,
    });
};

export const useDuesMutation = () => {
    const queryClient = useQueryClient();
    const updateDuesMutation = useMutation({
        mutationFn: updateDuesData,
        onSuccess: (_, { year, category }) => {
            queryClient.invalidateQueries({
                queryKey: ['allDues', String(year), String(category)],
            });
        },
    });

    return { updateDuesMutation };
};
