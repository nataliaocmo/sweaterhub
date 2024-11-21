import {
    View,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
  } from "react-native";
  import React, { useContext, useState } from "react";
  import { dataContext } from "@/context/dataContext/dataContext";
  
  interface editProps {
    isSeen: boolean;
    onClose: () => void;
    text: String;
    data: number;
  }
  
  export default function Edit({ isSeen, onClose, text, data }: editProps) {
    const [info, setInfo] = useState(""); 
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const { dataState } = useContext(dataContext);
  
    const Inputs = () => {
      if (data == 2) {
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder={dataState.name?.toString()}
              onChangeText={setName}
              value={name} // Valor asociado al estado 'name'
            />
            <TextInput
              style={styles.input}
              placeholder={dataState.lastname?.toString()}
              onChangeText={setLastname}
              value={lastname} // Valor asociado al estado 'lastname'
            />
          </>
        );
      } else {
        return (
          <TextInput
            style={styles.input}
            placeholder="value"
            onChangeText={setInfo}
            value={info}
          />
        );
      }
    };
  
    return (
      <Modal transparent={true} visible={isSeen} animationType="slide">
        <View style={styles.container}>
          <View style={styles.background}>
            <Text style={styles.font}>{text}</Text>
            <Inputs />
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, styles.logbutton]}
            >
              <Text style={[styles.textType]}>Save changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={[
                styles.button,
                styles.logbutton,
                { backgroundColor: "red" },
              ]}
            >
              <Text style={[styles.textType]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    background: {
      backgroundColor: "white",
      alignItems: "center",
      padding: 20,
      borderRadius: 20,
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      marginTop: 20,
    },
    logbutton: {
      display: "flex",
      backgroundColor: "#093450",
      alignItems: "center",
      width: "50%",
    },
    textType: {
      color: "white",
      fontFamily: "Calistoga",
    },
    font: {
      fontSize: 20,
      fontFamily: "Calistoga",
    },
    input: {
      width: 250, 
      height: 40, 
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 15, 
      paddingHorizontal: 10,
      marginTop: 15,
      textAlign: "left", 
      fontSize: 16,
    },
  });
  