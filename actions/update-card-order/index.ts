"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { UpdateCardOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const session = await auth();

    if (!session || !session.user?.id) {
        return {
            error: "Sem autorização",
        };
    }

    const userId = session.user.id;

    const { items, boardId } = data;
    let updatedCards;

    try {
        const transaction = items.map((card) =>
        db.card.update({
            where:{
                id: card.id,
                list: {
                    board: {
                        userId,
                    },
                },
            },
            data: {
                order: card.order,
                listId: card.listId,
            },
        }),
        );

        updatedCards = await db.$transaction(transaction);
    } catch (error) {
        return {
        error: "Falha ao reorganizar."
        }
    }

    revalidatePath(`/rotina/${boardId}`);
    return { data: updatedCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);