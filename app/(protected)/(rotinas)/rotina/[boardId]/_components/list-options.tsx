"use client";

import { List } from "@prisma/client";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { UseAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/delete-list";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";
import { copyList } from "@/actions/copy-list";


interface ListOptionsProps {
    data: List;
    onAddCard: () => void;
};

export const ListOptions = ({
    data,
    onAddCard,
}: ListOptionsProps) => {
    const closeRef = useRef<ElementRef<"button">>(null);

    const { execute: executeDelete } = UseAction(deleteList, {
        onSuccess: (data) => {
            toast.success(`Quadro "${data.title}" deletado`);
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onDelete = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        executeDelete({ id, boardId });
    };

    const { execute: executeCopy } = UseAction(copyList, {
        onSuccess: (data) => {
            toast.success(`Quadro "${data.title}" copiado`);
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onCopy = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        executeCopy({ id, boardId });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2 " variant="ghostlist">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <div className="text-md font-extrabold text-start pl-5 text-black pb-2" >
                    Ações:
                </div>
                <Separator />
                <PopoverClose ref={closeRef} asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-black" variant="ghostlist">
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-extrabold text-sm"
                    variant="ghostlist"
                >
                    Adicionar Item...
                </Button>
                <Separator />
                <form
                    action={onCopy}
                >
                    <input hidden name="id" id="id" value={data.id} />
                    <input hidden name="boardId" id="boardId" value={data.boardId} />
                    <FormSubmit
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-extrabold text-sm"
                        variant="ghostlist"
                    >
                        Copiar Lista...
                    </FormSubmit>
                </form>
                <Separator />
                <form
                    action={onDelete}
                >
                    <input hidden name="id" id="id" value={data.id} />
                    <input hidden name="boardId" id="boardId" value={data.boardId} />
                    <FormSubmit
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-extrabold text-sm"
                        variant="ghostlist"
                    >
                        Deletar Lista...
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};