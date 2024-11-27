import {View,StyleSheet,Text,TouchableOpacity, Image, Alert} from 'react-native';
import React, { useContext, useEffect, useState, } from 'react';
import Background from '@/components/background';
import Topbar from '@/components/topbar';
import Menu from '@/components/menu';
import { useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { dataContext } from '@/context/dataContext/dataContext';


export default function Index() {

  const { saveDraft } = useContext(dataContext);

  // Obtener la URL de la imagen pasada como parámetro
  const { imageUrl } = useLocalSearchParams<{ imageUrl: string }>();
  console.log("URL de la imagen recibida:", imageUrl);
 
  const [isDrawer, setIsDrawer] = useState(false);
  const closeMenu = () => setIsDrawer(false);
  const [currentPhoto, setCurrentPhoto] = useState(undefined as any);
  const [selectedColor, setSelectedColor] = useState('rgba(0, 0, 0, 0)'); // Color inicial transparente

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

  const handleSavePost = async () => {
    // const [isLoading, setIsLoading] = useState(false); // Estado para controlar el popup
    // setIsLoading(true); // Mostrar el popup cuando comience la petición
    const response = await saveDraft({
        img: imageUrl||currentPhoto.uri,
        color: selectedColor,
        part: "body"
    })
    console.log(response);
    if(response){
        Alert.alert("Love that creativity! Draft saved correctly")
    }
   
}
 
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

            {/* Contenedor de los botones "Save Draft" y "Add to Cart" */}
          <View style={styles.buttonView}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.logbutton]}
              onPress={handleSavePost}
            >
              <Text style={[styles.textType]}>Save Draft</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.logbutton]}
            >
              <Text style={[styles.textType]}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
          </View>
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
    width: 200, // Ancho de la imagen
    height: 200, // Altura de la imagen
  },
  img: {
    position: 'absolute', // Posiciona el botón de foto encima
    top: 20, // Colócalo un poco abajo desde la parte superior
    left: '50%', // Centra el botón horizontalmente
    transform: [{ translateX: -20 }], // Ajusta el botón para que esté perfectamente centrado
    zIndex: 10, // Asegura que esté encima de otros elementos
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.6)",
    marginBottom: 10,
    },
    logbutton: {
    backgroundColor: "#093450",
    alignItems: "center",
    width: "45%", // Botones más estrechos
    marginBottom: 20, // Separación entre botones
    },
    textType: {
    color: "white",
    fontFamily: "Calistoga",
    },
    buttonView: {
      flex: 0.2,
      justifyContent: 'flex-end', // Alinea los botones al final
      alignItems: 'center',
      },
      buttonContainer: {
      flexDirection: "row", // Alinea los botones en una fila
      justifyContent: 'center',
      width: '100%', // Asegura que los botones ocupen todo el ancho
      },
});



