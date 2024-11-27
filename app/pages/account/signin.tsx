import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import Background from "@/components/background";
import { AuthContext } from "@/context/authContext/AuthContext";
import { router } from "expo-router";

export default function signin() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSignIn = async () => {
    if (!Email || !Password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try{
        
      await login(Email, Password);
      router.replace("/")
    }catch(error){
      Alert.alert("Login Error", "Unable to sign in. Please check your credentials.");
    }

  }
  return (
    <Background>
      <View style={styles.back}>
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
          <Text style={{ color: "white" }}>Dont have an acount? </Text>
          <TouchableOpacity onPress={()=>router.push("/pages/account/signup")}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
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
