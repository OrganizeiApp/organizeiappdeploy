import { Button } from "@/components/ui/button"

import { Logo } from "./Logo"

export const Footer = () => {
    return (
        <div className="flex items-center w-full px-6 z-50 dark:bg-[#6F73D2]">
            <Logo />
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
            </div>
        </div>
    )
}