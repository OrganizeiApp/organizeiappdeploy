import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
       message: "O e-mail é inválido" 
    }),
    password: z.string().min(1,{
        message: "A senha é inválida"
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
       message: "O e-mail inválido" 
    }),
    password: z.string().min(6,{
        message: "A senha deve conter no mínimo 6 caracteres",
    }),
    name: z.string().min(1, {
        message: "O nome é necessário",
    })
});