import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  Platform,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Background from "@/components/background";
import { AuthContext } from "@/context/authContext/AuthContext";
import { router } from "expo-router";

export default function SignIn() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  // Crear un Animated.Value para el margen inferior
  const [bottomMargin] = useState(new Animated.Value(0));

  const handleSignIn = async () => {
    if (!Email || !Password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      await login(Email, Password);
      router.replace("/");
    } catch (error) {
      Alert.alert(
        "Login Error",
        "Unable to sign in. Please check your credentials."
      );
    }
  };

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        animateMarginBottom(150); // Animar el margen cuando el teclado se muestra
      }
    );
    const keyboardHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        animateMarginBottom(0); // Volver al margen original cuando el teclado se oculta
      }
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  // Función para animar el margen inferior
  const animateMarginBottom = (toValue: number) => {
    Animated.timing(bottomMargin, {
      toValue,
      duration: 300,
      useNativeDriver: false, // Para animar propiedades de layout como marginBottom
    }).start();
  };

  return (
    <Background>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View style={[styles.back, { marginBottom: bottomMargin }]}>
          <Text style={styles.title}>Welcome back to SweaterHub</Text>
          <View style={styles.box}>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Value"
              onChangeText={setEmail}
              value={Email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Value"
              onChangeText={setPassword}
              value={Password}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={{ color: "white" }}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupt}>
            <Text style={{ color: "white" }}>Dont have an account? </Text>
            <TouchableOpacity
              onPress={() => router.push("/pages/account/signup")}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Background>
  );
}

const styles = StyleSheet.create({
  back: {
    marginTop: 45,
    padding: 40,
  },
  title: {
    color: "white",
    fontFamily: "Calistoga",
    fontSize: 50,
  },
  box: {
    marginTop: 20,
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 20,
    borderRadius: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#093450",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  signupt: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
