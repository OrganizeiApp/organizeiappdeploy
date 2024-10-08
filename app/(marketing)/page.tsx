import { Button } from "@/components/ui/button";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/Heroes";
import { Footer } from "./_components/Footer";


const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col bg-[#6F73D2]">
      <div className="flex flex-col items-center justify-center
      md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
          <Heading />
         </div>
      <Footer />
    </div>
  )
}

export default MarketingPage;