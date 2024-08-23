import { MobileSidebar } from "@/components/ui/mobile-sidebar";


export const MobileHeader = () => {
    return (
        <nav className="lg:hidden px-6 h-[50px] flex items-center bg-[#7935E8] border-b fixed top-0 w-full z-50">
        <MobileSidebar />
        <div className="lg:hidden ml-auto justify-end w-full flex items-center gap-x-2">
            <div className="lg:hidden pt-8 pb-8 flex items-center gap-x-3">
                </div>
            </div>
        </nav>
    );
};