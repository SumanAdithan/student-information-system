import {
    getAllDuesData,
    getAuthenticatedDues,
    updateDuesData,
    updateOfflineDuesPayment,
    updateOfflinePendingPayment,
} from '@api';
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
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['allDuesData'],
            });
        },
    });

    const updateOfflineDuesPaymentMutation = useMutation({
        mutationFn: updateOfflineDuesPayment,
    });

    const updateOfflinePendingPaymentMutation = useMutation({
        mutationFn: updateOfflinePendingPayment,
    });

    return { updateDuesMutation, updateOfflineDuesPaymentMutation, updateOfflinePendingPaymentMutation };
};
