import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Background from '@/components/background'
import Menu from '@/components/menu'
import Topbar from '@/components/topbar';

export default function index() {
    const [isDrawer, setIsDrawer] = useState(false);
    const closeMenu = () => setIsDrawer(false);
  return (
    <>
        <Background>
            <Topbar setIsDrawer={setIsDrawer} title="My Account"/>
        </Background>
        <Menu isDrawer={isDrawer} onClose={closeMenu} fontFamily='Calistoga'/>
    </>
  )
}