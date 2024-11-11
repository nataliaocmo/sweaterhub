import React from 'react'
import { Stack } from 'expo-router';

export default function _layout() {
  return (
    <Stack
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="account/index" />
      <Stack.Screen name="cart/index" />
      <Stack.Screen name="create/index" />
      <Stack.Screen name="designs/index" />
    </Stack>
  );
}
