import {TaskService} from '../../src/service/TaskService';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function(req: NextApiRequest,res: NextApiResponse){
    if(req.body.completed){
        await TaskService.completeTask(req.body.id);
    }else{
        await TaskService.removeTask(req.body.id);
    }
    res.status(200);
}