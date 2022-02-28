import {prisma} from '../lib/prisma';
import { async } from '@firebase/util';
interface Todo {
    id: number,
    name: string,
    difficulty: number,
    duration: number,
    type: number 
}
export const TaskService = {
    getTaskByUser: async (uid: string) => {
        const Tasks = await prisma.task.findMany({
            where: {
                uid: uid,
                completed: false
            }
        });
        return Tasks;
    },
    addTask: async (uid: string, task: Todo) => {
        const newTask = await prisma.task.create({
            data: {
                uid: uid,
                task: task.name,
                difficulty: task.difficulty,
                duration: task.duration,
                type: task.type
            }
        });
        return newTask
    },
    completeTask: async (id: number) => {
        await prisma.task.update({
            where: {
                id: id,
            },
            data: {
                completed: true
            }
        })
    },
    removeTask: async (id: number) => {
        await prisma.task.delete({
            where: {
                id: id
            }
        })
    },
}

