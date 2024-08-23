import { auth } from "@/auth";

export const Infos = async () => {
    const session = await auth();

    if (!session || !session.user?.id) {
        return (
            <div className="flex items-center gap-x-4">
                <div className="lg:pt-6 lg:pl-2 w-full h-[60px] relative">
                    <h2 className="font-extrabold lg:text-3xl text-3xl text-red-600">Sem autorização</h2>
                </div>
            </div>
        );
    }

    const userId = session.user.id;

    return (
        <div className="flex items-center gap-x-4">
            <div className="lg:pt-6 lg:pl-2 w-full h-[60px] relative">
                <h2 className="font-extrabold lg:text-3xl text-3xl text-[#7935E8]">Olá, {session.user.name}</h2>
            </div>
        </div>
    );
};
