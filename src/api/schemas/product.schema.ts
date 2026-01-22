import z from "zod";

export const productSchema = z.object({
    createdAt: z.string().optional(),
    name: z.string(),
    avatar: z.string().optional(),
    material: z.string().optional(),
    description: z.string().optional(),
    price: z.string(),
    id: z.string(),
});
export type Product = z.infer<typeof productSchema>

export const productInputSchema = z.object({
    createdAt: z.string().optional(),
    name: z.string().min(1, 'Nama wajib diisi'),
    avatar: z.string().optional(),
    material: z.string().optional(),
    description: z.string().optional(),
    price: z
            .string()
            .min(1, 'Harga wajib diisi')
            .refine((val) => !Number.isNaN(Number(val)), 'Harga harus berupa angka')
            .refine((val) => Number(val) > 0, 'Harga harus lebih dari 0')
});
export type ProductInputSchemaType = z.infer<typeof productInputSchema>