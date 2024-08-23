"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UseAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delate-card";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-modal";

interface ActionsProps {
    data: CardWithList;
};

export const Actions = ({
    data,
}: ActionsProps) => {
    const params = useParams();
    const cardModal = useCardModal();

    const { 
        execute: executeCopyCard,
        isLoading: isLoadingCopy, 
    } = UseAction(copyCard, {
        onSuccess: (data) => {
            toast.success(`Item "${data.title}" copiado!`)
            cardModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        },
    });
    const { 
        execute: executeDeleteCard,
        isLoading: isLoadingDelete,
     } = UseAction(deleteCard, {
        onSuccess: (data) => {
            toast.success(`Item "${data.title}" deletado!`)
            cardModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        },
     });

    const onCopy = () => {
        const boardId = params.boardId as string;

        executeCopyCard({
            id: data.id,
            boardId,
        });
    };

    const onDelete = () => {
        const boardId = params.boardId as string;

        executeDeleteCard({
            id: data.id,
            boardId,
        });
    };

    return (
        <div className="space-y-2 mt-2">
            <div className="pt-4">
                {/*alinhar botaao com descrição*/}
            </div>
            <Button
            onClick={onCopy}
            disabled={isLoadingCopy}
            variant="yellow"
            className="w-full justify-start"
            size="inline"
            >
                <Copy className="h-4 w-4 mr-2" />
                COPIAR
            </Button>
            <Button
            onClick={onDelete}
            disabled={isLoadingDelete}
            variant="red"
            className="w-full justify-start"
            size="inline"
            >
                <Trash className="h-4 w-4 mr-2" />
                DELETAR
            </Button>
        </div>
    );
};

Actions.Skeleton = function ActionsSkeleton(){
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-[#8DC3F5]" />
            <Skeleton className="w-full h-4 bg-[#8DC3F5]" />
            <Skeleton className="w-full h-8 bg-[#8DC3F5]" />
        </div>
    );
};