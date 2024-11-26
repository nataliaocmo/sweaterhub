import Background from "@/components/background";
import Menu from "@/components/menu";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
} from "react-native";
import * as Font from "expo-font";
import { useContext, useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Topbar from "@/components/topbar";
import { AuthContext } from "@/context/authContext/AuthContext";
import { dataContext } from "@/context/dataContext/dataContext";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Linking } from "react-native";
import React from "react";

export default function Index() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const { state } = useContext(AuthContext);
  const { dataState, getUserinfo, getData } = useContext(dataContext);

  // Función para registrar permisos y obtener el token de notificación
  const registerForPushNotificationsAsync = async () => {
    try {
      if (Device.isDevice) {
        // Verifica el estado de los permisos
        const { status } = await Notifications.getPermissionsAsync();
        console.log("Estado de los permisos de notificación:", status);

        if (status === "granted") {
          // Si ya están permitidas, obtén directamente el token
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log("Token de notificación:", token);
          return token;
        } else if (status !== "granted") {
          // Si no están permitidas, solicita permisos
          const { status: newStatus } = await Notifications.requestPermissionsAsync();

          if (newStatus === "granted") {
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log("Token de notificación:", token);
            return token;
          } else {
            // Si el usuario sigue negando los permisos
            Alert.alert(
              "Permisos necesarios",
              "Por favor, habilita los permisos de notificaciones desde la configuración del dispositivo.",
              [
                { text: "Cancelar", style: "cancel" },
                { text: "Abrir configuración", onPress: openAppSettings },
              ]
            );
            return null;
          }
        }
      } else {
        alert("Las notificaciones push no son compatibles en un emulador.");
        return null;
      }
    } catch (error) {
      console.error("Error al registrar notificaciones:", error);
      return null;
    }
  };

  // Función para abrir la configuración del sistema
  const openAppSettings = async () => {
    const canOpen = await Linking.canOpenURL("app-settings:");
    if (canOpen) {
      await Linking.openURL("app-settings:");
    } else {
      alert("No se puede abrir la configuración del dispositivo.");
    }
  };

  // Efecto para cargar las fuentes
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Calistoga: require("../assets/fonts/Calistoga-Regular.ttf"),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  // Efecto para manejar información del usuario y registrar notificaciones
  useEffect(() => {
    if (state.isLogged) {
      getUserinfo(state.user.uid);
    }

    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        // Aquí puedes guardar el token en tu backend o contexto global
        console.log("Token registrado:", token);
      }
    });
  }, [state.isLogged]);

  const closeMenu = () => setIsDrawer(false);

  if (!fontLoaded) {
    return null;
  }

  return (
    <>
      <Background>
        <Topbar setIsDrawer={setIsDrawer} title={"SweaterHub"} />
        <View style={styles.search}>
          <TouchableOpacity style={styles.filter}>
            <Feather name="filter" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="Find your style"
              placeholderTextColor="#aaa"
            />
            <Entypo
              name="magnifying-glass"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
          </View>
        </View>
        <View style={styles.notificationButton}>
          <Button
            title="Reintentar permisos de notificación"
            onPress={registerForPushNotificationsAsync}
            color="#093450"
          />
        </View>
      </Background>
      <Menu isDrawer={isDrawer} onClose={closeMenu} fontFamily="Calistoga" />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontFamily: "Calistoga",
    color: "white",
    fontSize: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    width: "70%",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputText: {
    flex: 1,
    color: "black",
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 5,
  },
  filter: {
    backgroundColor: "#093450",
    padding: 10,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 1,
  },
  search: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-evenly",
  },
  notificationButton: {
    marginTop: 20,
    alignItems: "center",
  },
});
