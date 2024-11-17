import { createContext, useReducer } from "react";
import { authReducer, AuthState } from "./AuthReducer";
import { userProps } from "@/interfaces/authinterfaces";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";

interface AuthContextProps {
    state: AuthState;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, newData: userProps) => Promise<void>;
    logout: () => Promise<void>
}

const defaultValues: AuthState = {
    user: undefined,
    isLogged: false
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(authReducer, defaultValues);

    const auth = getAuth();

    const login = async (email: string, password: string) => {
        try {

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            dispatch({ type: "LOGIN", payload: user });
        } catch (error) {
            console.log("Error logging in:", error);
            throw error;
        }
    };
    

   
    const signUp = async (email: string, password: string, newData: userProps) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db,"users",user.uid),{...newData})
            dispatch({ type: "LOGIN", payload: user });


        } catch (error) {
            console.log(error)
            throw error;
        }
    };

    

    const logout = async()=>{
        dispatch({ type: "LOGOUT" });
        console.log(state.user)
    }

    return (
        <AuthContext.Provider
            value={{
                state,
                login,
                signUp,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}