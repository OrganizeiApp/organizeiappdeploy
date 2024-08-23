import { auth } from "@/auth";

import { db } from "@/lib/db";
import { MAX_FREE_RESUMOS } from "@/constants/resumos";

export const incrementAvailableCount = async () => {
    const session = await auth();

    if (!session || !session.user?.id) {
        throw new Error("Sem autorização!");
    }

    const userId = session.user.id;

    const resumoLimit = await db.resumoLimit.findUnique({
        where: { userId }
    });

    if (resumoLimit) {
        await db.resumoLimit.update({
            where: { userId },
            data: { count: resumoLimit.count + 1}
        });
    } else {
        await db.resumoLimit.create({
            data: { userId, count: 1}
        });
    }
};

export const decreaseAvailableCount = async () => {
    const session = await auth();

    if (!session || !session.user?.id) {
        throw new Error("Sem autorização!");
    }

    const userId = session.user.id;

    const resumoLimit = await db.resumoLimit.findUnique({
        where: { userId }
    });

    if (resumoLimit) {
        await db.resumoLimit.update({
            where: { userId },
            data: { count: resumoLimit.count > 0 ? resumoLimit.count - 1 : 0}
        });
    } else {
        await db.resumoLimit.create({
            data: { userId, count: 1}
        });
    }
};

export const hasAvailableCount = async () => {
    const session = await auth();

    if (!session || !session.user?.id) {
        throw new Error("Sem autorização!");
    }

    const userId = session.user.id;

    const resumoLimit = await db.resumoLimit.findUnique({
        where: { userId }
    });

    if (!resumoLimit || resumoLimit.count < MAX_FREE_RESUMOS) {
        return true;
    } else {
        return false;
    }
};

export const getAvailableCount = async () => {
    const session = await auth();

    if (!session || !session.user?.id) {
        return 0;
    } 

    const userId = session.user.id;

    const resumoLimit = await db.resumoLimit.findUnique({
        where: { userId }
    });

    if (!resumoLimit) {
        return 0;
    }

    return resumoLimit.count;
};


