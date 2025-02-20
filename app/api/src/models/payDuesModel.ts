import mongoose from 'mongoose';

const DuesSchema = new mongoose.Schema(
    {
        tutionFee: {
            total: { type: Number, default: 0 },
            paid: { type: Number, default: 0 },
            pending: { type: Number, default: 0 },
        },
        busFee: {
            total: { type: Number, default: 0 },
            paid: { type: Number, default: 0 },
            pending: { type: Number, default: 0 },
            monthlyPay: { type: Number, default: 0 },
        },
        stationary: {
            total: { type: Number, default: 0 },
            paid: { type: Number, default: 0 },
            pending: { type: Number, default: 0 },
        },
        sports_placement: {
            total: { type: Number, default: 0 },
            paid: { type: Number, default: 0 },
            pending: { type: Number, default: 0 },
        },
        apparel: {
            total: { type: Number, default: 0 },
            paid: { type: Number, default: 0 },
            pending: { type: Number, default: 0 },
        },
        examinationFee: {
            total: { type: Number, default: 0 },
            paid: { type: Number, default: 0 },
            pending: { type: Number, default: 0 },
        },
        fine: {
            total: { type: Number, default: 0 },
            paid: { type: Number, default: 0 },
            pending: { type: Number, default: 0 },
        },
        lastUpdated: { type: Date, default: Date.now },
    },
    { _id: false }
);

const TransactionHistorySchema = new mongoose.Schema(
    {
        paymentId: { type: String, required: true },
        amount: { type: Number, required: true },
        paidFor: {
            type: String,
            enum: ['tuitionFee', 'busFee', 'stationary', 'sports&placement', 'apparel', 'examinationFee', 'fine'],
        },
        method: { type: String },
        status: { type: String, enum: ['Success', 'Failed', 'Pending'], default: 'Pending' },
        receiptUrl: { type: String },
        createdAt: { type: Date, default: Date.now },
    },
    { _id: false }
);

const PayDuesSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'please enter a name'] },
    registerNo: { type: String, required: [true, 'please enter register no'] },
    dues: { type: DuesSchema, default: () => ({}) },
    refund: { type: Boolean, default: false },
    prevPending: { type: Boolean, default: false },
    totalAmount: { type: Number, default: 0 },
    paidAmount: { type: Number, default: 0 },
    pendingAmount: { type: Number, default: 0 },
    halfDue: { type: Boolean, default: false },
    transactionHistory: { type: [TransactionHistorySchema], default: [] },
});

const PayDuesModel = mongoose.model('payDues', PayDuesSchema);
export const createDues = (data: any) => PayDuesModel.create(data);
