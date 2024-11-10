import Background from "@/components/background";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <Background>
      <View style={style.background}>
        <Text style={style.title}>SweaterHub</Text>
      </View>
    </Background>
  );
}

const style =StyleSheet.create({
  background: {
    marginTop: 60,
    alignItems: "center"
    
  },
  title: {
    fontFamily: "calistogra",
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
})
