import { z } from "zod";

export const CreateCard = z.object({
    title: z.string({
        required_error: "Título é necessário.",
        invalid_type_error: "Título é necessário.",
    }).min(1, {
        message: "Título é muito curto!",
    }),
    boardId: z.string(),
    listId: z.string(),
});