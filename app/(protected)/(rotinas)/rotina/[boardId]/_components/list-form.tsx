"use client";

import { Plus, X } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { ListWrapper } from "./list-wrapper";
import { useState, useRef, ElementRef } from "react";
import { FormInput } from "@/components/form/form-input";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { UseAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";

export const ListForm = () => {
    const router = useRouter();
    const params = useParams();

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const { execute, fieldErrors } = UseAction(createList, {
        onSuccess: (data) => {
            toast.success(`Lista ${data.title} criada`);
            disableEditing();
            router.refresh();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        };
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;

        execute({
            title,
            boardId
        });
    };

    if (isEditing){
        return(
            <ListWrapper>
                <form
                    action={onSubmit}
                    ref={formRef}
                    className="w-full p-3 rounded-md border-[#B9DBFA] border-6 border-b-4 rounded-b-lg bg-[#E5F3FF] space-y-4 shadow-md"
                >
                    <FormInput
                        ref={inputRef}
                        errors={fieldErrors}
                        id="title"
                        className="text-sm px-2 py-1 h-7 font-extrabold border-transparent hover:border-input focus:border-input transition"
                        placeholder="Digite o título do item..."
                    />
                    <input 
                        hidden
                        value={params.boardId}
                        name="boardId"
                    />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit
                        variant="yellow"
                        >
                            Adicionar lista
                        </FormSubmit>
                        <Button 
                        onClick={disableEditing}
                        size="sm"
                        variant="ghostlist"
                        >
                            <X className="h-5 w-5 text-[#8DC3F5]"/>
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>
            <button
                onClick={enableEditing}
                className="w-full rounded-md bg-[#E5F3FF] text-[#8DC3F5] hover:bg-[#B9DBFA]/90 border-[#B9DBFA] border-b-4 activate:border-b-0 font-extrabold text-sm p-3 flex items-center "
            >
                <Plus className="h-4 w-4 mr-2"/>
                Adicionar uma lista!
            </button> 
        </ListWrapper>
    );
};