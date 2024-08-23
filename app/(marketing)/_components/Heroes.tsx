import Image from "next/image";

export const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl bg-[#6F73D2]">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
                <Image
                src="/desenho.svg"
                fill
                className="object-contain"
                alt="Estante"
                />
                </div>
            </div>
        </div>
    )
}