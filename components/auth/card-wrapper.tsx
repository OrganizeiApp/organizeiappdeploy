"use client";

import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader
 } from "@/components/ui/card";
import { HeaderLogin } from "@/components/auth/header-login";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";


interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
};

export const CardWrapper = ({ 
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial    
}: CardWrapperProps) => {
    return(
        <Card className="w-[400px] shadow-md">
            <CardHeader>
             <HeaderLogin label={headerLabel} /> 
            {/* </CardHeader>
            <p className="text-sm font-bold flex flex-col pl-6">Lembre-se de que, para utilizar todas as funções, é necessário entrar com uma conta Google!</p>
            <CardHeader> */}
            <div className="pt-4"/>
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