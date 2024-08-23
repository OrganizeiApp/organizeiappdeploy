"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";

export const CardModal = () => {
    const id = useCardModal((state) => state.id);
    const isOpen = useCardModal((state) => state.isOpen);
    const onClose = useCardModal((state) => state.onClose);

    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ["card", id],
        queryFn: () => fetcher(`/api/cards/${id}`), //pode dar erro
    })

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="bg-[#E5F3FF] border-[#B9DBFA] border-b-4">
                {!cardData
                ? <Header.Skeleton />
                : <Header data={cardData} />
                }
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-3 flex flex-col space-y-6 items-start">
                        {!cardData
                            ? <Description.Skeleton />
                            : <Description data={cardData} />
                        }
                    </div>
                    {!cardData
                        ? <Actions.Skeleton />
                        : <Actions data={cardData} />
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
};
