import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Background from '@/components/background';
import Topbar from '@/components/topbar';
import Menu from '@/components/menu';


export default function index() {
  const [isDrawer, setIsDrawer] = useState(false);
  const closeMenu = () => setIsDrawer(false);
  return (
    <>
      <Background>
        <Topbar setIsDrawer={setIsDrawer} title="Create" />
      </Background>
      <Menu isDrawer={isDrawer} onClose={closeMenu} fontFamily="Calistoga" />
    </>
  );
}