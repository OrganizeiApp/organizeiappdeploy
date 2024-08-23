"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { UpdateListOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const session = await auth();

    if (!session || !session.user?.id) {
        return {
            error: "Sem autorização",
        };
    }

    const userId = session.user.id;

    const { items, boardId } = data;
    let lists;

    try {
        const transaction = items.map((list) => 
            db.list.update({
            where: {
                id: list.id,
                board: {
                    userId,
                },
            },
            data: {
                order: list.order,
            },
        })
    );

    lists = await db.$transaction(transaction);
    } catch (error) {
        return {
        error: "Falha ao reorganizar."
        }
    }

    revalidatePath(`/rotina/${boardId}`);
    return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);