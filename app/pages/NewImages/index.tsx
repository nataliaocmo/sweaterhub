import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Background from '@/components/background';
import Topbar from '@/components/topbar';
import Menu from '@/components/menu';
import { router } from 'expo-router';

const UNSPLASH_ACCESS_KEY = 'jzNW3DuOCjBf5r5ay1icTBVws14TMysBqOudp2X5K78';

interface ImageData {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
}

const fetchImages = async (query: string): Promise<ImageData[]> => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        client_id: UNSPLASH_ACCESS_KEY,
        query,
        per_page: 10,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    return [];
  }
};

export default function Index() {
  const [isDrawer, setIsDrawer] = useState(false);
  const [images, setImages] = useState<ImageData[]>([]);
  const [query, setQuery] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null); // Imagen seleccionada
  const [isModalVisible, setIsModalVisible] = useState(false); // Controla el modal

  const closeMenu = () => setIsDrawer(false);

  const searchImages = async () => {
    const result = await fetchImages(query);
    setImages(result);
  };

  const handleImagePress = (image: ImageData) => {
    setSelectedImage(image);
    setIsModalVisible(true); // Abre el modal
  };

  const confirmImageSelection = () => {
    if (selectedImage) {
      setIsModalVisible(false); // Cierra el modal
      router.push({
        pathname: '/pages/create',
        params: { imageUrl: selectedImage.urls.full }, // Pasa la URL de la imagen a la página de creación
      });
    }
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
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={searchImages} style={styles.button}>
          <Text style={{ color: 'white' }}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Contenedor de imágenes */}
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((image) => (
          <TouchableOpacity key={image.id} onPress={() => handleImagePress(image)}>
            <Image source={{ uri: image.urls.small }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal de confirmación */}
      {selectedImage && (
        <Modal
          visible={isModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>¿Quieres usar esta imagen?</Text>
              <Image source={{ uri: selectedImage.urls.small }} style={styles.modalImage} />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={confirmImageSelection}
                >
                  <Text style={styles.modalButtonText}>Usar imagen</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '70%',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#093450',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: '#093450',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
