import {prisma} from '../lib/prisma';
export const TaskService = {
    getUserData: async (uid: string) => {
        const userData = await prisma.user.findUnique({
            where: {
                uid: uid
            }
        });
        return userData;
    },
    updateUserScore: async (uid: string, score: number) => {
        await prisma.user.update({
            where: {
                uid: uid
            },
            data: {
                score: score
            }
        })
    },
    updateUserHighScore: async (uid:string, score: number) => {
        await prisma.user.update({
            where: {
                uid: uid
            },
            data: {
                highscore: score
            }
        })
    }
}