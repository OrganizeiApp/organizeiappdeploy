import { FeedWrapperInicio } from "@/components/feed-wrapper-inicio";
import { Separator } from "@/components/ui/separator";
import { MobileSidebar } from "@/components/ui/mobile-sidebar";
import { Infos } from "./_components/info";



const calendario = async () => {
    return (
        <div className="w-full flex flex-row-reverse gap-[48px]">
            <FeedWrapperInicio>
            <div className="lg:hidden">
            <MobileSidebar />
            </div>
            <div className='px-4 pt-4'>
            <Infos />
            <Separator className="lg:hidden"/>
            </div>
            </FeedWrapperInicio>
        </div>
        
    );
}

export default calendario;