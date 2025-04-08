import { getAllDuesData, getAuthenticatedDues, updateDuesData, updateOfflinePayment, verifyPayment } from '@api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { handlePayment } from '@utils';

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
        onSuccess: (_, { year }) => {
            queryClient.invalidateQueries({
                queryKey: ['allDuesData', String(year)],
            });
        },
    });

    const updateOfflinePaymentMutation = useMutation({
        mutationFn: updateOfflinePayment,
        onSuccess: (_, { year }) => {
            queryClient.invalidateQueries({
                queryKey: ['allDuesData', String(year)],
            });
        },
    });

    const updateOnlinePaymentMutation = useMutation({
        mutationFn: handlePayment,
        onSuccess: (_, { year }) => {
            queryClient.invalidateQueries({
                queryKey: ['allDuesData', String(year)],
            });
        },
    });

    return { updateDuesMutation, updateOfflinePaymentMutation, updateOnlinePaymentMutation };
};
