import { isDeepEqual, pickBy } from 'remeda';

export const useChangedInputValues = (initialData: any, currentData: any) => {
    if (!initialData) return null;
    const changedData = pickBy(currentData, (value, key) => !isDeepEqual(value, initialData[key]));
    return Object.keys(changedData).length > 0 ? changedData : null;
};
