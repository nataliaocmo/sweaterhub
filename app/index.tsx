import Background from "@/components/background";
import Menu from "@/components/menu";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from '@expo/vector-icons/Feather';

export default function Index() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Calistoga: require("../assets/fonts/Calistoga-Regular.ttf"),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  const closeMenu = () => setIsDrawer(false);

  return (
    <>
      <Background>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsDrawer(true)}>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>SweaterHub</Text>
          <Ionicons name="cart-outline" size={30} color="white" />
        </View>
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
            <Entypo name="magnifying-glass" size={24} color="black" style={styles.searchIcon}/>
          </View>
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
    borderWidth: 1
  },
  search:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-evenly"
  }
});
