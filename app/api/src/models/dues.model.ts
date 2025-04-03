import { Schema, model } from 'mongoose';

const FeeDetailsSchema = new Schema(
    {
        monthly_pay: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
        paid: { type: Number, default: 0 },
        pending: { type: Number, default: 0 },
        fully_paid: { type: Boolean, default: false },
    },
    { _id: false }
);

const TransactionSchema = new Schema(
    {
        date: { type: String, required: true },
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
        dues_details: {
            tuition_fee: { type: FeeDetailsSchema, required: true },
            bus_fee: { type: FeeDetailsSchema, required: true },
            stationary_fee: { type: FeeDetailsSchema, required: true },
            sports_placement_fee: { type: FeeDetailsSchema, required: true },
            apparel_fee: { type: FeeDetailsSchema, required: true },
            examination_fee: { type: FeeDetailsSchema, required: true },
            fine: { type: FeeDetailsSchema, required: true },
        },
        total_details: { type: TotalDetailsSchema, required: true },
        transaction_history: { type: [TransactionSchema], default: [] },
    },
    { timestamps: true }
);
