export const DUES_PARTIAL_PAID_OPTIONS = [
    { label: '50% Paid', value: 'true' },
    { label: '50% Not Paid', value: 'false' },
];

export const DUES_TABLE_INPUT_FIELDS = [
    { label: 'RegisterNo', type: 'text', placeholder: 'RegisterNo', name: 'registerNo', disabled: true },
    { label: 'Name', type: 'text', placeholder: 'Name', name: 'name', disabled: true },
    { label: 'Year', type: 'text', placeholder: 'Year', name: 'year', disabled: true },
    { label: 'Tuition Fee', type: 'number', placeholder: 'Tuition Fee', name: 'amounts.tuition_fee', disabled: false },
    { label: 'Bus Fee', type: 'number', placeholder: 'Bus Fee', name: 'amounts.bus_fee', disabled: false },
    {
        label: 'Stationary Fee',
        type: 'number',
        placeholder: 'Stationary Fee',
        name: 'amounts.stationary_fee',
        disabled: false,
    },
    {
        label: 'Sports and Placement Fee',
        type: 'number',
        placeholder: 'Sports and Placement Fee',
        name: 'amounts.sports_placement_fee',
        disabled: false,
    },
    { label: 'Apparel Fee', type: 'number', placeholder: 'Apparel Fee', name: 'amounts.apparel_fee', disabled: false },
    {
        label: 'Examination Fee',
        type: 'number',
        placeholder: 'Examination Fee',
        name: 'amounts.examination_fee',
        disabled: false,
    },
    { label: 'Fine', type: 'number', placeholder: 'Fine', name: 'amounts.fine', disabled: false },
];
