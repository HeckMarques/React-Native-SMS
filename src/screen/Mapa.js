import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity, TextInput, Button, KeyboardAvoidingView, SafeAreaView, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as WorkService from '../service/workService'

export default function App() {

  const [pesquisatxt, setPesquisaTxt] = useState("")
  const [pesquisa, setPesquisa] = useState(null)
  const [myPosition, seMyposition] = useState(null)
  // Posição da IMED
  const [localicaoAtual, setLocalicaoAtual] = useState({})
  const [localizacoes, setLocalizacoes] = useState([])

  const [loading, setLoaging] = useState(false)
  
  const [viewShow, setViewShow] = useState(false)


  const getAmigos = () => {
    setLoaging(true)
    setViewShow(true)
    WorkService.getWorks()
      .then(amigos => {
        console.log(amigos)
        var array = []
        for (var i = 0; i < amigos.length; i++) {
          console.log('iterando sobre amigos')
          console.log(amigos[i].latitude)
          array.push(
            {
            localicacao: {
              latitude: amigos[i].latitude,
              longitude: amigos[i].longitude,
              latitudeDelta: 0.010,
              longitudeDelta: 0.010,
            },
            title: amigos[i].nome,
          })
        }

        setLocalizacoes(array)
        setLoaging(false)
        
      })
      .catch(erro => console.log(erro.message))
  }



  const getMyPosition = async () => {
    let { status } = await Location.requestPermissionsAsync()

    if (status !== "granted") {
      Alert.alert("Permissão de acesso a localização negado!")
    } else {
      await Location.getCurrentPositionAsync({})
        .then(retorno => {
          seMyposition(retorno.coords)
          setLocalicaoAtual({
            latitude: retorno.coords.latitude,
            longitude: retorno.coords.longitude,
            latitudeDelta: 0.010,
            longitudeDelta: 0.010,
          })

          getAmigos()

        })
        .catch(error => Alert.alert("Erro ao acessar o GPS!"))
    }
  }


  useEffect(() => {
    getMyPosition()

  }, [])

  return (
    viewShow ? <View style={styles.container}>
       <ActivityIndicator animating={loading} size="small" color="#00ff00" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* <TextInput
            style={styles.caixaTexto}
            placeholder="Informe o local"
            value={pesquisatxt}
            onChangeText={text => setPesquisaTxt(text)}
          /> */}

          <MapView
            style={styles.mapStyle}
            initialRegion={localicaoAtual}
            region={localicaoAtual}
          >
            {
              localizacoes.map((item, key) => <Marker
                key={key}
                coordinate={item.localicacao}
                title={item.title}
              />)
            }

            {myPosition ? <Marker
              coordinate={myPosition}
              title={"Onde eu estou!"}
              description={"Minha Casa"}
            />

              : null}

            {pesquisa ? <Marker
              coordinate={pesquisa}
              title={"Pesquisa"}
              description={""}
            />

              : null}

          </MapView>
          <View style={styles.caixaBotao}>
            <TouchableOpacity style={styles.myLocationBox}
              onPress={() => {
                setLocalicaoAtual({
                  latitude: myPosition.latitude,
                  longitude: myPosition.longitude,
                  latitudeDelta: 0.010,
                  longitudeDelta: 0.010,
                })
              }}
            >
              <Icon name="home" color={'#fff'} size={30} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.myLocationBox}
              onPress={() => pesquisaLatLong(pesquisatxt)}
            >
              <Icon name="find-in-page" color={'#fff'} size={30} />
            </TouchableOpacity> */}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View> : null
  );
}

const styles = StyleSheet.create({
  caixaBotao: {
    flexDirection: 'row'
  },
  caixaTexto: {
    width: "95%",
    marginBottom: 10,
    marginTop: 25,
    marginLeft: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  positionBox: {
    marginTop: -170,
    marginHorizontal: 40,
    padding: 25
  },
  myLocationBox: {
    borderRadius: 150,
    width: 50,
    height: 50,
    marginTop: -130,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5
  }
});