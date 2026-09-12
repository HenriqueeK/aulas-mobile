import { StatusBar } from 'expo-status-bar';
import { RootTagContext, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style= {styles.principal}>

    <View style={styles.bemvindo}>
        <View style={styles.circulo}></View>
      <View>
        <Text>Olá, Estudante</Text>
        <Text style={styles.texto}>Bem-vindo ao seu painel</Text>
      </View> 
    </View>
    


    </View>
  );
}

const styles = StyleSheet.create({

  principal: {
    flex: 1
  },

  bemvindo: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'row',
  },

  circulo:{
    backgroundColor: '#9297c0',
    width: 70,
    height: 70,
    borderRadius: 35
  },
});
