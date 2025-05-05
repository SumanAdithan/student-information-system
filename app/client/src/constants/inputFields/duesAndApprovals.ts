export const DUES_AND_APPROVALS_PARTIAL_PAID_OPTIONS = [
    { label: '50% Paid', value: 'true' },
    { label: '50% NotPaid', value: 'false' },
];

export const DUES_AND_APPROVALS_FULLY_PAID_OPTIONS = [
    { label: 'Fully Paid', value: 'true' },
    { label: 'Not Fully Paid', value: 'false' },
];

export const DUES_AND_APPROVALS_ELIGIBLE_OPTIONS = [
    { label: 'Eligible', value: 'true' },
    { label: 'Not Eligible', value: 'false' },
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
        disabled: true,
    },
    {
        label: 'Semester',
        type: 'select',
        placeholder: 'Semester',
        name: 'semester',
        disabled: true,
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
