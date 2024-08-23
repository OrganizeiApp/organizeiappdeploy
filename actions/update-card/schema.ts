import { z } from "zod";

export const UpdateCard = z.object({
    boardId: z.string(), //colocar o do calendario dps
    description: z.optional(
        z.string({ 
            required_error: "Descrição é necessária",
            invalid_type_error: "Descrição é necessária",
        }).min(1, {
            message: "Descrição é mutio curto.",
        }),
    ),
    title: z.optional(
        z.string({
        required_error: "Título é necessário.",
        invalid_type_error: "Título é necessário.",
    }).min(3, {
        message: "Título é muito curto!",
    })
    ),
    id: z.string(),
});