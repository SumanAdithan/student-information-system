export const DUES_AND_APPROVALS_PARTIAL_PAID_OPTIONS = [
    { label: '50% Paid', value: 'true' },
    { label: '50% NotPaid', value: 'false' },
];

export const DUES_AND_APPROVALS_FULLY_PAID_OPTIONS = [
    { label: 'Not Fully Paid', value: 'false' },
    { label: 'Fully Paid', value: 'true' },
];

export const DUES_AND_APPROVALS_ELIGIBLE_OPTIONS = [
    { label: 'Not Eligible', value: 'false' },
    { label: 'Eligible', value: 'true' },
];

export const DUES_AND_APPROVALS_TABLE_INPUT_FIELDS = [
    {
        label: 'Name',
        type: 'text',
        placeholder: 'Enter name',
        name: 'name',
        disabled: true,
    },
    {
        label: 'Register Number',
        type: 'number',
        placeholder: 'Enter register number',
        name: 'registerNo',
        disabled: true,
    },

    {
        label: '50% Paid',
        type: 'select',
        placeholder: 'isPartialPaid',
        name: 'isPartialPaid',
        disabled: true,
    },

    {
        label: 'Pending',
        type: 'select',
        placeholder: 'Pending',
        name: 'pending',
        disabled: true,
    },
    {
        label: 'Year',
        type: 'select',
        placeholder: 'Year',
        name: 'year',
        valueAsNumber: true,
        options: [
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
        ],
    },
    {
        label: 'Semester',
        type: 'select',
        placeholder: 'Semester',
        name: 'semester',
        valueAsNumber: true,
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
    {
        label: 'Accountant',
        type: 'select',
        placeholder: 'Accountant',
        name: 'approvals.accountant',
        options: [
            { label: 'Approve', value: 'true' },
            { label: 'Not Approve', value: 'false' },
        ],
    },
    {
        label: 'Librarian',
        type: 'select',
        placeholder: 'Librarian',
        name: 'approvals.librarian',
        options: [
            { label: 'Approve', value: 'true' },
            { label: 'Not Approve', value: 'false' },
        ],
    },
    {
        label: 'Head of department',
        type: 'select',
        placeholder: 'Head of department',
        name: 'approvals.head_of_department',
        options: [
            { label: 'Approve', value: 'true' },
            { label: 'Not Approve', value: 'false' },
        ],
    },
    {
        label: 'Administrative officer',
        type: 'select',
        placeholder: 'Administrative officer',
        name: 'approvals.administrative_officer',
        options: [
            { label: 'Approve', value: 'true' },
            { label: 'Not Approve', value: 'false' },
        ],
    },
    {
        label: 'Principal',
        type: 'select',
        placeholder: 'Principal ',
        name: 'approvals.principal',
        options: [
            { label: 'Approve', value: 'true' },
            { label: 'Not Approve', value: 'false' },
        ],
    },
    {
        label: 'Approved',
        type: 'select',
        placeholder: 'Approved ',
        name: 'approvals.approved',
        options: [
            { label: 'Approve', value: 'true' },
            { label: 'Not Approve', value: 'false' },
        ],
    },
];
