import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface TopbarProps {
    setIsDrawer: React.Dispatch<React.SetStateAction<boolean>>
    title: String;
  }

export default function Topbar({ setIsDrawer, title }: TopbarProps ) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setIsDrawer(true)}>
        <Ionicons name="menu" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Ionicons name="cart-outline" size={30} color="white" />
    </View>
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
});
