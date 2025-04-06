import { QueryParams } from '@sis/types';
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
        paid: { type: Number, default: 0 },
        pending: { type: Number, default: 0 },
        fully_paid: { type: Boolean, default: false },
    },
    { _id: false }
);

const TransactionSchema = new Schema(
    {
        transactionId: { type: String, required: true },
        category: {
            type: String,
            enum: ['TuitionFee', 'BusFee', 'Stationary', 'Sports&placement', 'Apparel', 'ExaminationFee', 'Fine'],
        },
        amount: { type: Number, required: true },
        status: { type: String, enum: ['Success', 'Failed', 'Pending'], default: 'Pending' },
        method: { type: String, required: true },
    },
    { _id: false, timestamps: true }
);

const TotalDetailsSchema = new Schema(
    {
        total_amount: { type: Number, default: 0 },
        paid_amount: { type: Number, default: 0 },
        pending_amount: { type: Number, default: 0 },
        isPartial_paid: { type: Boolean, default: false },
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

export const getFilteredDuesData = async (queryStr: QueryParams) => {
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

export const updateDuesData = (registerNo: number, category: string, amount: number) => {
    return DuesModel.updateOne({ registerNo }, [
        {
            $set: {
                [`dues_details.${category}.paid`]: {
                    $add: [`$dues_details.${category}.paid`, amount],
                },
                [`dues_details.${category}.pending`]: {
                    $subtract: [
                        `$dues_details.${category}.total`,
                        { $add: [`$dues_details.${category}.paid`, amount] },
                    ],
                },
                [`dues_details.${category}.fully_paid`]: {
                    $eq: [
                        {
                            $subtract: [
                                `$dues_details.${category}.total`,
                                { $add: [`$dues_details.${category}.paid`, amount] },
                            ],
                        },
                        0,
                    ],
                },
            },
        },
        {
            $set: {
                'total_details.total_amount': {
                    $sum: Object.keys(categoryFields).map((field) => `$dues_details.${field}.total`),
                },
                'total_details.paid_amount': {
                    $sum: Object.keys(categoryFields).map((field) => `$dues_details.${field}.paid`),
                },
                'total_details.pending_amount': {
                    $sum: Object.keys(categoryFields).map((field) => `$dues_details.${field}.pending`),
                },
            },
        },
        {
            $set: {
                'total_details.isPartial_paid': {
                    $gte: [
                        {
                            $subtract: ['$total_details.total_amount', '$total_details.pending_amount'],
                        },
                        { $divide: ['$total_details.total_amount', 2] },
                    ],
                },
            },
        },
    ]);
};
