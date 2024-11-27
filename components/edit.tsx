import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { dataContext } from "@/context/dataContext/dataContext";
import { AuthContext } from "@/context/authContext/AuthContext";
import * as Location from "expo-location";

interface EditProps {
  isSeen: boolean;
  onClose: () => void;
  text: string;
  data: number;
}

export default function Edit({ isSeen, onClose, text, data }: EditProps) {
  const nameRef = useRef<string>("");
  const lastnameRef = useRef<string>("");
  const infoRef = useRef<string>("");
  const { dataState, storeData, getData, update} = useContext(dataContext);
  const { state } = useContext(AuthContext);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [locationText, setLocationText] = useState("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const getAddress = async () => {
    if (location == null) {
      Alert.alert("Location not available");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
      );

      const data = await response.json();
      console.log(data)
      setLocationText(data.display_name);
    } catch (error) {
      console.error(error);
      Alert.alert("Error fetching address");
    }
  };

  const handleSaveChanges = () => {
    if (data === 1) {
      if (!infoRef.current.trim() && !locationText) {
        Alert.alert("No valid direction data");
        return;
      }

      if(!infoRef.current){
        infoRef.current = locationText
      }
      update(state.user.uid, infoRef.current, "location")
      console.log(state.user.uid)
      
    } else if (data === 2) {
      if (!nameRef.current.trim() && !lastnameRef.current.trim()) {
        Alert.alert("Name and Lastname cannot be empty");
        return;
      }

      if(nameRef.current){
        update(state.user.uid, nameRef.current, "name")
      }

      if(lastnameRef.current){
        update(state.user.uid, lastnameRef.current, "lastname")
      }
      // Update logic for data === 2
    } else if (data === 3) {
      if (!nameRef.current.trim()) {
        Alert.alert("No valid card number");
        return;
      }
      if (!lastnameRef.current.trim()) {
        Alert.alert("No valid CVC");
        return;
      }
      if (!infoRef.current.trim()) {
        Alert.alert("No valid expiration date");
        return;
      }

      const paymentData = {
        cardNumber: nameRef.current,
        cvc: lastnameRef.current,
        expirationDate: infoRef.current,
      };

      storeData(state.user.uid, paymentData);
    }

    onClose();
  };

  const Inputs = () => {
    if (data === 3) {
      return (
        <>
          <TextInput
            style={styles.input}
            placeholder="Card number"
            onChangeText={(value) => (nameRef.current = value)}
            defaultValue={nameRef.current}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="CVC"
            onChangeText={(value) => (lastnameRef.current = value)}
            defaultValue={lastnameRef.current}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Expiration date"
            onChangeText={(value) => (infoRef.current = value)}
            defaultValue={infoRef.current}
            keyboardType="numeric"
          />
        </>
      );
    } else if (data === 2) {
      return (
        <>
          <TextInput
            style={styles.input}
            placeholder={dataState.name?.toString() || "Name"}
            onChangeText={(value) => (nameRef.current = value)}
            defaultValue={nameRef.current}
          />
          <TextInput
            style={styles.input}
            placeholder={dataState.lastname?.toString() || "Lastname"}
            onChangeText={(value) => (lastnameRef.current = value)}
            defaultValue={lastnameRef.current}
          />
        </>
      );
    } else {
      return (
        <>
          <TextInput
            style={styles.input}
            placeholder={"Value"}
            onChangeText={(value) => (infoRef.current = value)}
            defaultValue={locationText}
          />
          <TouchableOpacity
            onPress={getAddress} // Llama a getAddress al presionar el botón
            style={[styles.button, styles.logbutton]}
          >
            <Text style={styles.textType}>add current location</Text>
          </TouchableOpacity>
        </>
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
            onPress={handleSaveChanges}
            style={[styles.button, styles.logbutton]}
          >
            <Text style={styles.textType}>Save changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClose}
            style={[
              styles.button,
              styles.logbutton,
              { backgroundColor: "red" },
            ]}
          >
            <Text style={styles.textType}>Close</Text>
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
