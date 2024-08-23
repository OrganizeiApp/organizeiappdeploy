import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-options";
import { Board } from "@prisma/client";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

interface BoardNavBarProps {
    data: Board;
};

export const BoardNavBarMobile = async ({
    data
}: BoardNavBarProps) => {

    if (!data) {
        throw new Error("data is undefined");
    }

    return (
        <div className="lg:hidden relative">
            <div className="w-full h-[45px] bg-[#7935E8] flex items-center px-4 relative">
            <div className="absolute left-4">
                    <Sheet>
                        <SheetTrigger>
                            <div className="text-white normal-case font-extrabold text-xl">
                                <MenuIcon />
                            </div>
                        </SheetTrigger>
                        <SheetContent className="p-0 z-[100]" side="left">
                            <Sidebar />
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="flex flex-grow items-center justify-center">
                    <Link
                    href="/inicio"
                    >
                    <Button
                    variant="logo"
                    >
                        Organizei
                    </Button>
                    </Link>
                </div>

                <div className="absolute right-4">
                    <BoardOptions id={data.id} />
                </div>
            </div>

            <div className="w-full h-[50px] bg-[#7935E8] flex items-center justify-center px-4 relative">
                <BoardTitleForm data={data} />
            </div>
        </div>
    );
};
