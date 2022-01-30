import { createContext, useState, useContext } from "react";
import { AuthService } from "../service/AuthService";
import { UserCredential } from "@firebase/auth";


interface IAuth {
    loginWithGoogle: (()=> Promise<void>) | null, 
    login: ((username:string, password:string) => Promise<void>) | null,
    signup: ((username:string, password:string) => Promise<void>) | null,
    logout: (() => Promise<void>) | null
}
const AuthContext = createContext<IAuth>({loginWithGoogle: null, login: null, signup: null, logout: null});
export default function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider() {
    
    const [userState, setUser] = useState<UserCredential | undefined | null>();
    const [errorState, setError] = useState(null);

    const loginWithGoogle = async () => {
        const {error, user} = await AuthService.loginWithGoogle();
        setUser(user);
        setError(error);
    }
    const login = async (username:string, password:string) => {
        const {error, user} = await AuthService.login(username, password);
        setUser(user);
        setError(error);
    }

    const signup = async (username:string, password:string) => {
        const {error, user} = await AuthService.signup(username, password);
        setUser(user);
        setError(error);
    }

    const logout = async () => {
        await AuthService.logout();
        setUser(null);
    }

    const value = {loginWithGoogle, login, signup, logout};

    return (<AuthContext.Provider value={value}/>);
}
