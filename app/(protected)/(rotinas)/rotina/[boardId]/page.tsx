import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ListContainer } from "./_components/list-container";

interface BoardIdPageProps {
    params: {
        boardId: string;
    };
};

const BoardIdPage = async ({
    params,
}: BoardIdPageProps) => {

    const session = await auth();

    if (!session || !session.user?.id) {
        redirect("/rotina");
    };

    const userId = session.user.id;

    const lists = await db.list.findMany({
        where: {
            boardId: params.boardId,
            board: {
                userId,
            },
        },
        include: {
            cards: {
                orderBy: {
                    order: "asc",
                },
            },
        },
        orderBy: {
            order: "asc",
        },
    });

    return (
        <div className="p-4 h-full overflow-x-auto">
            <ListContainer 
                boardId={params.boardId}
                data={lists}
            />
        </div>
    );
}

export default BoardIdPage;