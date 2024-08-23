"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { UpdateCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const session = await auth();

    if (!session || !session.user?.id) {
        return {
            error: "Sem autorização",
        };
    }

    const userId = session.user.id;

    const { id, boardId, ...values } = data;
    let card;

    try {
        card = await db.card.update({
            where: {
                id,
                list:{
                    board: {
                        userId,
                    },
                },
            },
            data: {
                ...values,
            },
        });
    } catch (error) {
        return {
            error: "Falha ao atualizar."
        }
    }

    revalidatePath(`/rotina/${boardId}`);
    return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);