export const SEMESTER_STATUS_OPTIONS = [
    { label: 'Pass', value: 'true' },
    { label: 'Fail', value: 'false' },
];

export const SEMESTER_RESULT_OPTIONS = [
    { label: 'one', value: 'one' },
    { label: 'two', value: 'two' },
    { label: 'three', value: 'three' },
    { label: 'four', value: 'four' },
    { label: 'five', value: 'five' },
    { label: 'six', value: 'six' },
    { label: 'seven', value: 'seven' },
    { label: 'eight', value: 'eight' },
];

export const SEMESTER_RESULT_TABLE_INPUT_FIELDS = [
    { label: 'RegisterNo', type: 'text', placeholder: 'RegisterNo', name: 'registerNo', disabled: true },
    { label: 'Name', type: 'text', placeholder: 'Name', name: 'name', disabled: true },
    { label: 'Year', type: 'text', placeholder: 'Year', name: 'year', disabled: true },
    { label: 'Subject', type: 'text', placeholder: 'Subject', name: 'subject', disabled: true },
    {
        label: 'Status',
        type: 'select',
        placeholder: 'Status',
        name: 'status',
        disabled: true,
        options: [
            { label: 'Pass', value: 'true' },
            { label: 'Fail', value: 'false' },
        ],
    },
    { label: 'Code', type: 'text', placeholder: 'Code', name: 'code', disabled: true },
    { label: 'Assignment', type: 'text', placeholder: 'Assignment', name: 'result', disabled: true },
    {
        label: 'Grade',
        type: 'select',
        placeholder: 'Grade',
        name: 'grade',
        disabled: false,
        options: [
            { label: '-', value: '-' },
            { label: 'UA', value: 'UA' },
            { label: 'U', value: 'U' },
            { label: 'B', value: 'B' },
            { label: 'B+', value: 'B+' },
            { label: 'A', value: 'A' },
            { label: 'A+', value: 'A+' },
            { label: 'O', value: 'O' },
        ],
    },
];
