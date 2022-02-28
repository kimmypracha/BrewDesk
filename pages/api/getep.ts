import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
interface Todo {
    id: number,
    name: string,
    difficulty: number,
    duration: number,
    type: number
};
export default function (req: NextApiRequest, res: NextApiResponse){
    const tmp_e = [10,10,-5,-3,5-3];
    const tmp_p = [-1,-5,10,10,-1,0]; // This would change to rest api
    res.status(200).json(tmp_p);
}