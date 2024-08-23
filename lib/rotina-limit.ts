import { auth } from "@/auth";

import { db } from "@/lib/db";
import { MAX_FREE_ROTINA } from "@/constants/rotina";

export const incrementAvailableCount = async () => {
    const session = await auth();

    if (!session || !session.user?.id) {
        throw new Error("Sem autorização!");
    }

    const userId = session.user.id;

    const rotinaLimit = await db.rotinaLimit.findUnique({
        where: { userId }
    });

    if (rotinaLimit) {
        await db.rotinaLimit.update({
            where: { userId },
            data: { count: rotinaLimit.count + 1}
        });
    } else {
        await db.rotinaLimit.create({
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

    const rotinaLimit = await db.rotinaLimit.findUnique({
        where: { userId }
    });

    if (rotinaLimit) {
        await db.rotinaLimit.update({
            where: { userId },
            data: { count: rotinaLimit.count > 0 ? rotinaLimit.count - 1 : 0}
        });
    } else {
        await db.rotinaLimit.create({
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

    const rotinaLimit = await db.rotinaLimit.findUnique({
        where: { userId }
    });

    if (!rotinaLimit || rotinaLimit.count < MAX_FREE_ROTINA) {
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

    const rotinaLimit = await db.rotinaLimit.findUnique({
        where: { userId }
    });

    if (!rotinaLimit) {
        return 0;
    }

    return rotinaLimit.count;
};


