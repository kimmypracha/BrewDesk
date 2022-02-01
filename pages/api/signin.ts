import { NextApiRequest, NextApiResponse } from "next";
import useAuth from "../../src/hook/auth";

export default async (req: NextApiRequest,res: NextApiResponse) => {
    const {login} = useAuth();
    login(req.body.username,req.body.password);
}