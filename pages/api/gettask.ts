import {TaskService} from '../../src/service/TaskService';
import { NextApiRequest, NextApiResponse } from 'next';
import { Task } from '.prisma/client';
interface Todo {
    id: number,
    name: string,
    difficulty: number,
    duration: number,
    type: number
};
export default async function(req: NextApiRequest,res: NextApiResponse){
    const task = await TaskService.getTaskByUser(req.body.uid? req.body.uid : '');
    const initTask:Todo[] = task.map((task: Task)=>({
                                            id: task.id,
                                            name:task.task, 
                                            difficulty: task.difficulty,
                                            duration: task.duration,
                                            type: task.type}));
    
    console.log("Here is an uid you request");
    console.log(req.body);
    console.log("Here is task from TaskService");
    console.log(task);
    console.log("Here is task from server");
    console.log(initTask);
    res.status(200).json(initTask);
}