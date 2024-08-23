"use client";

import { RegButton } from "@/components/auth/register-button";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

export const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4 bg-[#6F73D2]">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white">
            Sua jornada para o sucesso acadêmico começa aqui! <br /> Bem-vindo à <span
            className="underline">Organizei!</span> 
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white">
            Organizei é a sua estante digital! <br />
            Acesse tudo facilmente, sempre que precisar.
            </h3>
            <h3>
            <RegButton>
            <Button 
            variant="yellow"
            size="big"
            >
            COMEÇAR
            <ArrowRight className="h-4 w-4 ml-2"/>
            </Button>
            </RegButton>
            </h3>
        </div>
    )
}