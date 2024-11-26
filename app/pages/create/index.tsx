import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Background from '@/components/background'
import Topbar from '@/components/topbar'
import Menu from '@/components/menu';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function index() {
    const [isDrawer, setIsDrawer] = useState(false);
    const [selectedImage, setSelectedImage] = useState(require('@/assets/images/hoodie_front.png')); // Imagen inicial
    const [selectedColor, setSelectedColor] = useState('transparent'); // Color inicial transparente

    const chooseColor = (color: any) => {
      console.log("Color seleccionado:", color); // Para depuración
      setSelectedColor(color);
    };

    const chooseWhere = () =>{

    }

    

  return (
    <>
    <Background>
    <Topbar setIsDrawer={setIsDrawer} title={"Create"}/>

      <View style={styles.container}>
        <Image 
        source= {selectedImage}
        style={{width: 300, height: 300}}
       
        >
        </Image>
      </View>

      <View style={styles.optionContainer}>
        <View style={styles.options} >
          <TouchableOpacity
          onPress={() => setSelectedImage(require('@/assets/images/hoodie_front.png'))}>

          <Image 
          source= {require('@/assets/images/hoodie_front.png')}
          style={{width: 150, height: 150}}
          >
          </Image>

          </TouchableOpacity>
          

          <TouchableOpacity
            onPress={() => setSelectedImage(require('@/assets/images/hoodie_back.png'))}
          >
          <Image 
          
          source= {require('@/assets/images/hoodie_back.png')}
          style={{width: 150, height: 150}}
          >
          </Image>

          </TouchableOpacity>

    
          <TouchableOpacity
          onPress={() => setSelectedImage(require('@/assets/images/hoodie_sleeve.png'))}
          >
          <Image 
          source= {require('@/assets/images/hoodie_sleeve.png')}
          style={{width: 115, height: 115 }}
          >
          </Image>

          </TouchableOpacity>

          
        </View>
      </View>

      <View style={styles.colorContainer}>
        <View style={styles.colors}>
          
          <TouchableOpacity><Text style={[styles.colorCircle, { backgroundColor: 'white' }]}></Text></TouchableOpacity>

          <TouchableOpacity><Text style={[styles.colorCircle, { backgroundColor: '#f3e1ff' }]}></Text></TouchableOpacity>

          <TouchableOpacity><Text style={[styles.colorCircle, { backgroundColor: '#999999' }]}></Text></TouchableOpacity>
          
          <TouchableOpacity><Text style={[styles.colorCircle, { backgroundColor: '#000000' }]}></Text></TouchableOpacity>
          
          <TouchableOpacity><Text style={[styles.colorCircle, { backgroundColor: '#00013F' }]}></Text></TouchableOpacity>
          
          <TouchableOpacity><Text style={[styles.colorCircle, { backgroundColor: '#004805' }]}></Text></TouchableOpacity>
          
        </View>
      </View>

      <View style={styles.container}>
      <TouchableOpacity
            // onPress={save}
            style={[styles.button, styles.logbutton]}
          >
          <FontAwesome name="photo" size={24} color="white" />
        </TouchableOpacity>

      </View>

        

      <View style={styles.buttonView}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
              // onPress={save}
              style={[styles.button, styles.logbutton]}
            >
            <Text style={[styles.textType]}>Save Draft</Text>
          </TouchableOpacity>

          <TouchableOpacity
              // onPress={save}
              style={[styles.button, styles.logbutton]}
            >
            <Text style={[styles.textType]}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      
    </Background>

    
    
    <Menu isDrawer={isDrawer} onClose={() => setIsDrawer(false)} fontFamily="Calistoga"/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    justifyContent: 'flex-start', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
  },

  options: {
    flexDirection: 'row', // Organiza los elementos en una fila
    justifyContent: 'center', // Alinea los elementos horizontalmente
    alignItems: 'center', // Alinea los elementos verticalmente
  },

  optionContainer: {
    flex: 1, // Hace que este contenedor use todo el espacio disponible
    justifyContent: 'flex-start', // Alinea hacia arriba
    alignItems: 'center', // Centra horizontalmente
    marginTop: 230, // Sube las imágenes más cerca de la principal
  },

  colorContainer: {
    flex: 1, // Hace que este contenedor use todo el espacio disponible
    
    marginTop: 30, // Sube las imágenes más cerca de la principal
  },

   colors: {
    flexDirection: 'row', // Organiza los círculos horizontalmente
    justifyContent: 'center', // Centra los círculos
    alignItems: 'center', // Alinea los círculos en el centro
    marginTop: 20, // Un poco de espacio sobre los círculos
  },


  colorCircle: {
    width: 40, // Tamaño del círculo
    height: 40, // Tamaño del círculo
    borderRadius: 20, // Hace que sea redondo
    backgroundColor: 'red', // Color del círculo
    marginHorizontal: 10, // Espacio entre los círculos
    textAlign: 'center', // Centra el texto (aunque no hay texto visible)
    lineHeight: 40, // Asegura que cualquier texto visible esté centrado verticalmente
  },

  circle: {
    width: 150, // Tamaño del círculo
    height: 150, // Tamaño del círculo
    borderRadius: 75, // Hace que sea un círculo
    justifyContent: 'center', // Centra el contenido (si lo hubiera)
    alignItems: 'center', // Centra el contenido (si lo hubiera)
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.6)",
    marginBottom: 10,
  },
  logbutton: {
    display: "flex",
    backgroundColor: "#093450",
    alignItems: "center",
    width: "50%",
    marginBottom: 50,
  },
  textType: {
    color: "white",
    fontFamily: "Calistoga",
  },

  buttonContainer: {
    flexDirection: "row",
  },
  buttonView:{
    flex: 1, // Hace que este contenedor use todo el espacio disponible
    justifyContent: 'flex-end', // Alinea hacia arriba
  }
});