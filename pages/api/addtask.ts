import {TaskService} from '../../src/service/TaskService';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function(req: NextApiRequest,res: NextApiResponse){
    const newTask =await TaskService.addTask(req.body.uid, req.body.todoItem);
    res.status(200).json(newTask);
}