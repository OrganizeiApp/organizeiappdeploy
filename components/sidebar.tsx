import { cn } from "@/lib/utils";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { Loader } from "lucide-react";
import SettingsPage from "./ui/logout-button";
import Image from "next/image";

type Props = {
    className?: string;
};

export const Sidebar = ({ className }: Props) => {
    return(
        <div className={cn(
            "flex bg-[#F8F7FF] h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
             className,
            )}>
            <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                <Image 
                src="/LogNav.svg"
                height="40"
                width="40"
                alt="Logo"
                />
                <h1 className="text-2xl font-extrabold text-[#7935E8] tracking-wide">
                    Organizei
                </h1>
            </div>
            <div className="flex flex-col gap-y-2 flex-1">
            {/* <SidebarItem 
            label="Início" 
            href="/inicio"
            iconSrc="/EXTANTE.svg"
            /> */}
            <SidebarItem 
            label="Rotina" 
            href="/rotina"
            iconSrc="/CALENDARIO.svg"
            />
            <SidebarItem
            label="FEEDBACK" 
            href="https://forms.gle/vhn5N7v77xXMqnVaA"
            iconSrc="/MOTIVADOR.svg"
            />
            <SidebarItem
            label="INSTAGRAM" 
            href="https://www.instagram.com/organizeiapp?igsh=MTFlYWpzZmQ0c3NzYg=="
            iconSrc="/INSTA.svg"
            />
            <SidebarItem
            label="TikTok" 
            href="https://www.tiktok.com/@organizeiapp?_t=8p2Gp80bRrh&_r=1"
            iconSrc="/TIKTOK.svg"
            />
            </div>
            <div className="lg:hidden flex  justify-start  gap-x-4">
            <div className="pt-8 pb-7 flex items-center gap-x-3">
            <SettingsPage/>
            </div>
            </div>
            <div className="hidden lg:flex p-4 justify-start  gap-x-4">
            <div className="pt-8 pb-7 flex items-center gap-x-3">
            <SettingsPage/>
            </div>
            </div>
        </div>
    );
};