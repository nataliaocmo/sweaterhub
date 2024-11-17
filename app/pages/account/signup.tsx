import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Background from "@/components/background";
import { AuthContext } from "@/context/authContext/AuthContext";
import { router } from "expo-router";
import { dataContext } from "@/context/dataContext/dataContext";

export default function signup() {
  const [email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const { signUp, state } = useContext(AuthContext);

  useEffect(() => {
    
  }, [state.user]);

  const handleSignUp = async () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValido = regexEmail.test(email);
    
    const regexContrasenaSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const contrasenaSegura = regexContrasenaSegura.test(password);

    if (Name === '' || Lastname === '' || email === '' || password === '' || ConfirmPassword === '') {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    if (password !== ConfirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    
    if (!contrasenaSegura || !emailValido) {
      Alert.alert("Error", "Email or password are not valid, paswords must have 8 characters, Caps and a special character");
      return;
    }

    try {
      await signUp(email, password, {name: Name, lastname: Lastname, email: email});
      router.push("/");
    } catch (error) {
      Alert.alert("Error", "Something went wrong signing up");
    }
  };

  return (
    <Background>
      <View style={styles.back}>
        <Text style={styles.title}>Welcome to SweaterHub</Text>
        <View style={styles.box}>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Value"
            onChangeText={setName}
            value={Name}
          />
          <Text>Lastname</Text>
          <TextInput
            style={styles.input}
            placeholder="Value"
            onChangeText={setLastname}
            value={Lastname}
          />
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Value"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Value"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
          <Text>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Value"
            onChangeText={setConfirmPassword}
            value={ConfirmPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={{ color: "white" }}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupt}>
          <Text style={{ color: "white" }}>Already have an account </Text>
          <TouchableOpacity
            onPress={() => router.push("/pages/account/signin")}
          >
            <Text>Sign In</Text>
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
    marginBottom: 10,
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
