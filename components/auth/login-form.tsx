"use client";

import * as z from "zod";
import { 
    useState, 
    useTransition 
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import { LoginSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSucess } from "@/components/form-sucess";
import { login } from "@/actions/login";
import Link from "next/link";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "E-mail já está em uso!"
    : "";

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          email: "",
          password: "",  
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
            .then((data) => {
                setError(data?.error);
            });
        });
    };

    return (
        <CardWrapper
        headerLabel="Bem-vindo de volta! "
        backButtonLabel="Ainda não tem uma conta?"
        backButtonHref="/auth/entrar"
        showSocial
        >
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                >
                <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                {...field}
                                disabled={isPending}
                                placeholder="E-MAIL"
                                type="email"
                                />
                            </FormControl>
                            <FormMessage /> 
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                {...field}
                                disabled={isPending}
                                placeholder="SENHA"
                                type="password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormError message={error || urlError}/>
                <FormSucess message={success}/>
                <Button
                disabled={isPending}
                type="submit"
                className="w-full"
                variant="entrar"
                
                >
                    Entrar
                </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};