import { HeaderLogin } from "@/components/auth/header-login";
import { BackButton } from "@/components/auth/back-button";
import { TriangleAlert } from 'lucide-react';
import {
    CardWrapper
} from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
    return (
        <CardWrapper
        headerLabel="Ops! Algo deu errado!"
        backButtonHref="/auth/login"
        backButtonLabel="Voltar para login"
        >
            <div className="w-full flex justify-center items-center">
            <TriangleAlert className='text-destructive'/>
            </div>
        </CardWrapper>
    );
};