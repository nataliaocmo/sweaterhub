import { View, Image, ScrollView, StyleSheet, TextInput, Button, Touchable, TouchableOpacity, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Background from '@/components/background';
import Topbar from '@/components/topbar';
import Menu from '@/components/menu';

// Reemplaza con tus claves de API
const UNSPLASH_ACCESS_KEY = 'jzNW3DuOCjBf5r5ay1icTBVws14TMysBqOudp2X5K78';

// Tipo para las imágenes de Unsplash
interface ImageData {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
}

// Función para obtener imágenes desde Unsplash
const fetchImages = async (query: string): Promise<ImageData[]> => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        client_id: UNSPLASH_ACCESS_KEY,
        query,
        per_page: 10,
      },
    });
    return response.data.results; // Unsplash devuelve imágenes en `results`
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    return [];
  }
};

export default function Index() {
  const [isDrawer, setIsDrawer] = useState(false);
  const [images, setImages] = useState<ImageData[]>([]);
  const [query, setQuery] = useState<string>(''); // Estado para la palabra clave

  const closeMenu = () => setIsDrawer(false);

  const searchImages = async () => {
    const result = await fetchImages(query); // Llamar al fetchImages con la palabra clave
    setImages(result); // Actualizar el estado con las nuevas imágenes
  };

  return (
    <Background>
      <Topbar setIsDrawer={setIsDrawer} title="Explore" />
      <Menu isDrawer={isDrawer} onClose={closeMenu} fontFamily="Calistoga" />

      {/* Contenedor del buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe una palabra clave"
          value={query}
          onChangeText={setQuery} // Actualizar el estado query
        />
        <TouchableOpacity onPress={searchImages} style={styles.button}>
          <Text style={{ color: "white" }}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Contenedor de imágenes */}
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((image) => (
          <Image
            key={image.id}
            source={{ uri: image.urls.small }}
            style={styles.image}
          />
        ))}
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centra horizontalmente el contenedor
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 8, // Reduce el padding vertical para un diseño más compacto
    paddingHorizontal: 15, // Suficiente espacio para el texto
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '70%', // Se adapta dinámicamente al ancho
    fontSize: 16, // Tamaño de fuente legible
  },
  button: {
    backgroundColor: '#093450',
    paddingVertical: 10,
    paddingHorizontal: 15, // Ajusta para un botón más proporcional
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 8,
  },
});
