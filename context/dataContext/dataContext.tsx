import { createContext, useContext, useEffect, useReducer } from "react";
import { DataReducer, DataState } from "./dataReducer";
import { userProps } from "@/interfaces/authinterfaces";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { AuthContext } from "../authContext/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DataContextProps {
  dataState: userProps;
  getUserinfo: (uid: string) => Promise<void>;
  storeData: (key: any, value: any) => Promise<void>;
  removeData: (key: any) => Promise<void>;
  getData: (key: any) => Promise<void>;
}

const defaultValues: DataState = {
  name: undefined,
  lastname: undefined,
  email: undefined,
  orders: undefined,
  card: undefined 
};

export const dataContext = createContext({} as DataContextProps);

export const DataProvider = ({ children }: any) => {
  const [dataState, dispatch] = useReducer(DataReducer, defaultValues);
  const { state: authState } = useContext(AuthContext); // Accede al estado de AuthContext si está disponible

  // Función para cargar información del usuario desde Firestore
  const getUserinfo = async (uid: string) => {
    try {
      const ref = doc(db, "users", uid);
      const userDoc = await getDoc(ref);

      if (userDoc.exists()) {
        const userData = userDoc.data() as userProps;
        dispatch({ type: "GET", payload: userData });
      } else {
        console.log("No se encontraron datos para el usuario con UID:", uid);
      }
    } catch (error) {
      console.log("Error al obtener la información del usuario:", error);
    }
  };

  // Escucha cambios en el estado de autenticación
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Usuario autenticado:", user.uid);
        await getUserinfo(user.uid); // Carga los datos del usuario
      } else {
        console.log("No hay usuario autenticado.");
        dispatch({ type: "LOGOUT" }); // Limpia el estado si no hay usuario autenticado
      }
    });

    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, []);

  const storeData = async (key: any, value: any) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log("Data stored successfully");
    } catch (e) {
      console.error("Error storing data:", e);
    }
  };

  const getData = async (key: any) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log("Retrieved value:", value);
        dispatch({ type: "CARD", payload: value})
      }
    } catch (e) {
      console.error("Error retrieving data:", e);
    }
  };

  const removeData = async (key: any) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log("Data removed successfully");
    } catch (e) {
      console.error("Error removing data:", e);
    }
  };

  return (
    <dataContext.Provider
      value={{
        dataState,
        getUserinfo,
        storeData,
        removeData,
        getData
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
