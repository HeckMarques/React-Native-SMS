import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import * as WorkService from '../service/workService'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import * as Location from 'expo-location';

export default function App(props) {

  const { navigation } = props


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [telefone, setTelefone] = useState("")
  const [key, setKey] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [works, setWorks] = useState([])
  const [loading, setLoaging] = useState(false)


  const limparDados = () => {
    setTitle("")
    setDescription("")
    setTelefone("")
    setMensagem("")
    setKey("")
  }

  const IrParaMapa = () => {
    navigation.navigate('Mapa')
  }


  const saveWork = () => {
    if (!title || !description) {
      setMensagem("Campos Inválidos")
    } else {
      //console.log(description)
      axios.get(`https://viacep.com.br/ws/${description}/json/`)
        .then((resultado) => {
          saveFrend(resultado)
        }).catch((e) => {
          setMensagem(e.message)
        })

    }
  }

  const saveFrend = async (resultado) => {
    let posicao = await Location.geocodeAsync(`${description}`)
      .then(resultadoCoordenadas => {

        const work = {
          nome: title,
          telefone: telefone,
          cep: description,
          rua: resultado.data.logradouro,
          bairro: resultado.data.bairro,
          cidade: resultado.data.localidade,
          estado: resultado.data.uf,
          latitude: resultadoCoordenadas[0].latitude,
          longitude: resultadoCoordenadas[0].longitude

        }
        WorkService.saveWork(work, key)
          .then(res => {
            setMensagem("Dados Inseridos com Sucesso!")
            getTrabalhos()
          }).catch(erro => setMensagem(erro.message))

      }).catch(erro => setMensagem(erro.message))
  }


  const deleteWork = (work) => {
    setLoaging(true)
    WorkService.deleteWork(work)
      .then(() => getTrabalhos())
      .catch(erro => setMensagem(erro))
  }

  const getTrabalhos = () => {
    setLoaging(true)
    WorkService.getWorks()
      .then(retorno => {
        console.log(retorno)
        setWorks(retorno)
        setLoaging(false)
      })
      .catch(erro => setMensagem(erro))
  }


  useEffect(() => {
    getTrabalhos()

  }, [])

  return (
    <View style={styles.container}>
      <Text>{mensagem}</Text>
      <TextInput
        style={title ? styles.caixaTexto : styles.caixaTextoError}
        placeholder='Nome'
        value={title}
        onChangeText={texto => setTitle(texto)}
      />
      <TextInput
        style={telefone ? styles.caixaTexto : styles.caixaTextoError}
        placeholder='Telefone'
        value={telefone}
        onChangeText={texto => setTelefone(texto)}
      />
      <TextInput
        style={description ? styles.caixaTexto : styles.caixaTextoError}
        placeholder='CEP'
        value={description}
        onChangeText={texto => setDescription(texto)}
      />


      <View style={styles.caixaBotao}>
        <View style={styles.botao}>
          <Button
            title="Registrar"
            onPress={saveWork}
          />
        </View>
        <View style={styles.botao}>
          <Button
            title="Limpar Dados"
            onPress={limparDados}
          />
        </View>
        <View style={styles.botao}>
          <Button
            title="Mapa"
            onPress={IrParaMapa}
          />
        </View>
      </View>

      <View>
        <ActivityIndicator animating={loading} size="small" color="#00ff00" />
        <FlatList
          data={works}
          renderItem={({ item }) =>
            <TouchableOpacity
              onPress={() => {
                setTitle(item.nome)
                setDescription(item.cep)
                setTelefone(item.telefone)
                setKey(item.key)
              }}
            >
              <View style={styles.box}>
                <View style={styles.boxCollum}>
                  <Text style={styles.boxTitle}>{item.nome} Tel: {item.telefone}</Text>
                  <Text>{item.rua} - {item.cep}</Text>
                </View>
                <View style={styles.boxCollumAction}>
                  <Text>
                    <Icon
                      onPress={() => deleteWork(item)}
                      name="trash"
                      size={30} color="red" />
                  </Text>
                </View>

              </View>
            </TouchableOpacity>
          }
        />


      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 10,

  }, caixaTexto: {
    width: "97%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginTop: 7
  }, caixaTextoError: {
    width: "97%",
    borderWidth: 1,
    borderColor: "red",
    padding: 5,
    marginTop: 7
  }, caixaBotao: {
    marginTop: 5,
    flexDirection: "row"
  },
  botao: {
    marginRight: 3
  },
  mensagemErro: {
    color: "red",
    marginLeft: 20
  }, box: {
    flexDirection: "row",
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 10,
    marginTop: 10
  }, boxCollum: {
    width: "80%"
  },
  boxCollumAction: {
    width: "20%",
    padding: 10,
    marginRight: 20
  },

  boxTitle: {
    fontWeight: "bold",
    color: "blue"
  }
});

