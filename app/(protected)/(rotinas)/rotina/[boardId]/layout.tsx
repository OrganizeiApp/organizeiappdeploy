import { auth } from "@/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { BoardNavBar } from "./_components/board-navbar";
import { BoardNavBarMobile } from "./_components/board-navbar-mobile";

export async function generateMetadata({
    params
}:{
    params: { boardId: string; };
}) {
    const session = await auth();

    if (!session || !session.user?.id) {
        return{
            title: "Rotina!",
        };
    }

    const userId = session.user.id;

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            userId
        }
    });

    return {
        title: board?.title || "Rotina",
    }

}

const BoardIdLayout = async ({ 
    children,
    params,
}: {
    children: React.ReactNode;
    params: { boardId: string; }; //nome da pasta
}) => {

    const session = await auth();

    if (!session || !session.user?.id) {
        return{
            title: "Rotina!",
        }
    };

    const userId = session.user.id;

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            userId,
           },
    });

    if (!board) {
        notFound();
    }

    return (
        <div className="relative h-full bg-no-repeat bg-cover bg-center bg-white border-slate-200 border-b-4 rounded-lg lg:overflow-auto">
            <main className="h-full">
            <BoardNavBarMobile data={board} />
            <div className="hidden lg:block">
            <BoardNavBar data={board} />
            </div>
            {children}
            </main>
        </div>
    );
};

export default BoardIdLayout;