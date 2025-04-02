export const jsonToFormData = (data: Record<string, any>, fileFields: string[] = []) => {
    const formData = new FormData();
    const jsonData: Record<string, any> = {};

    Object.entries(data).forEach(([key, value]) => {
        if (fileFields.includes(key) && value instanceof FileList && value.length > 0) {
            formData.append(key, value[0]);
        } else {
            jsonData[key] = value;
        }
    });

    if (Object.keys(jsonData).length > 0) {
        formData.append('data', JSON.stringify(jsonData));
    }

    return formData;
};
