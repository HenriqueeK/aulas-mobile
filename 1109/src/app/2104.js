import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  return (
    <View style={{flex: 1}}>


    
    <ScrollView style={{flex: 1}}>
      <View style={styles.menu}>
          <Text style={styles.textoMenu}>+</Text>
          <Text style={styles.textoMenu}>Instagram</Text>
          <Text style={styles.textoMenu}>♡︎</Text>
      </View>

      <View>

      <View style={styles.menuBola}>
        <View style={styles.bola}></View>
        <View style={styles.bola}></View>
        <View style={styles.bola}></View>
        <View style={styles.bola}></View>
      </View>
      
      <View style={styles.usuario}>
        <Text style={styles.nome}>Meu perfil</Text>
        <Text style={styles.nome}>Perfil 1</Text>
        <Text style={styles.nome}>Perfil 2</Text>
        <Text style={styles.nome}>Perfil 3</Text>
      </View>

      </View>

        <View>
          <View style={styles.dono}>
            <View style={styles.perfil}></View>
            <View>
              <Text style={{fontWeight: 'bold'}}>Só alegria brasil</Text>
              <Text style={{fontSize: 11}}>♫ Os Profissionais No Comando</Text>
            </View>
          </View>

          <View style={styles.post}></View>
          <View style={styles.conteudo}></View>

      </View>
            <View>
          <View style={styles.dono}>
            <View style={styles.perfil}></View>
            <View>
              <Text style={{fontWeight: 'bold'}}>Só alegria brasil</Text>
              <Text style={{fontSize: 11}}>♫ Os Profissionais No Comando</Text>
            </View>
          </View>

          <View style={styles.post}></View>
          <View style={styles.conteudo}></View>

      </View>
              <View>
          <View style={styles.dono}>
            <View style={styles.perfil}></View>
            <View>
              <Text style={{fontWeight: 'bold'}}>Só alegria brasil</Text>
              <Text style={{fontSize: 11}}>♫ Os Profissionais No Comando</Text>
            </View>
          </View>

          <View style={styles.post}></View>
          <View style={styles.conteudo}></View>

      </View>
              <View>
          <View style={styles.dono}>
            <View style={styles.perfil}></View>
            <View>
              <Text style={{fontWeight: 'bold'}}>Só alegria brasil</Text>
              <Text style={{fontSize: 11}}>♫ Os Profissionais No Comando</Text>
            </View>
          </View>

          <View style={styles.post}></View>
          <View style={styles.conteudo}></View>

      </View>
      

    </ScrollView>

        <View style={styles.fim}>
        <Text style={styles.icones}>🏠︎</Text>
        <Text style={styles.icones}>▶</Text>
        <Text style={styles.icones}>✉︎</Text>
        <Text style={styles.icones}>🔍︎</Text>
        <View style={styles.ultimo}></View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menu: {
    color: "black",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  textoMenu: {
    fontWeight: 'bold',
    fontSize: 29
  },

  menuBola: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: "30",
  },

  bola: {
    backgroundColor: "black",
    width: 85,
    height: 85,
    borderRadius: 50
  },

  perfil: {
    backgroundColor: "black",
    width: 45,
    height: 45,
    borderRadius: 50
  },

  dono: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: "center"
  },

  usuario: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingRight: 10,
    gap: 20 
  },

  nome: {
    fontSize: 10
  },

  post: {
    padding: 5,
    justifyContent: "flex-start"
  },

  conteudo: {

    backgroundColor: "blue",
    width: "100%",
    height: 400,
    alignItems: "center"
    
  },

  fim: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 20
  },

  icones: {
    fontSize: 23
  },

  ultimo: {
    backgroundColor: "black",
    height: "30",
    width: "30",
    borderRadius: 50,
  }

});
