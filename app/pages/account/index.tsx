import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Background from "@/components/background";
import Menu from "@/components/menu";
import Topbar from "@/components/topbar";
import { AuthContext } from "@/context/authContext/AuthContext";
import { router } from "expo-router";
import { dataContext } from "@/context/dataContext/dataContext";

export default function index() {
  const [isDrawer, setIsDrawer] = useState(false);
  const { state, logout } = useContext(AuthContext);
  const { dataState } = useContext(dataContext);
  const closeMenu = () => setIsDrawer(false);

  const Logged = () => {
    if (!state.isLogged) {
      return (
        <View style={styles.all}>
          <Text style={[styles.title, styles.textType]}>
            It seems that your not in
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/pages/account/signin")}
          >
            <Text style={styles.text}>Log In</Text>
          </TouchableOpacity>
          <Text style={[styles.signUp, styles.textType]}>-or-</Text>
          <TouchableOpacity
            onPress={() => router.push("/pages/account/signup")}
          >
            <Text style={styles.signUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{padding: 20}}>
        <Text style={[styles.textType, styles.title, {fontSize: 30}]}>Hello, {dataState.name}</Text>
        <Text style={[styles.textType, styles.subtitle]}>Your orders</Text>
        <View style={styles.box}>

        </View>
        <Text style={[styles.textType, styles.subtitle]}>Buy again</Text>
        <View style={styles.box}>
          
        </View>
        <Text style={[styles.textType, styles.subtitle]}>Your acount</Text>
        <View style={styles.buttonhold}>
          <TouchableOpacity
            onPress={logout}
            style={[styles.button, styles.logbutton]}
          >
            <Text style={[styles.textType]}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <>
      <Background>
        <Topbar setIsDrawer={setIsDrawer} title="My Account" />
        <Logged />
      </Background>
      <Menu isDrawer={isDrawer} onClose={closeMenu} fontFamily="Calistoga" />
    </>
  );
}

const styles = StyleSheet.create({
  all: {
    marginTop: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textType: {
    color: "white",
    fontFamily: "Calistoga",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    color: "black",
    fontSize: 20,
    fontFamily: "Calistoga",
  },
  signUp: {
    fontSize: 15,
    fontFamily: "Calistoga",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.6)",
    marginBottom: 10,
  },
  logbutton: {
    display: "flex",
    backgroundColor: "#093450",
    alignItems: "center",
    width: "50%",
  },
  buttonhold: {
    display: "flex",
    alignItems: "center",
  },
  subtitle:{
    fontSize: 20
  },
  box: {
    backgroundColor: "rgba(255,255,255,0.6)",
    height: 120,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 10
  }
});
