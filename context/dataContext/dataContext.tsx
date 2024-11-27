import React from 'react';
import { createContext, useContext, useEffect, useReducer } from "react";
import { DataReducer } from "./dataReducer";
import { userProps } from "@/interfaces/authinterfaces";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import { AuthContext } from "../authContext/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from 'react-native';
import { DataState } from '@/interfaces/dataInterfaces';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { DefaultResponse, DraftProps } from '@/interfaces/draftInterfaces';

interface DataContextProps {
  dataState: userProps;
  getUserinfo: (uid: string) => Promise<void>;
  storeData: (uid: any,value: any) => Promise<void>;
  removeData: (key: any) => Promise<void>;
  getData: (uid: any) => Promise<void>;
  update: (uid: any, data: any, type: String) => Promise<void>
  saveDraft: ( draft: any)  => Promise<DefaultResponse>;
}

const defaultValues: DataState = {
  name: "",
  lastname: "",
  email: "",
  orders: undefined,
  card: undefined ,
  location: ""
};

export const dataContext = createContext({} as DataContextProps);

export const DataProvider = ({ children }: any) => {
  const [dataState, dispatch] = useReducer(DataReducer, defaultValues);

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

  const storeData = async (uid: any,value: any) => {
    try {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem(uid, stringValue);
      console.log("Data stored successfully");
    } catch (e) {
      console.error("Error storing data:", e);
    }
  };
  

  const getData = async (uid: any) => {
    try {
      const value = await AsyncStorage.getItem(uid);
      if (value !== null) {
        console.log("Retrieved value:", value);
        dispatch({ type: "CARD", payload: value})
      }
    } catch (e) {
      console.error("Error retrieving data:", e);
      Alert.alert("no card avilable, add a payment methon on profile")
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

  const update = async (uid: any, data: any, type:String) =>{
    const docRef = doc(db, "users", uid);
    try{
      await updateDoc(docRef, {[type.toString()]: data.toString()});
    }catch (error) {
      console.log(error);
    }
    getUserinfo(uid);
  }


  const uploadImage = async (uri: string) => {
    const storage = getStorage();
    const storageRef = ref(storage, 'drafts/'+ Date.now());
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const snapshot =await uploadBytes(storageRef,blob);
        const url = await getDownloadURL(storageRef);
        console.log('Uploaded a raw string!');
        console.log({
            snapshot
        })
        return url?? "";
    } catch (error) {
        console.log(error)
    }
}

const saveDraft = async (newDraft: DraftProps): Promise<DefaultResponse> =>  {
  try {
      const urlImage = await uploadImage(newDraft.img);

      const docRef = await addDoc(collection(db, "drafts"), {
          ...newDraft,
          image: urlImage
      });
      console.log("Document written with ID: ", docRef.id);
      return {
          isSuccess: true,
          message: "Creado con exito"
      }
      
  } catch (error) {
      console.log(error);
      return {
          isSuccess: false,
          message: "Hubo un error: " + error
      }
  }
}

  return (
    <dataContext.Provider
      value={{
        dataState,
        getUserinfo,
        storeData,
        removeData,
        getData,
        update,
        saveDraft
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
