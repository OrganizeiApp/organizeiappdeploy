"use client";

import * as z from "zod";
import { 
    useState, 
    useTransition 
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schema";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { CardWrapperRg } from "@/components/auth/card-wrapper-rg"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSucess } from "@/components/form-sucess";
import { register } from "@/actions/register";

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
          email: "",
          password: "",  
          name: "",
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    };

    return (
        <CardWrapperRg
        headerLabel="Crie uma conta!"
        backButtonLabel="Já tem uma conta?"
        backButtonHref="/auth/login"
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                {...field}
                                disabled={isPending}
                                placeholder="NOME"
                                />
                            </FormControl>
                            <FormMessage /> 
                        </FormItem>
                    )}
                    />
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
                <FormError message={error}/>
                <FormSucess message={success}/>
                <Button
                disabled={isPending}
                type="submit"
                className="w-full"
                variant="entrar"
                
                >
                    CRIAR CONTA
                </Button>
                </form>
            </Form>
        </CardWrapperRg>
    );
};