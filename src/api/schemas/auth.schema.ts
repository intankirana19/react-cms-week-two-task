import z from "zod";

export const authInputSchema = z.object({
    // email: z
    //         .string()
    //         .min(1, "Email wajib diisi")
    //         .refine(
    //             (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    //             { message: "Format email salah" }
    //         ),
    username: z.string().min(1, "Username wajib diisi"),
    password: z.string().min(1, "Password wajib diisi").min(8, "Password minimal 8 karakter"),
});
export type AuthInputSchemaType = z.infer<typeof authInputSchema>