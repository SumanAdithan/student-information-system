import { getAllDuesAndApprovalsData, getAuthenticatedDuesAndApprovals, updateDuesAndApprovalsData } from '@api';
import { QueryParams } from '@sis/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAuthenticatedDuesAndApprovals = () => {
    return useQuery({
        queryKey: ['authenticatedDuesAndApprovals'],
        queryFn: getAuthenticatedDuesAndApprovals,
    });
};

export const useGetAllDuesAndApprovals = (year: string, fullyPaid: string, partialPaid: string, eligible: string) => {
    const params = {
        year,
        fullyPaid,
        partialPaid,
        eligible,
    };

    return useQuery({
        queryKey: ['allDuesAndApprovals', year, fullyPaid, partialPaid, eligible],
        queryFn: () => getAllDuesAndApprovalsData(params),
        enabled: !!year && !!fullyPaid && !!partialPaid && !!eligible,
        retry: false,
    });
};

export const useDuesAndApprovalsMutation = () => {
    const queryClient = useQueryClient();
    const updateDuesAndApprovalsMutation = useMutation({
        mutationFn: updateDuesAndApprovalsData,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['allDuesAndApprovals'],
            });
        },
    });

    return { updateDuesAndApprovalsMutation };
};
