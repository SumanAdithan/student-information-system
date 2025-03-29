export const getTitle = (pathname: string, headerTitles: Record<string, string>): string => {
    const matchedPath = Object.keys(headerTitles)
        .reverse()
        .find((key) => pathname.startsWith(key));

    return headerTitles[matchedPath as keyof typeof headerTitles] || 'MET';
};
