import {
  View,
  Image,
  StyleSheet,Text
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Background from '@/components/background';
import Topbar from '@/components/topbar';
import Menu from '@/components/menu';
import { useLocalSearchParams } from 'expo-router';

export default function Index() {

  // Obtener la URL de la imagen pasada como parámetro
  const { imageUrl } = useLocalSearchParams<{ imageUrl: string }>();
  console.log("URL de la imagen recibida:", imageUrl);
 
  const [isDrawer, setIsDrawer] = useState(false);
  const closeMenu = () => setIsDrawer(false);

   // Confirmar que el componente se monta
   useEffect(() => {
    console.log('El componente se ha montado');
  }, []);

  console.log('Parámetros recibidos:', useLocalSearchParams());
  console.log('URL de la imagen recibida:', imageUrl);

 
  return (
    <>
      <Background>
        <Topbar setIsDrawer={setIsDrawer} title="Create" />
        <View style={styles.container}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }} // Utiliza la URL para cargar la imagen
              style={styles.image} // Estilo de la imagen
              resizeMode="contain" // Ajuste del tamaño de la imagen
            />
          ) : (
            <Text>No se proporcionó una imagen</Text> // Muestra un mensaje si no hay imagen
          )}
        </View>
      </Background>
      <Menu isDrawer={isDrawer} onClose={closeMenu} fontFamily="Calistoga" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300, // Ancho de la imagen
    height: 300, // Altura de la imagen
  },
});
