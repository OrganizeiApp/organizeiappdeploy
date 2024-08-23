"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

interface CardItemProps {
    data: Card;
    index: number;
};

export const CardItem = ({
    data,
    index,
}: CardItemProps) => {

    const CardModal = useCardModal();

    return(
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
        <div 
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        role="button"
        onClick={() => CardModal.onOpen(data.id)}
        className="truncade border-2  hover:border-[#63ACF0] py-2 px-3 text-sm bg-[#E5F3FF] border-[#B9DBFA] text-[#8DC3F5] rounded-md shadow-sm"
        >
         {data.title}
        </div>
        )}
        </Draggable>
    );
};