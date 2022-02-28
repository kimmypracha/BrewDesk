import {NextPage} from 'next';
import useAuth from '../src/hook/auth';
import { useRouter } from 'next/router';
import styles from '../styles/Dashboard.module.css'
import { ReactNode, useState, useEffect } from 'react';
import { array } from 'prop-types';
import { useFormik } from 'formik';
import {TaskService} from '../src/service/TaskService';
import { Task } from '.prisma/client';
import axios from 'axios';
interface Todo {
    id: number,
    name: string,
    difficulty: number,
    duration: number,
    type: number
};
function TodoComponent(props: ReactNode){
    // List ?? props.task_list
    // Form ? 
    const memoConstant = async () => {
        const memObj = await axios.post('/api/getep');
        return function(){
            return memObj.data;
        }
    }
    const [tdlist, settdlist] = useState<Todo[]>(props.tdlist);
    const addTD = (x: Todo) => settdlist([...tdlist, x]);
    const endTD = async (id: number) => {
        const tmp_obj = tdlist.find((value)=>value.id === id);
        axios.post('/api/rmtask',{id: id, completed:false});
        settdlist(tdlist.filter((td)=>td.id !== id));
        const tmp_c = await memoConstant();
        if(tmp_obj){
        const tmp_score = props.curScore 
                        + tmp_obj.difficulty
                        * tmp_obj.duration
                        * tmp_c()[tmp_obj.type];
        props.changeScore(tmp_score); 
        }
    };
    const rmTD = (id: number) => {
        axios.post('/api/rmtask',{id: id, completed:true});
        settdlist(tdlist.filter((td)=>td.id !== id));
    };
    const formik = useFormik({
        initialValues: {
            todotxt: '',
            diff: '1',
            time: '',
            type: ''
        },
        onSubmit: async (values) => {
            const todoItem = {
                id: 0,
                name: values.todotxt,
                difficulty: parseInt(values.diff,10),
                duration: parseInt(values.time,10),
                type: parseInt(values.type,10)};
            const newItem = await axios.post('/api/addtask',{
                uid: props.uid,
                todoItem: todoItem
            });
            const newTodo = {
                id: newItem.data.id,
                name: newItem.data.task,
                difficulty: newItem.data.difficulty,
                duration: newItem.data.duration,
                type: newItem.data.type
            }
            addTD(newTodo);
        }
    });
    useEffect(()=>{
        async function fetchData(){
            console.log("Before we sending here is props uid");
            console.log(props.uid);
            const info = await axios.post('/api/gettask',{uid:props.uid});
            console.log("Here is info");
            console.log(info);
            settdlist(info.data);
        }
        fetchData();
    },[props.uid]);
    useEffect(()=>{
        console.log("todo list: ");
        console.log(tdlist);
        console.log(props.uid);
    },[tdlist]);
    return (<div>
        <div className={styles.inputbar}>
            <form onSubmit={formik.handleSubmit} className={styles.inputForm}>
                <input type="text"
                       placeholder="what are you gonna do?"
                       name="todotxt"
                       value={formik.values.todotxt}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       className={styles.taskname}
                       />
                <select
                       name="diff"
                       value={formik.values.diff}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       >
                    <option value="" disabled selected> difficulty</option>
                    <option value="1"> 1 </option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                </select>
                <select
                      name="time"
                      value={formik.values.time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}>
                    <option value="" disabled selected> duration </option>
                    {Array(25).fill(0)
                               .map((_:number,idx:number)=>idx*15)
                               .map((num)=><option value={num}> {num} </option>)}
                </select>
                <select 
                      name="type"
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}>
                    <option value="" disabled selected> type </option>
                    {["Food","Sleep","Work","Todo","Relax","Other"]
                            .map((t,i)=>(
                                <option value={i}>{t}</option>
                            ))}
                </select>
                <button className={styles.addbtn} type="submit">+</button>
            </form>
        </div>
        <div className={styles.todolist}>
            <div className={styles.gridheader}>
                <div>Task</div>
                <div>Difficulty</div>
                <div> Duration </div>
                <div> Action </div>
            </div>
            {tdlist&&tdlist.map(({id, name,difficulty,duration})=>{
                return (<div className={styles.listbox}>
                    <div className={styles.nametodo}>
                        {name}
                    </div>
                    <div className={styles.difflist}>
                        {difficulty}
                    </div>
                    <div className={styles.timelist}>
                        {duration}
                    </div>
                    <button className={styles.endtd} onClick={()=>endTD(id)}> / </button>
                    <button className={styles.rmtd} onClick={()=>rmTD(id)}> x </button>
                </div>)
            })}
        </div>
    </div>)
}
export default function Dashboard() {
    const {userState, logout} = useAuth();
    const router = useRouter();
    const [username, setUser] = useState('');
    const [uid, setUid] = useState('');
    const [score, setScore] = useState(0);
    const [edited, setEdited] = useState(0);
    const formik = useFormik({
        initialValues: {
            usrname: ''
        },
        onSubmit: ({usrname}) => {
            setUser(usrname);
            setEdited(0);
        }
    })
    useEffect(()=>{
        console.log("Load Dashboard");
        const email = window.localStorage.getItem('user') || '';
        const tuid = window.localStorage.getItem('uid') || '';
        if(window.localStorage.getItem('uid') === null){
            router.push('/');
        }
        setUser(email);
        setUid(tuid);
    },[]);
    const handleLogout = async () => {
        await logout();
        router.push('/');
    }

    return (<div className={styles.page}>
        <div className={styles.header}>
            BrewDesk  {edited? (<form onSubmit={formik.handleSubmit}>
                <input type="text" 
                                   name="usrname"
                                   value={formik.values.usrname} 
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}/>
                <button type="submit">Change</button>
                </form>)
             :(<div>{username} <button onClick={()=>setEdited(1)}> Edit</button></div>)}
            <button className={styles.logoutbtn} onClick={handleLogout}> Log out </button>
        </div>
        <div className={styles.content}>
            <div className={styles.contcol}>
                <div className={styles.calendar}>
                    <div className={styles.topic}>
                        Highlight
                    </div>
                    <div className={styles.status}>
                        <div>
                        Today's Productivity Score : {score}
                        </div>
                        <div>
                        Highest Productivity Score : {score}
                        </div>
                    </div>
                </div> 
                <div className={styles.suggestion}>
                    <div className={styles.topic}>
                    suggestion
                    </div>
                </div>
            </div>
            <div className={styles.contcol}>
                <div className={styles.todo}>
                    <TodoComponent uid={uid} changeScore={setScore} curScore={score}/>
                </div>
            </div>
        </div> 
    </div>);
}

