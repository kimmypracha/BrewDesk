import { createContext, useState, useContext, ReactNode } from "react";
import { AuthService } from "../service/AuthService";
import { UserCredential } from "@firebase/auth";


interface IAuth {
    userState : UserCredential | undefined | null, 
    errorState : string | null,
    loginWithGoogle: (()=> Promise<void>), 
    login: ((username:string, password:string) => Promise<void>),
    signup: ((username:string, password:string) => Promise<void>),
    logout: (() => Promise<void>)
}
interface AuthProp {
    children : ReactNode
}
const AuthContext = createContext<IAuth>({
    userState: null,
    errorState: null, 
    loginWithGoogle: async () => {},
    login: async () => {}, 
    signup: async () => {}, 
    logout: async () => {}
});
export default function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props: AuthProp) {
    
    const [userState, setUser] = useState<UserCredential | undefined | null>();
    const [errorState, setError] = useState(null);

    const loginWithGoogle = async () => {
        const {error, user} = await AuthService.loginWithGoogle();
        setUser(user);
        window.localStorage.setItem('user', user? user.user.email || '' : '');
        window.localStorage.setItem('uid', user? user.user.uid : '');
        setError(error);
    }
    const login = async (username:string, password:string) => {
        const {error, user} = await AuthService.login(username, password);
        window.localStorage.setItem('user', user? user.user.email || '' : '');
        window.localStorage.setItem('uid', user? user.user.uid : '');
        setUser(user);
        setError(error);
    }

    const signup = async (username:string, password:string) => {
        const {error, user} = await AuthService.signup(username, password);
        window.localStorage.setItem('user', user? user.user.email || '' : '');
        window.localStorage.setItem('uid', user? user.user.uid : '');
        setUser(user);
        setError(error);
    }

    const logout = async () => {
        await AuthService.logout();
        setUser(null);
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('uid');
    }

    const value = {userState, errorState, loginWithGoogle, login, signup, logout};

    return (<AuthContext.Provider value={value} {...props}/>);
}
