import { auth } from "@/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(req: Request,
    { params }: { params: {cardId: string } }
) {
    try {

        const session = await auth();

        if (!session || !session.user?.id) {
            return new NextResponse("Sem autorização", { status: 401 });
        }
    
        const userId = session.user.id;    

        const card = await db.card.findUnique({
            where: {
                id: params.cardId,
                list: {
                    board: {
                        userId,
                    },
                },
            },
            include: {
                list: {
                    select: {
                        title: true,
                    },
                },
            },
        });

        return NextResponse.json(card);
    } catch (error) {
        return new NextResponse("Erro interno", { status: 500 });
    }
}