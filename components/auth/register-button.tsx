"use client";

import { useRouter } from "next/navigation";


interface RegButtonProps {
    children: React.ReactNode;
    mode?: "redirect",
    asChild?: boolean;
};

export const RegButton = ({
    children,
    mode = "redirect",
    asChild
}: RegButtonProps) => {
    const router = useRouter();

    const onClick = () => {
        router.push("/auth/entrar");
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
};