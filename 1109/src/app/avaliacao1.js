import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.geral}>

      <View style={styles.cabecalho}>
        <View style={styles.bola}></View>
        <View>
          <Text style={styles.titulo}>React Native</Text>
          <Text style={styles.texto}>Avaliação dia 04/09</Text>
        </View>
      </View>

      <View style={styles.meio}>
          <View style= {styles.cartao}>
            <Text>Batatas são macias.</Text>
          </View>
      
          <View style={styles.botao}>
            <Button title="ENVIAR" color="blue"></Button> 
          </View>
          
       </View>

    </View>
  );
}

const styles = StyleSheet.create({
  geral: {
    flex: 1,
    backgroundColor: "#e5f9ff"
  },

  bola: {
    backgroundColor: "blue",
    width: 55,
    height: 55,
    borderRadius: 50
  },

  cabecalho: {
    paddingTop: 20,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 15,
    alignItems: "center"
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  texto: {
    fontSize: 11,
    color: "gray"
  },

  cartao: {
    backgroundColor: "white",
    alignItems: "center",
    width: 300,
    height: 60,
    justifyContent: "center",
    borderRadius: 10
  },

  meio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },

  botao: {
    width: 150,
  }
  
});
