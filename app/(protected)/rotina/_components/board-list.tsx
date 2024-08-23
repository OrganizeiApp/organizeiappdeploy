import { db } from "@/lib/db";
import { Board } from "@prisma/client";
import { FormPopover } from "@/components/form/form-popover-board";
import { Hint } from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MAX_FREE_ROTINA } from "@/constants/rotina";
import { getAvailableCount } from "@/lib/rotina-limit";

export const BoardList = async () => {

    const session = await auth();

    if (!session || !session.user?.id) {
        return ("/");
    }

    const userId = session.user.id;

    const boards = await db.board.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const AvailableCount = await getAvailableCount();

    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
            </div>
            <div className="grid grid-cols-2 sm:grid-cols3 lg:grid-cols-4 gap-4">
                {boards.map((board) => (
                    <Link
                    key={board.id}
                    href={`/rotina/${board.id}`}
                    className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-[#E5FFF0] border-2 border-[#B6FAD2] rounded-sm h-full w-full p-2 overflow-hidden"
                    >
                        <div />
                        <p className="relative font-extrabold text-[#62F09C]">
                            {board.title}
                        </p>
                    </Link>
                ))}
                <FormPopover sideOffset={10} side="bottom">
                <div
                role="button"
                className="aspect-video relative h-full w-full bg-muted rounded-lg flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                >
                <p className="text-sm">Criar novo Quadro</p>
                <span className="text-xs">
                    {`${MAX_FREE_ROTINA - AvailableCount} restantes`} 
                </span>
                <Hint
                    sideOffset={40}
                    description={`
                        Na fase de testes, são liberados somente 10 espaços para hábitos, metas e listas.
                        `}
                >
                    <HelpCircle
                    className="absolute bottom-2 right-2 h-[14px] w-[14px]"
                    />
                </Hint>
                </div>
                </FormPopover>
            </div>
        </div>
    );
};
