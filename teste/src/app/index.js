import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";
import { useState } from 'react';

export default function Inicio() {
  const [numero, setNumero] = useState(0);

  return (
    <SafeAreaView style={styles.tela}>
      <Stack.Screen options={{headerShown: false, title: "Numero"}}></Stack.Screen>

      <View style={styles.botao}>

      <Button style={styles.botazin} title='+' onPress={() => {setNumero (numero + 1)}}></Button>
      <View style={styles.rodape}>
        <Text>{numero}</Text>
      </View>

      <Button title='-'onPress={() => {setNumero(numero - 1 )}}></Button>


      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  botao:{
    flexDirection:"row",
    paddingTop: 20,
    gap: 10,
    justifyContent: "space-around"
  },

  rodape: {
    backgroundColor: "#9a9ea2",
    borderRadius: 12,
    padding: 16,
    gap: 6,
    alignItems: "center",
    height: 50
  
  },

  tela: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  botazin:{
    
  }
});
