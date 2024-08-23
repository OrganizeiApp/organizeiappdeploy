"use client";

import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader
 } from "@/components/ui/card";
import { HeaderRegister } from "@/components/auth/header-rg";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
};

export const CardWrapperRg = ({ 
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial    
}: CardWrapperProps) => {
    return(
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <HeaderRegister label={headerLabel} />
            {/* </CardHeader>
            <p className="text-sm font-bold flex flex-col pl-6">Lembre-se de que, para utilizar todas as funções, é necessário cadastrar-se com uma conta Google!</p>
            <CardHeader> */}
            {children}
            </CardHeader>
            {/* show social */}
            <CardFooter>
                <BackButton
                label={backButtonLabel}
                href={backButtonHref}
                />
            </CardFooter>
        </Card>
    );
};