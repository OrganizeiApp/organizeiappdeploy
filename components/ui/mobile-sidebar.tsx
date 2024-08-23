import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";
import { Button } from "./button";
import Link from "next/link";

export const MobileSidebar = () => {
    return (
        <div className="w-full h-[50px] bg-[#7935E8] flex items-center justify-center relative">
            <Link href="/inicio">
            <Button
                className="flex items-center space-x-2"
                variant='logo'
            >
                Organizei
            </Button>
            </Link>
            <div className="absolute left-4 top-6 transform -translate-y-1/2">
                <Sheet>
                    <SheetTrigger>
                        <Menu className="text-[#F8F7FF]" />
                    </SheetTrigger>
                    <SheetContent className="p-0 z-[100]" side="left">
                        <Sidebar />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};
