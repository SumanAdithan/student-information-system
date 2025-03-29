export const getPayDuesData = (data: any) => {
    const dues_details = Object.entries(data.dues_details).map(([key]) => ({
        category: key.trim(),
        ...data.dues_details[key],
    }));

    return { dues_details, total_details: data.total_details, transaction_history: data.transaction_history };
};
