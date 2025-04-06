import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllSemesterResultData, getAuthenticatedSemesterResult, updateSemesterResultData } from '@api';

export const useGetAuthenticatedSemesterResult = () => {
    return useQuery({
        queryKey: ['authenticatedSemesterResult'],
        queryFn: getAuthenticatedSemesterResult,
    });
};

export const useGetAllSemesterResult = (year: string, status: string, result: string) => {
    const params = {
        year,
        status,
        result,
    };
    return useQuery({
        queryKey: ['allSemesterResult', year, status, result],
        queryFn: () => getAllSemesterResultData(params),
        enabled: !!year && !!result,
        retry: false,
    });
};

export const useSemesterResultMutation = () => {
    const queryClient = useQueryClient();
    const updateSemesterResultMutation = useMutation({
        mutationFn: updateSemesterResultData,
        onSuccess: (_, { year, status, result }) => {
            queryClient.invalidateQueries({
                queryKey: ['allSemesterResult', String(year), String(status), String(result)],
            });
        },
    });

    return { updateSemesterResultMutation };
};
