import z from "zod";

// data table examples from https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fresources.fabric.inc%2Fhs-fs%2Fhubfs%2Fecommerce-platform-data-1.png%3Fwidth%3D1331%26name%3Decommerce-platform-data-1.png
export const userSchema = z.object({
    id: z.string(),
    role: z.string(), // sementara karna fitur admin/buyer gabung
    username: z.string(),
    firstname: z.string(),
    lastname: z.string().optional(),
    email: z.string(),
    phoneNumber: z.string().optional(),
    createdAt: z.string(),
    modifiedAt: z.string(),
});
export type UserSchemaType = z.infer<typeof userSchema>