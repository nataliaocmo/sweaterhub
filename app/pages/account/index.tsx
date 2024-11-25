import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Background from "@/components/background";
import Menu from "@/components/menu";
import Topbar from "@/components/topbar";
import { AuthContext } from "@/context/authContext/AuthContext";
import { router } from "expo-router";
import { dataContext } from "@/context/dataContext/dataContext";
import Edit from "@/components/edit";

export default function index() {
  const [isDrawer, setIsDrawer] = useState(false);
  const { state, logout } = useContext(AuthContext);
  const { dataState } = useContext(dataContext);
  const closeMenu = () => setIsDrawer(false);
  const [isSeen, setIsSeen] = useState(false);
  const closeEdit = () => setIsSeen(false);
  const [text, setText] = useState("");
  const [data, setData] = useState(1);

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

    const editHandler = (text: String, data: number) => {
        setIsSeen(true);
        setText(text.toString())
        setData(data)
      
    };

    return (
      <View style={{ padding: 20 }}>
        <Text style={[styles.textType, styles.title, { fontSize: 30 }]}>
          Hello, {dataState.name}
        </Text>
        <Text style={[styles.textType, styles.subtitle]}>Your orders</Text>
        <View style={styles.box}></View>
        <Text style={[styles.textType, styles.subtitle]}>Buy again</Text>
        <View style={styles.box}></View>
        <Text style={[styles.textType, styles.subtitle]}>Your acount</Text>
        <TouchableOpacity
          style={styles.editB}
          onPress={() => editHandler("Personal Information", 2)}
        >
          <Text style={[styles.textType, styles.accountB]}>
            Edit personal information
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editB}
          onPress={() => editHandler("Direction", 1)}
        >
          <Text style={[styles.textType, styles.accountB]}>Edit direction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editB}
          onPress={() => editHandler("Payment method", 3)}
        >
          <Text style={[styles.textType, styles.accountB]}>
            Edit payment method
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonhold}>
          <TouchableOpacity
            onPress={logout}
            style={[styles.button, styles.logbutton]}
          >
            <Text style={[styles.textType]}>Log out</Text>
          </TouchableOpacity>
        </View>
        <Edit isSeen={isSeen} onClose={closeEdit} text={text} data={data} />
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Background>
        <Topbar setIsDrawer={setIsDrawer} title="My Account" />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Logged />
        </ScrollView>
      </Background>
      <Menu isDrawer={isDrawer} onClose={closeMenu} fontFamily="Calistoga" />
    </View>
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
    marginBottom: 50,
  },
  buttonhold: {
    display: "flex",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
  },
  box: {
    backgroundColor: "rgba(255,255,255,0.6)",
    height: 120,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  editB: {
    borderTopColor: "white",
    borderTopWidth: 1,
    paddingVertical: 20,
    marginVertical: 10,
    paddingLeft: 10,
  },
  accountB: {
    fontSize: 20,
  },
});
