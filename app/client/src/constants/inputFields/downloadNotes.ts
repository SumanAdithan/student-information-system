export const DOWNLOAD_NOTES_TABLE_INPUT_FIELDS = [
    {
        label: 'Notes File',
        type: 'file',
        placeholder: 'Select file',
        name: 'file',
        fileType: 'application/pdf',
    },
    { label: 'Subject Name', type: 'text', placeholder: 'Subject name', name: 'subjectName' },
    { label: 'Subject Code', type: 'text', placeholder: 'Subject code', name: 'code' },
    {
        label: 'Regulation',
        type: 'select',
        placeholder: 'regulation',
        name: 'regulation',
        options: [
            { label: '2021', value: 'R2021' },
            { label: '2025', value: 'R2025' },
        ],
    },
    {
        label: 'Semester',
        type: 'select',
        placeholder: 'Enter semester',
        valueAsNumber: true,
        name: 'semester',
        options: [
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 },
            { label: '6', value: 6 },
            { label: '7', value: 7 },
            { label: '8', value: 8 },
        ],
    },
];
