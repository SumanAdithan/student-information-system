import { DuesAndApprovals } from '@sis/types';

export const getDuesAndApprovalsData = (data: DuesAndApprovals) => {
    const transformedData = Object.entries(data).reduce((acc, [key, value]) => {
        if (key !== 'approvals' && key !== '_id' && key !== '__v') {
            let formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
            if (key === 'isPartialPaid') {
                formattedKey = '50% Dues';
                value = value ? 'Cleared' : 'Not Cleared';
            }
            acc.push([formattedKey, value]);
        }
        return acc;
    }, [] as [string, any][]);

    return { details: transformedData, approvals: data.approvals };
};
