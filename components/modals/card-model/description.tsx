"use client";

import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { UseAction } from "@/hooks/use-action";
import { UpdateCard } from "@/actions/update-card/schema";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";

interface DescriptionProps {
    data: CardWithList;
};

export const Description = ({
    data
}: DescriptionProps) => {
    const params = useParams();
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null);
    const textareaRef = useRef<ElementRef<"textarea">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        });
    }

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const { execute, fieldErrors } = UseAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id],
            });
            toast.success(`Item "${data.title}" atualizado!`)
            disableEditing();
        },
    });

    const onSubmit = (formData: FormData) => {
        const description = formData.get("description") as string;
        const boardId = params.boardId as string;

        execute({
            id: data.id,
            description,
            boardId,
        })
    }

    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="h-5 w-5 mt-0.5 text-[#8DC3F5]"/>
            <div className="w-full">
                <p className="font-extrabold text-[#8DC3F5] mb-2">
                    Descrição
                </p>
                {isEditing ? (
                    <form
                        action={onSubmit}
                        ref={formRef}
                        className="space-y-2"
                    >
                        <FormTextarea 
                        id="description"
                        className="w-full mt-2 font-extrabold text-[#463F3A]"
                        placeholder="Adicione uma descrição detalhada..."
                        defaultValue={data.description || undefined}
                        errors={fieldErrors}
                        ref={textareaRef}
                        />
                        <div className="flex items-center gap-x-2">
                            <FormSubmit
                                variant="yellow"
                            >
                                Salvar
                            </FormSubmit>
                            <Button
                                type="button"
                                onClick={disableEditing}
                                size="sm"
                                variant="red"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                ) : (
                <div
                    onClick={enableEditing}
                    role="button"
                    className="min-h-[78px] bg-white text-sm font-extrabold py-3 px-3.5 rounded-md border-2 border-[#8DC3F5] text-[#463F3A]"
                >
                    {data.description || "Adicione uma descrição detalhada..."}
                </div>
                )}
            </div>
        </div>
    );
};

Description.Skeleton = function DescriptionSkeleton() {
    return(
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-[#8DC3F5]" />
            <div className="w-full">
                <Skeleton className="w-24 h-6 mb-2 bg-[#8DC3F5]" />
                <Skeleton className="w-full h-[78px] bg-[#8DC3F5]" />
            </div>
        </div>
    );
};