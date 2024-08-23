"use client";

import { Loader } from "lucide-react";
import { useScrolltop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { LoginButton } from "@/components/auth/login-button";

export const Navbar = () => {
    const scrolled = useScrolltop();

    return(
        <div className={cn(
            "z-50 bg-[#6F73D2] fixed top-0 flex items-center w-full p-6"
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                            <LoginButton>
                            <Button variant="green" >
                                Login
                            </Button> 
                            </LoginButton>
            </div>
        </div>
    )
}