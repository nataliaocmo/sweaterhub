import { createContext, useContext, useEffect, useReducer } from "react";
import { DataReducer, DataState } from "./dataReducer";
import { userProps } from "@/interfaces/authinterfaces";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { AuthContext } from "../authContext/AuthContext";


interface DataContextProps {
    
}

const defaultValues: DataState = {
    name: undefined,
    lastname: undefined,
    email: undefined,
    orders: undefined
}

export const dataContext = createContext({} as DataContextProps);

export const DataProvider = ({ children }: any) => {
    
    
    return(
        <dataContext.Provider
            value={{
                
            }}
        >
            {children}
        </dataContext.Provider>
    );
}