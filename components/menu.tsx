import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

interface MenuProps {
  isDrawer: boolean;
  onClose: () => void;
  fontFamily: string;
}

export default function Menu({ isDrawer, onClose, fontFamily }: MenuProps) {
  return (
    <Modal transparent={true} visible={isDrawer} animationType="slide">
      <BlurView intensity={50} style={styles.modalBlurView}>
        <View style={styles.spacing}>
          <TouchableOpacity onPress={onClose} style={{ marginBottom: 40 }}>
            <Ionicons name="menu" size={50} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{router.push('/');onClose();}} >
            <Text style={[styles.title, { fontFamily }]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{router.push('/pages/create');onClose();}}>
              <Text style={[styles.title, { fontFamily }]}>Create</Text>
            </TouchableOpacity>
          <TouchableOpacity onPress={()=>{router.push('/pages/account');onClose();}}>
            <Text style={[styles.title, { fontFamily }]}>My acount</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{router.push('/pages/designs');onClose();}}>
            <Text style={[styles.title, { fontFamily }]}>My designs</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.title, { fontFamily }]}>Explore</Text>
          </TouchableOpacity>
            <TouchableOpacity onPress={()=>{router.push('/pages/ia'); onClose()}}>
            <Text style={[styles.title, { fontFamily }]}>AI</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  spacing: {
    marginTop: 50,
    marginLeft: 30,
  },
  modalBlurView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Fondo oscuro y transparente
  },
  title: {
    fontSize: 34,
    marginBottom: 20,
    color: "white",
  },
});
