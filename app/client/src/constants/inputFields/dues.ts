export const DUES_PARTIAL_PAID_OPTIONS = [
    { label: '50% Paid', value: 'true' },
    { label: '50% Not Paid', value: 'false' },
];

export const DUES_TABLE_INPUT_FIELDS = [
    { label: 'RegisterNo', type: 'text', placeholder: 'RegisterNo', name: 'registerNo', disabled: true },
    { label: 'Name', type: 'text', placeholder: 'Name', name: 'name', disabled: true },
    { label: 'Year', type: 'text', placeholder: 'Year', name: 'year', disabled: true },
    { label: 'Tuition Fee', type: 'number', placeholder: 'Tuition Fee', name: 'tuition_fee', disabled: true },
    { label: 'Bus Fee', type: 'number', placeholder: 'Bus Fee', name: 'bus_fee', disabled: true },
    { label: 'Stationary Fee', type: 'number', placeholder: 'Stationary Fee', name: 'stationary_fee', disabled: true },
    {
        label: 'Sports and Placement Fee',
        type: 'number',
        placeholder: 'Sports and Placement Fee',
        name: 'sports_placement_fee',
        disabled: true,
    },
    { label: 'Apparel Fee', type: 'number', placeholder: 'Apparel Fee', name: 'apparel_fee', disabled: true },
    {
        label: 'Examination Fee',
        type: 'number',
        placeholder: 'Examination Fee',
        name: 'examination_fee',
        disabled: true,
    },
    { label: 'Fine', type: 'number', placeholder: 'Fine', name: 'fine', disabled: true },
];
