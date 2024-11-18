import { createContext, useEffect, useReducer } from "react";
import { authReducer, AuthState } from "./AuthReducer";
import { userProps } from "@/interfaces/authinterfaces";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "@/utils/firebaseConfig";

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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: "LOGIN", payload: user });
            } else {
                dispatch({ type: "LOGOUT" });
            }
        });

        return () => unsubscribe();
    }, []);

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

            await setDoc(doc(db, "users", user.uid), { ...newData });
            dispatch({ type: "LOGIN", payload: user });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            dispatch({ type: "LOGOUT" });
        } catch (error) {
            console.log("Error al cerrar sesión:", error);
            throw error;
        }
    };

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
};
