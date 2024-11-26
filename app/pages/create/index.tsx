import {View,StyleSheet,Text,TouchableOpacity, Image} from 'react-native';
import React, { useEffect, useState, } from 'react';
import Background from '@/components/background';
import Topbar from '@/components/topbar';
import Menu from '@/components/menu';
import { useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';


export default function Index() {

  // Obtener la URL de la imagen pasada como parámetro
  const { imageUrl } = useLocalSearchParams<{ imageUrl: string }>();
  console.log("URL de la imagen recibida:", imageUrl);
 
  const [isDrawer, setIsDrawer] = useState(false);
  const closeMenu = () => setIsDrawer(false);
  const [currentPhoto, setCurrentPhoto] = useState(undefined as any);

   // Confirmar que el componente se monta
   useEffect(() => {
    console.log('El componente se ha montado');
  }, []);

  console.log('Parámetros recibidos:', useLocalSearchParams());
  console.log('URL de la imagen recibida:', imageUrl);

 
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setCurrentPhoto(result.assets[0].uri);
    }
  };
 
  return (
    <>
      <Background>
        <Topbar setIsDrawer={setIsDrawer} title="Create" />

        
        <View style={styles.container}>

        <TouchableOpacity
        style={[styles.img]}
        onPress={pickImage}
      >
        
      
        <FontAwesome name="photo" size={24} color="white" />
      </TouchableOpacity>
            <Image
              source={{ uri: imageUrl || currentPhoto }} // Utiliza la URL para cargar la imagen
              style={styles.image} // Estilo de la imagen
              resizeMode="contain" // Ajuste del tamaño de la imagen
            />
        </View>
      </Background>
      <Menu isDrawer={isDrawer} onClose={closeMenu} fontFamily="Calistoga" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300, // Ancho de la imagen
    height: 300, // Altura de la imagen
  },
  img: {
    position: 'absolute', // Posiciona el botón de foto encima
    top: 20, // Colócalo un poco abajo desde la parte superior
    left: '50%', // Centra el botón horizontalmente
    transform: [{ translateX: -20 }], // Ajusta el botón para que esté perfectamente centrado
    zIndex: 10, // Asegura que esté encima de otros elementos
  },
});
