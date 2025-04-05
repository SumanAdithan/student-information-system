import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllInternalResultData, getAuthenticatedInternalResult, updateInternalResultData } from '@api';

export const useGetAuthenticatedInternalResult = () => {
    return useQuery({
        queryKey: ['authenticatedInternalResult'],
        queryFn: getAuthenticatedInternalResult,
    });
};

export const useGetAllInternalResult = (year: string, status: string, result: string) => {
    const params = {
        year,
        status,
        result,
    };
    return useQuery({
        queryKey: ['allInternalResult', year, status, result],
        queryFn: () => getAllInternalResultData(params),
        enabled: !!year && !!result,
        retry: false,
    });
};

export const useInternalResultMutation = () => {
    const queryClient = useQueryClient();
    const updateInternalResultMutation = useMutation({
        mutationFn: updateInternalResultData,
        onSuccess: (_, { year, status, result }) => {
            queryClient.invalidateQueries({
                queryKey: ['allInternalResult', String(year), String(status), String(result)],
            });
        },
    });

    return { updateInternalResultMutation };
};
