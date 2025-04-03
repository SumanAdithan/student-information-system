import { z } from 'zod';

export const FeeDetailsSchema = z
    .object({
        monthly_pay: z.number(),
        total: z.number(),
        paid: z.number(),
        pending: z.number(),
        fully_paid: z.boolean(),
    })
    .partial();

export const DuesDetailsSchema = z
    .object({
        tuition_fee: FeeDetailsSchema,
        bus_fee: FeeDetailsSchema,
        stationary_fee: FeeDetailsSchema,
        sports_placement_fee: FeeDetailsSchema,
        apparel_fee: FeeDetailsSchema,
        examination_fee: FeeDetailsSchema,
        fine: FeeDetailsSchema,
    })
    .partial();

export const TotalDetailsSchema = z
    .object({
        total_amount: z.number(),
        paid_amount: z.number(),
        pending_amount: z.number(),
        isPartial_paid: z.boolean(),
    })
    .partial();

export const TransactionSchema = z
    .object({
        date: z.string(),
        transactionId: z.string(),
        category: z.string(),
        amount: z.string(),
        method: z.string(),
    })
    .partial();

export const DuesSchema = z
    .object({
        dues_details: DuesDetailsSchema,
        total_details: TotalDetailsSchema,
        transaction_history: z.array(TransactionSchema),
    })
    .partial();

export const UpdateDuesSchema = DuesSchema.partial();
