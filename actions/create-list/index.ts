"use server";

import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import { CreateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const session = await auth();

    if (!session || !session.user?.id) {
        return {
            error: "Sem autorização",
        };
    }

    const userId = session.user.id;

    const { title, boardId } = data;
    let list;

    try {
        const board = await db.board.findUnique({
            where: {
                id: boardId,
                userId,
            },
        });

        if (!board) {
            return {
                error: "Rotina não encontrada!",
            };
        }

        const lastList = await db.list.findFirst({
            where: { boardId: boardId },
            orderBy: { order: "desc" },
            select: { order: true },
        });

        const newOrder = lastList ? lastList.order + 1 : 1;

        list = await db.list.create({
            data: {
                title,
                boardId,
                order: newOrder,
            },
        });
    } catch (error) {
        console.error("Erro ao atualizar a lista:", error);
        return {
        error: "Falha ao atualizar."
    };
    }

    revalidatePath(`/rotina/${boardId}`); 
    return { data: list };
};

export const createList = createSafeAction(CreateList, handler);