import { Category, PayDuesSchemaType, QueryParams, reverseCategoryMap, Transaction, UpdateDues } from '@sis/types';
import { Schema, model } from 'mongoose';

const categoryFields = {
    tuition_fee: 1,
    bus_fee: 1,
    stationary_fee: 1,
    sports_placement_fee: 1,
    apparel_fee: 1,
    examination_fee: 1,
    fine: 1,
};

const FeeDetailsSchema = new Schema(
    {
        total: { type: Number, default: 0 },
        online: { type: Number, default: 0 },
        offline: { type: Number, default: 0 },
        pending: { type: Number, default: 0 },
        fully_paid: { type: Boolean, default: true },
    },
    { _id: false }
);

const TransactionSchema = new Schema(
    {
        transactionId: { type: String, required: true },
        category: {
            type: String,
            enum: [
                'Tuition Fee',
                'Bus Fee',
                'Stationary Fee',
                'Sports and Placement Fee',
                'Apparel Fee',
                'Examination Fee',
                'Fine',
            ],
        },
        amount: { type: Number, required: true },
        status: { type: String, default: 'Success' },
        method: { type: String, required: true },
        paidOn: { type: String, required: true },
    },
    { _id: false, timestamps: true }
);

const TotalDetailsSchema = new Schema(
    {
        previous_pending: { type: Number, default: 0 },
        total_amount: { type: Number, default: 0 },
        paid_amount: { type: Number, default: 0 },
        pending_amount: { type: Number, default: 0 },
        isPartial_paid: { type: Boolean, default: true },
        isFully_paid: { type: Boolean, default: true },
    },
    { _id: false }
);

const DuesSchema = new Schema(
    {
        name: { type: String, required: true },
        registerNo: { type: Number, required: true },
        year: { type: Number, required: [true, 'please enter a year'] },
        dues_details: {
            tuition_fee: { type: FeeDetailsSchema, default: () => ({}) },
            bus_fee: { type: FeeDetailsSchema, default: () => ({}) },
            stationary_fee: { type: FeeDetailsSchema, default: () => ({}) },
            sports_placement_fee: { type: FeeDetailsSchema, default: () => ({}) },
            apparel_fee: { type: FeeDetailsSchema, default: () => ({}) },
            examination_fee: { type: FeeDetailsSchema, default: () => ({}) },
            fine: { type: FeeDetailsSchema, default: () => ({}) },
        },
        total_details: { type: TotalDetailsSchema, default: () => ({}) },
        transaction_history: { type: [TransactionSchema], default: [] },
    },
    { timestamps: true }
);

const DuesModel = model('Dues', DuesSchema);

export const createDuesData = (name: string, year: number, registerNo: number) =>
    DuesModel.create({ name, year, registerNo });

export const getDuesDataByRegisterNo = (registerNo: number) => DuesModel.findOne({ registerNo });

export const getFilteredDuesData = (queryStr: QueryParams) => {
    const year = parseInt(queryStr.year);
    const isPartialPaid = queryStr.partialPaid === 'true';

    const pipeline: any[] = [];

    if (year) {
        pipeline.push({ $match: { year } });
    }

    if (typeof isPartialPaid !== 'undefined') {
        pipeline.push({ $match: { 'total_details.isPartial_paid': isPartialPaid } });
    }

    pipeline.push({
        $project: {
            registerNo: 1,
            year: 1,
            name: 1,
            tuition_fee: '$dues_details.tuition_fee',
            bus_fee: '$dues_details.bus_fee',
            stationary_fee: '$dues_details.stationary_fee',
            sports_placement_fee: '$dues_details.sports_placement_fee',
            apparel_fee: '$dues_details.apparel_fee',
            examination_fee: '$dues_details.examination_fee',
            fine: '$dues_details.fine',
            total_amount: '$total_details.total_amount',
            pending_amount: '$total_details.pending_amount',
            isPartial_paid: '$total_details.isPartial_paid',
        },
    });

    return DuesModel.aggregate(pipeline);
};

export const deleteDuesByRegisterNo = (registerNo: number) => DuesModel.deleteOne({ registerNo });

const updateTotalDetails = {
    'total_details.total_amount': {
        $sum: Object.keys(categoryFields).map((field) => `$dues_details.${field}.total`),
    },
    'total_details.paid_amount': {
        $sum: Object.keys(categoryFields).map((field) => ({
            $add: [`$dues_details.${field}.online`, `$dues_details.${field}.offline`],
        })),
    },
    'total_details.pending_amount': {
        $add: [
            { $sum: Object.keys(categoryFields).map((field) => `$dues_details.${field}.pending`) },
            `$total_details.previous_pending`,
        ],
    },
};

const updateIsPartialPaid = {
    'total_details.isPartial_paid': {
        $gte: [
            {
                $subtract: ['$total_details.total_amount', '$total_details.pending_amount'],
            },
            { $divide: ['$total_details.total_amount', 2] },
        ],
    },
    'total_details.isFully_paid': {
        $eq: [
            {
                $subtract: ['$total_details.total_amount', '$total_details.pending_amount'],
            },
            0,
        ],
    },
};

export const updateOnlinePaymentData = (dues: PayDuesSchemaType) => {
    const { registerNo, category: duesCategory, amount } = dues;
    const category = reverseCategoryMap[duesCategory as Category];
    const updateDueDetails = {
        [`dues_details.${category}.online`]: {
            $add: [`$dues_details.${category}.online`, amount],
        },
        [`dues_details.${category}.pending`]: {
            $subtract: [
                `$dues_details.${category}.total`,
                { $add: [`$dues_details.${category}.online`, `$dues_details.${category}.offline`, amount] },
            ],
        },
        [`dues_details.${category}.fully_paid`]: {
            $eq: [
                {
                    $subtract: [
                        `$dues_details.${category}.total`,
                        { $add: [`$dues_details.${category}.online`, `$dues_details.${category}.offline`, amount] },
                    ],
                },
                0,
            ],
        },
    };

    return DuesModel.findOneAndUpdate(
        { registerNo },
        [{ $set: updateDueDetails }, { $set: updateTotalDetails }, { $set: updateIsPartialPaid }],
        {
            returnDocument: 'after',
        }
    );
};

export const updateOfflinePaymentData = (dues: PayDuesSchemaType) => {
    const { registerNo, category: duesCategory, amount } = dues;
    const category = reverseCategoryMap[duesCategory as Category];
    const updateDueDetails = {
        [`dues_details.${category}.offline`]: {
            $add: [`$dues_details.${category}.offline`, amount],
        },
        [`dues_details.${category}.pending`]: {
            $subtract: [
                `$dues_details.${category}.total`,
                { $add: [`$dues_details.${category}.offline`, `$dues_details.${category}.online`, amount] },
            ],
        },
        [`dues_details.${category}.fully_paid`]: {
            $eq: [
                {
                    $subtract: [
                        `$dues_details.${category}.total`,
                        { $add: [`$dues_details.${category}.offline`, `$dues_details.${category}.online`, amount] },
                    ],
                },
                0,
            ],
        },
    };

    return DuesModel.findOneAndUpdate(
        { registerNo },
        [{ $set: updateDueDetails }, { $set: updateTotalDetails }, { $set: updateIsPartialPaid }],
        {
            returnDocument: 'after',
        }
    );
};

export const updateDuesData = (dues: UpdateDues) => {
    const { registerNo, amounts } = dues;

    const updateDueDetails: Record<string, any> = {};
    for (const [category, amount] of Object.entries(amounts)) {
        (updateDueDetails[`dues_details.${category}.total`] = amount),
            (updateDueDetails[`dues_details.${category}.pending`] = {
                $subtract: [
                    amount,
                    {
                        $add: [`$dues_details.${category}.online`, `$dues_details.${category}.offline`],
                    },
                ],
            });
        updateDueDetails[`dues_details.${category}.fully_paid`] = {
            $eq: [
                {
                    $subtract: [
                        amount,
                        {
                            $add: [`$dues_details.${category}.online`, `$dues_details.${category}.offline`],
                        },
                    ],
                },
                0,
            ],
        };
    }

    return DuesModel.updateOne({ registerNo }, [
        { $set: updateDueDetails },
        { $set: updateTotalDetails },
        { $set: updateIsPartialPaid },
    ]);
};

export const createTransactionHistory = (registerNo: number, transactionData: Transaction) => {
    return DuesModel.findOneAndUpdate(
        { registerNo },
        {
            $push: {
                transaction_history: transactionData,
            },
        }
    );
};

export const updatePreviousPending = (dues: PayDuesSchemaType) => {
    const { registerNo, category, amount } = dues;

    const updatePreviousPending = {
        'total_details.total_amount': {
            $subtract: ['$total_details.total_amount', amount],
        },
        'total_details.paid_amount': { $add: ['$total_details.paid_amount', amount] },
        'total_details.pending_amount': {
            $subtract: ['$total_details.pending_amount', amount],
        },
        'total_details.previous_pending': {
            $subtract: ['$total_details.previous_pending', amount],
        },
    };

    return DuesModel.findOneAndUpdate(
        { registerNo },
        [{ $set: updatePreviousPending }, { $set: updateIsPartialPaid }],
        {
            returnDocument: 'after',
        }
    );
};

export const resetDues = (registerNo: number) => {
    const updateDueDetails = {
        'due_details.tuition_fee': 0,
        'due_details.bus_fee': 0,
        'due_details.stationary_fee': 0,
        'due_details.sports_placement_fee': 0,
        'due_details.apparel_fee': 0,
        'due_details.examination_fee': 0,
        'due_details.fine': 0,
    };
    const updateTotalDues = {
        'total_details.total_amount': 0,
        'total_details.paid_amount': 0,
        'total_details.pending_amount': '$total_details.previous_pending',
    };
    const updatePreviousDues = {
        'total_details.previous_pending': {
            $add: [
                { $sum: Object.keys(categoryFields).map((field) => `$dues_details.${field}.total`) },
                `$total_details.previous_pending`,
            ],
        },
    };

    return DuesModel.findOneAndUpdate(
        { registerNo },
        [
            { $set: updatePreviousDues },
            { $set: updateTotalDues },
            { $set: updateDueDetails },
            { $set: updateIsPartialPaid },
        ],
        {
            returnDocument: 'after',
        }
    );
};
