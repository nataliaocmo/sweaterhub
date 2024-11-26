import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Background from '@/components/background'
import Topbar from '@/components/topbar'
import Menu from '@/components/menu';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Canvas } from '@react-three/fiber/native';
import { OrbitControls } from '@react-three/drei';

export default function index() {
    const [isDrawer, setIsDrawer] = useState(false);
    const [selectedImage, setSelectedImage] = useState(require('@/assets/images/hoodie_front.png')); // Imagen inicial
    const [selectedColor, setSelectedColor] = useState('transparent'); // Color inicial transparente

    const chooseColor = (color: any) => {
      console.log("Color seleccionado:", color); // Para depuración
      setSelectedColor(color);
    };

  return (
    <>
    <Background>
    <Topbar setIsDrawer={setIsDrawer} title={"Create"}/>

    <View style={styles.container}>
      {/* Botón para foto */}
      <TouchableOpacity
        style={[styles.img]}
      >
        <FontAwesome name="photo" size={24} color="white" />
      </TouchableOpacity>

      {/* Contenedor principal del objeto */}
      <View style={styles.containerObject}>
        <Canvas style={{ width: '100%', height: 350 }} shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <mesh>
            <torusKnotGeometry args={[0.9, 0.5, 74, 10]} />
            <meshStandardMaterial color={selectedColor} />
          </mesh>
          {/* Orbit Controls */}
          <OrbitControls />
        </Canvas>
      </View>

      {/* Contenedor de los botones de colores */}
      <View style={styles.colorContainer}>
        <View style={styles.colors}>
          <TouchableOpacity onPress={() => chooseColor('#00f7ff')}>
            <Text style={[styles.colorCircle, { backgroundColor: '#00f7ff' }]}></Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => chooseColor('#cd00ff')}>
            <Text style={[styles.colorCircle, { backgroundColor: '#cd00ff' }]}></Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => chooseColor('#fbff00')}>
            <Text style={[styles.colorCircle, { backgroundColor: '#fbff00' }]}></Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => chooseColor('#ffffff')}>
            <Text style={[styles.colorCircle, { backgroundColor: '#ffffff' }]}></Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => chooseColor('#002eff')}>
            <Text style={[styles.colorCircle, { backgroundColor: '#002eff' }]}></Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => chooseColor('#00ff27')}>
            <Text style={[styles.colorCircle, { backgroundColor: '#00ff27' }]}></Text>
          </TouchableOpacity>
        </View>
      </View>

      

      {/* Contenedor de los botones "Save Draft" y "Add to Cart" */}
      <View style={styles.buttonView}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.logbutton]}
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

    <Menu isDrawer={isDrawer} onClose={() => setIsDrawer(false)} fontFamily="Calistoga"/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'space-between', // Distribuye el espacio entre los componentes
    paddingBottom: 50, // Añade espacio en la parte inferior para los botones
  },
  containerObject: {
    flex: 1, 
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    marginTop: 20, // Un poco de margen superior
  },
  colorContainer: {
    flex: 0.3, // Reduce el tamaño del contenedor de colores
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40, // Ajusta la distancia con el objeto 3D
  },
  colors: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
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
  img: {
    position: 'absolute', // Posiciona el botón de foto encima
    top: 20, // Colócalo un poco abajo desde la parte superior
    left: '50%', // Centra el botón horizontalmente
    transform: [{ translateX: -20 }], // Ajusta el botón para que esté perfectamente centrado
    zIndex: 10, // Asegura que esté encima de otros elementos
  },
});
