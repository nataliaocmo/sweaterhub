import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import Background from '@/components/background'
import Menu from '@/components/menu'
import Topbar from '@/components/topbar';
import { AuthContext } from '@/context/authContext/AuthContext';
import { router } from 'expo-router';

export default function index() {
    const [isDrawer, setIsDrawer] = useState(false);
    const {state} = useContext(AuthContext)
    const closeMenu = () => setIsDrawer(false);

    const Logged = () =>{
      if (state.isLogged == false){
        return(
          <View style={styles.all}>
            <Text style={styles.title}>It seems that your not in</Text>
            <TouchableOpacity style={styles.button} onPress={()=>router.push('/pages/account/signin')}>
              <Text style={styles.text}>Log In</Text>
            </TouchableOpacity>
            <Text style={styles.signUp}>-or-</Text>
            <TouchableOpacity onPress={()=>router.push('/pages/account/signup')}>
              <Text style={styles.signUp}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )
      }
      return(
        <>
          <TouchableOpacity onPress={()=>console.log(state.user.uid)}>
            <Text>ehm</Text>
          </TouchableOpacity>
        </>
      )
    }
  return (
    <>
        <Background>
            <Topbar setIsDrawer={setIsDrawer} title="My Account"/>
            <Logged/>
        </Background>
        <Menu isDrawer={isDrawer} onClose={closeMenu} fontFamily='Calistoga'/>
    </>
  )
}

const styles = StyleSheet.create({
  all: {
    marginTop: 200,
    display: 'flex',                  
    justifyContent: 'center', 
    alignItems: 'center',     
  },
  title:{
    fontFamily: 'Calistoga',
    fontSize: 40,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    color: "black",
    fontSize: 20,
    fontFamily: 'Calistoga'
  },
  signUp: {
    color: "white",
    fontSize: 15,
    fontFamily: 'Calistoga'
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.6)",
    marginBottom: 10
  }
})