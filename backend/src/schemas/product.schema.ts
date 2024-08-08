import {z} from 'zod';

export const productSchema = z.object({
    body: z.object({
        name: z
          .string({
            required_error: "Name is required"
          }),
        price: z
          .number({
            required_error: "Price is required"  
          }),
        description: z
          .string({
            required_error: "Description is required"
          })
          .min(3, {
            message: "Description must be at least 3 characters"
          }),
        stock: z
          .number({
            required_error: "Stock is required"
          })
          .min(1, {
            message: "Stock must be at least 1 character"
          })
    })
});

export type ProductSchemaType = z.infer<typeof productSchema>["body"];