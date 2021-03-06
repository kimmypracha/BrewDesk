import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import { useState, useContext, useEffect } from 'react'
import useAuth from '../src/hook/auth'
import { Router, useRouter } from 'next/router'
import {useFormik} from 'formik';
import {FC} from 'react';
const LoginComponent: FC = (props) => {
  const {login, userState, errorState} = useAuth();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      await login(values.email,values.password);
      if(errorState){
        alert("Invalid email or password!");
      }else{
        alert("Login is successful!");
        router.push('/dashboard')
      }
    }
  });

  return (
  <div className={styles.form}>
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.field}>
        <span> Email : </span>
        <input type="text" 
               name="email" 
               value={formik.values.email}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
        />
      </div>
      <div className={styles.field}>
        <span> Password : </span>
        <input type="password"
               name="password" 
               value={formik.values.password}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
        />
      </div>
      <div className={styles.field}>
        <button type="submit"
                className={styles.submitbtn}> Sign In</button>
      </div>
    </form>
  </div>);
}

const SignupComponent: FC = (props) => {
  const {signup, userState, errorState} = useAuth();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      cpassword: ''
    },
    onSubmit: async (values) => {
      await signup(values.email,values.password);
      if(errorState){ 
        console.log("Error : " + errorState);
        alert("Error : " + errorState );
      }
      else{
        alert("Sign up Successfully!");
        router.push('/');
      }
    }
  });

  return (
  <div className={styles.form}>
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.field}>
        <span> Email : </span>
        <input type="text" 
               name="email" 
               value={formik.values.email}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
        />
      </div>
      <div className={styles.field}>
        <span> Password : </span>
        <input type="password"
               name="password" 
               value={formik.values.password}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
        />
      </div>
      <div className={styles.field}>
        <span> Confirm Password : </span>
        <input type="password"
               name="cpassword" 
               value={formik.values.cpassword}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
        />
      </div>
      <div className={styles.field}>
        <button type="submit"
                className={styles.submitbtn}> Sign Up</button>
      </div>
    </form>
  </div>);
}
const Home: NextPage = () => {
  // we gonna use context here.
  const {userState} = useAuth();
  const [mode, setMode] = useState(0); // 0 : Sign In , 1 : Sign Up 
  const router = useRouter();
  console.log(userState);
  useEffect(()=>{
    if(window.localStorage.getItem('uid') !== null){
      router.push('/dashboard');
    }
  },[]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        BrewDesk | Login
      </div>
      <div className={styles.option}>
        <div onClick={()=>setMode(0)} 
             className={mode == 0? styles.active : styles.inactive}
             style={{
               borderTopLeftRadius: "10px",
               borderBottomLeftRadius: "10px"
               }}> Sign In</div>
        <div onClick={()=>setMode(1)}
             className={mode == 1? styles.active : styles.inactive}
             style={{
               borderTopRightRadius: "10px",
               borderBottomRightRadius: "10px"
             }}> Sign Up</div>
      </div>
      { (mode == 0)&&<LoginComponent/>}
      { (mode == 1)&&(<SignupComponent/>)}
    </div>
  )
}

export default Home
