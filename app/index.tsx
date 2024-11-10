import Background from "@/components/background";
import Menu from "@/components/menu";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import * as Font from 'expo-font';
import { useEffect, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Index() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false)

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Calistoga': require('../assets/fonts/Calistoga-Regular.ttf'),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  const closeMenu = () => setIsDrawer(false);
  
  return (
    <>
      <Background>
        <View style={style.background}>
          <TouchableOpacity onPress={()=>setIsDrawer(true)}>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
          <Text style={style.title}>SweaterHub</Text>
          <Ionicons name="cart-outline" size={30} color="white" />
        </View>
      </Background>
      <Menu isDrawer={isDrawer} onClose={closeMenu} fontFamily="Calistoga" />
    </>
  );
}

const style =StyleSheet.create({
  background: {
    marginTop: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-evenly"
  },
  title: {
    fontFamily: 'Calistoga',
    color: "white",
    fontSize: 30,
    
  },
  modalBlurView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
