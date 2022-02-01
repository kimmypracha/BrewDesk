import {NextPage} from 'next';
import useAuth from '../src/hook/auth';
import { useRouter } from 'next/router';
import styles from '../styles/Dashboard.module.css'
export default function Dashboard() {
    const {userState, logout} = useAuth();
    const router = useRouter();
    if(!userState){
        router.push('/');
    }
    console.log(userState);
    return (<div className={styles.page}>
        <div className={styles.header}>
            Name : {userState && userState.user.email}
            <button onClick={()=>{logout()}}> Log out </button>
        </div>
        <div className={styles.content}>
            <div className={styles.contcol}>
                <div className={styles.calendar}>
                    Calendar here
                </div> 
                <div className={styles.suggestion}>
                    suggestion here
                </div>
            </div>
            <div className={styles.contcol}>
                <div className={styles.todo}>
                    Todo
                </div>
            </div>
        </div> 
    </div>)
}