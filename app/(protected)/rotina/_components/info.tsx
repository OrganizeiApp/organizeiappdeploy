"use client";

import { db } from "@/lib/db";
import Image from "next/image";

export const Info = () => {
    return (
        <div className="flex items-center gap-x-4">
            <div className="lg:pt-8 lg:pl-4 w-[400px] h-[60px] relative">
                <p className="font-extrabold lg:text-3xl text-2xl text-[#7935E8]">
                    Aqui estão seus Quadros:
                </p>
            </div>
        </div>
    );
};