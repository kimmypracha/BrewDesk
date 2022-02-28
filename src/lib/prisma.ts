
import {PrismaClient} from '@prisma/client';
declare global{
    var prisma: PrismaClient | undefined
}
export const prisma = 
        global.prisma ||
        new PrismaClient({
            log: ['query'],
        })

if(typeof window === "undefined" && process.env.NODE_ENV !== "production") global.prisma = prisma;


