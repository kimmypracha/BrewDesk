import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        BrewDesk | Login
      </div>
      <hr/>
      <div className={styles.form}>
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
            <input type="submit" id="login" value="Log In"/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home
