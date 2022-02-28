import {NextApiRequest,NextApiResponse} from 'next';
interface Todo {
    id: number,
    name: string,
    difficulty: number,
    duration: number,
    type: number
};
function Knapsack(task_arr: {name: string, energy: number, score: number }[]){
    const dpmap = new Map<number,number>();
    const par = new Map<number,number>();
    dpmap.set(0,0); // initialize
    task_arr.forEach(({name,energy,score})=>{
        const tmp_arr: number[][] = [];
        dpmap.forEach((key,value) => {
            const cur_en = key+energy;
            const cur_sc = dpmap.get(cur_en);
            if(typeof cur_sc != "undefined"){
                tmp_arr.push([cur_en,value+score]);
            }else if(!dpmap.has(cur_en)){
                tmp_arr.push([cur_en,value+score]);
            }
        });
        tmp_arr.forEach(([key,value])=>{
            dpmap.set(key,value);
        })
    })
    
}
export default function(req: NextApiRequest,res: NextApiResponse){
    // we have a list of task array  (we can convert with the table of energy and productivity table here)
    // (name, estimated_energy, estimated_score)
    // what we could implement first, Knapsack DP 
    const tmp_e = [10,10,-5,-3,5-3];
    const tmp_p = [-1,-5,10,10,-1,0];
    const task_arr = req.body.tasks.map((e:Todo)=>({
        id: e.id,
        energy: tmp_e[e.type]*e.difficulty*e.duration,
        score: tmp_p[e.type]*e.difficulty*e.duration
    }));
    const suggested_list = Knapsack(task_arr);
    res.status(200).json({
        recommendation: suggested_list
    });
}