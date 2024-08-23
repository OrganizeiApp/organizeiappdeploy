import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/ui/mobile-header";
import { Toaster } from "sonner";

type Props = {
    children: React.ReactNode;
};

const MainLayout = ({
    children,
}: Props) => {
    return(
        <>
        <QueryProvider>
            <Toaster />
                    <Sidebar className="hidden lg:flex"/>
                        <ModalProvider />
                             <main className="lg:pl-[256px] h-full md:pt-[0px] sm:pt-[20px] lg:pt-[0px]">
                                <div className="w-full h-full mx-auto"> 
                                     {children}
                                </div>
                             </main>
        </QueryProvider>
        </>
    );
}

export default MainLayout;