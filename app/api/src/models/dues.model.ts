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

export const createDues = (name: string, year: number, registerNo: number) =>
    DuesModel.create({ name, year, registerNo });
export const deleteDues = (registerNo: number) => DuesModel.deleteOne({ registerNo });
