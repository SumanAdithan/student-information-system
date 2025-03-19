export const getSemesterResultData = (titles: any, results: any) => {
    return Object.entries(results).reduce((acc, [_, val], i) => {
        acc.push({
            title: titles[i],
            result: (val as any).map((item: any) => ({
                name: `(${item.code}) ${item.name}`,
                grade: item.grade,
            })),
        });
        return acc;
    }, [] as Record<string, any>);
};
