import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Background from '@/components/background'
import Topbar from '@/components/topbar'
import Menu from '@/components/menu';

export default function index() {
    const [isDrawer, setIsDrawer] = useState(false);

  return (
    <>
    <Background>
        <Topbar setIsDrawer={setIsDrawer} title={"Create"}/>
      <Text>index</Text>

    </Background>
    <Menu isDrawer={isDrawer} onClose={() => setIsDrawer(false)} fontFamily="Calistoga"/>
    </>
  )
}