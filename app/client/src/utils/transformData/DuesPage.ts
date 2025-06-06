import { categoryMap, Dues, DuesDetails } from '@sis/types';

export const getDuesData = (data: Dues) => {
    const dues_details = Object.entries(data.dues_details).map(([key]) => {
        const mappedCategory = categoryMap[key.trim() as keyof DuesDetails] ?? key.trim();
        return {
            registerNo: data.registerNo,
            year: data.year,
            name: data.name,
            category: mappedCategory,
            ...data.dues_details[key as keyof DuesDetails],
        };
    });

    const total_details = {
        registerNo: data.registerNo,
        year: data.year,
        name: data.name,
        ...data.total_details,
    };

    return { dues_details, total_details, transaction_history: data.transaction_history };
};
