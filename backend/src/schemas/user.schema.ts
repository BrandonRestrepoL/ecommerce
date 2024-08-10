import {z} from 'zod';

// Definición del esquema de validación para el registro de usuario usando Zod
export const signupSchema = z.object({
      // Definición del objeto principal, que contiene los datos del cuerpo de la solicitud
    body: z.object({
        fullName: z
            .string({
                required_error: "Full name is required",
            })
            .min(3, {
                message: "Full name must be at least 3 characters",
            }),
        email: z
            .string({
                required_error: "Email is required",            
            })
            .email({
                message: "Email is not valid"
            }),
        password: z
            .string({
              required_error: "Password is required",
            })
            .min(6, {
              message: "Password must be at least 6 characters",
            }),
    }),
});

// Definición del esquema de validación para el inicio de sesión del usuario usando Zod
export const loginSchema = z.object({
  // Definición del objeto principal, que contiene los datos del cuerpo de la solicitud
    body: z.object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email({
          message: "Email is not valid",
        }),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, {
          message: "Password must be at least 6 characters",
        }),
    }),
});

export type SignupSchemaType = z.infer<typeof signupSchema>["body"];
export type LoginSchemaType = z.infer<typeof loginSchema>["body"];