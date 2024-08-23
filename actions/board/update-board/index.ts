"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { UpdateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const session = await auth();

    if (!session || !session.user?.id) {
        return {
            error: "Sem autorização",
        };
    }

    const userId = session.user.id;

    const { title, id } = data;
    let board;

    try {
        board = await db.board.update({
            where: {
                id,
                userId,
            },
            data: {
                title,
            },
        });
    } catch (error) {
        return {
            error: "Falha ao atualizar."
        }
    }

    revalidatePath('/rotina/${id}');
    return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);