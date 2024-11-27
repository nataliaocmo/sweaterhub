import { AuthProvider } from "@/context/authContext/AuthContext";
import { DataProvider } from "@/context/dataContext/dataContext";
import * as Notifications from "expo-notifications";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { useEffect } from "react";

function useNotificationObserver() {
  const router = useRouter();

  useEffect(() => {
    // Función que maneja la redirección
    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }

    // Verificar si hay una notificación previa cuando la app se inicia
    Notifications.getLastNotificationResponseAsync()
      .then((response) => {
        if (response?.notification) {
          redirect(response.notification);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la notificación anterior:", error);
      });

    // Suscripción al listener de notificaciones
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notificación recibida:", response.notification);
        redirect(response.notification);
      }
    );

    // Limpiar la suscripción cuando el componente se desmonte
    return () => {
      subscription.remove();
    };
  }, [router]);
}

export default function RootLayout() {
  useNotificationObserver();

  return (
    <AuthProvider>
      <DataProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="pages" />
        </Stack>
      </DataProvider>
    </AuthProvider>
  );
}
