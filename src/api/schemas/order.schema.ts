import z from "zod";
import { productSchema } from "./product.schema";

export const paymentDetailSchema = z.object({
    id: z.string(),
    subtotal: z.number().positive(),
    tax: z.number().positive().optional(),
    total: z.number().positive(),
    method: z.string(),
    provider: z.string(),
    status: z.string(),
    createdAt: z.string(),
    modifiedAt: z.string(),
});
export type PaymentDetailSchemaType = z.infer<typeof paymentDetailSchema>

export const orderSchema = z.object({
    id: z.string(),
    products: z.array(productSchema), // hrsnya cart scheme ada quantity per product
    quantity: z.string(),
    userID: z.string(),
    paymentID: z.string(),
    status: z.string(),
    createdAt: z.string().optional(),
    modifiedAt: z.string().optional(),
});
export type OrderSchemaType = z.infer<typeof orderSchema>

