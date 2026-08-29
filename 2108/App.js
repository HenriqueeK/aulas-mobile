import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1 }}>

      <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroudColor: 'blue'}}>
          <View style={{width: 60, height: 60, borderRadius: 30, backgroundColor: '#ff0707'}}></View>
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 16}}>Nome</Text>
              <Text style={{fontSize: 12}}>Subtítulo</Text>
            </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{width: 80, height: 80, borderWidth: 1}}></View>
          <View style={{width: 80, height: 80, borderWidth: 1}}></View>
          <View style={{width: 80, height: 80, borderWidth: 1}}></View>
      </View>

      <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch'}}>
          <View style={{height: 150, backgroundColor: '#ddd'}}></View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'flex-start',alignItems: 'center'}}>

      </View>

      <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
        <View style={{width: 40, height: 40, borderRadius: 8, backgroundColor: '#ccc'}}></View>
          <View style={{marginLeft: 10, flex: 1}}>
            <Text>Linha 1</Text>
            <Text>Linha 2</Text>
          </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({});