import { useContext, useState } from "react";
import { AuthService } from "../service/authService";
import { UserCredential } from "@firebase/auth";
import { async } from "@firebase/util";


const authContext = useContext();

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

    return <authContext.Provider value={value}/>
}
