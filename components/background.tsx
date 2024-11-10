import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

export default function Background({children}:any) {
  return (
    <>
    <LinearGradient
        colors={['#5199E8', '#54E7E2']}
        style={styles.background}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(255,255,255,0.1)']}  
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.overlay}
      >
        <View>{children}</View>
      </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
  });