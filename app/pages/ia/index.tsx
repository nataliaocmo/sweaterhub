import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
  } from 'react-native';
  import React, { useState } from 'react';
  import Background from '@/components/background';
  import Topbar from '@/components/topbar';
  import Menu from '@/components/menu';
  
  export default function Index() {
    const [isDrawer, setIsDrawer] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
  
    const closeMenu = () => setIsDrawer(false);
  
    const sendMessage = async () => {
        if (!input.trim()) return; // Evitar enviar mensajes vacíos
        const newMessage = { text: input, sender: 'user' };
      
        // Añadir mensaje del usuario
        setMessages((prev) => [...prev, newMessage]);
      
        // Limpiar la entrada
        setInput('');
      
        try {
          // Crear el cuerpo del JSON en el formato esperado
          const requestBody = {
            contents: [
              {
                parts: [
                  {
                    text: input, // El texto del mensaje del usuario
                  },
                ],
              },
            ],
          };
      
          // Llamar a la API para obtener la respuesta
          const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAA-IVfk-R4cnaSZFZN8nGZ8UgvJLCxjmM', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody), // Enviar el JSON formateado
          });
      
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
      
          const data = await response.json();
      
          // Procesar la respuesta para obtener el texto del bot
          const botMessageText = data.candidates[0]?.content?.parts[0]?.text || 'Respuesta no disponible';
      
          // Añadir la respuesta del bot al chat
          const botMessage = { text: botMessageText, sender: 'bot' };
          setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
          console.error(error);
          const errorMessage = { text: 'Hubo un error al obtener la respuesta.', sender: 'bot' };
          setMessages((prev) => [...prev, errorMessage]);
        }
      };
      
  
    return (
      <>
        <Background>
          <Topbar setIsDrawer={setIsDrawer} title="IA" />
          <KeyboardAvoidingView
            style={styles.chatContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <FlatList
              data={messages}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.messageBubble,
                    item.sender === 'user' ? styles.userBubble : styles.botBubble,
                  ]}
                >
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              )}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Escribe tu mensaje..."
                placeholderTextColor="#CCC" // Placeholder gris claro para visibilidad
              />
              <Button title="Enviar" onPress={sendMessage} />
            </View>
          </KeyboardAvoidingView>
        </Background>
        <Menu isDrawer={isDrawer} onClose={closeMenu} fontFamily="Calistoga" />
      </>
    );
  }
  
  const styles = StyleSheet.create({
    chatContainer: {
      flex: 1,
      padding: 10,
    },
    messageBubble: {
      marginVertical: 5,
      padding: 10,
      borderRadius: 10,
    },
    userBubble: {
      alignSelf: 'flex-end',
      backgroundColor: '#D1E7DD',
    },
    botBubble: {
      alignSelf: 'flex-start',
      backgroundColor: '#F8D7DA',
    },
    messageText: {
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      padding: 5,
      marginBottom: 30,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#CCC',
      borderRadius: 5,
      padding: 10,
      color: '#FFF', // Texto blanco
      backgroundColor: 'transparent', // Fondo transparente
      marginRight: 10,
    },
  });
  