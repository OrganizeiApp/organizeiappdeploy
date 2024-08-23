"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { getUserById } from "@/data/user";
import { auth } from "@/auth";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/rotina-limit";

const handler = async (data: InputType): Promise<ReturnType> => {
    const session = await auth();

    if (!session || !session.user?.id) {
        return {
            error: "Sem autorização",
        };
    }

    const canCreate = await hasAvailableCount();

    if (!canCreate) {
        return {
            error: "Você atingiu o limite máximo de rotinas da fase de testes!"
        }
    }

    const { title } = data;

    let board;

    try {
        board = await db.board.create({
            data: {
                title,
                userId: session.user.id,
            },
        });

        await incrementAvailableCount();

    } catch (error) {
        return {
        error: "falha ao criar."
        }
    }

    revalidatePath(`/rotina/${board.id}`);
    return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);