import {getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { async } from '@firebase/util';
const auth = getAuth();
export const AuthService = {
    loginWithGoogle : async () => {
        const provider = new GoogleAuthProvider();
        try {
            const userCred = await signInWithPopup(auth, provider);
            return {user : userCred};
        } catch(e){
            return {
                error : e.message
            };
        }
    },
    signup: async (email:string, password:string) => {
        try{
            const userCred = await createUserWithEmailAndPassword(auth, email,password);
            return {user: userCred};
        } catch(e){
            return {
                error: e.message
            };
        }
    },
    login: async (email:string, password:string) => {
        try{
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            return {user: userCred};
        } catch(e){
            return {
                error : e.message
            };
        }
    },
    logout: async () => {
        await signOut(auth);
    }  
}