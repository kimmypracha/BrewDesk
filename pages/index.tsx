import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import { useState } from 'react'

const Home: NextPage = () => {
  // we gonna use context here.
  const [mode, setMode] = useState(0); // 0 : Sign In , 1 : Sign Up 
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        BrewDesk | Login
      </div>
      <div className={styles.option}>
        <div onClick={()=>setMode(0)} 
             className={mode == 0? styles.active : styles.inactive}> Sign In</div>
        <div onClick={()=>setMode(1)}
             className={mode == 1? styles.active : styles.inactive}> Sign Up</div>
      </div>
      {
      (mode == 0)&&(<div className={styles.form}>
        <form action="#" method="post">
          <div className={styles.field}>
            <span> Username : </span>
            <input type="text" id="username"/>
          </div>
          <div className={styles.field}>
            <span> Password : </span>
            <input type="password" id="password"/>
          </div>
          <div className={styles.field}>
            <input type="submit" id="login" value="Sign In"/>
          </div>
        </form>
      </div>)
      }
      {
      (mode == 1)&&(<div className={styles.form}>
        <form action="#" method="post">
          <div className={styles.field}>
            <span> Username : </span>
            <input type="text" id="username"/>
          </div>
          <div className={styles.field}>
            <span> Email : </span>
            <input type="text" id="email"/>
          </div>
          <div className={styles.field}>
            <span> Password : </span>
            <input type="password" id="password"/>
          </div>
          <div className={styles.field}>
            <span> Confirm Password : </span>
            <input type="password" id="conf_password"/>
          </div>
          <div className={styles.field}>
            <input type="submit" id="login" value="Sign Up"/>
          </div>
        </form>
      </div>)
      }
    </div>
  )
}

export default Home
