import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

interface TopbarProps {
  setIsDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  route?: "/pages/cart" | "/" ; 
}

export default function Topbar({ setIsDrawer, title, icon = "cart-outline", route = "/pages/cart", }: TopbarProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setIsDrawer(true)}>
        <Ionicons name="menu" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => router.replace(`${route}` as const)}>
        <Ionicons name={icon} size={30} color="white" />
      </TouchableOpacity>
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
