export const INTERNAL_YEAR_OPTIONS = [
    { label: 'I Year', value: '1' },
    { label: 'II Year', value: '2' },
    { label: 'III Year', value: '3' },
    { label: 'VI Year', value: '4' },
];

export const INTERNAL_STATUS_OPTIONS = [
    { label: 'Pass', value: 'true' },
    { label: 'Fail', value: 'false' },
];

export const INTERNAL_RESULT_OPTIONS = [
    { label: 'one', value: 'one' },
    { label: 'two', value: 'two' },
    { label: 'three', value: 'three' },
    { label: 'four', value: 'four' },
];

export const INTERNAL_RESULT_TABLE_INPUT_FIELDS = [
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
    { label: 'Mark', type: 'number', placeholder: 'Mark', name: 'mark', disabled: false },
];
