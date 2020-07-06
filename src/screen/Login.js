import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import * as authService from '../service/authService'
import * as workService from '../service/workService'
import { AsyncStorage } from "react-native"
import Logo from './componentes/Logo'

export default function App(props) {

  const [mensagem, setMensagem] = useState("")
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const { navigation } = props
  const [loading, setLoaging] = useState(false)

  const saveProfile = () => {
    // Salvar dados no dispositivo
    let profile = {
      email: email
    }
    //profile.username ou profile.email
    AsyncStorage.setItem("profile", JSON.stringify(profile))
  }
  const validarLogin = () => {
    setLoaging(true)
    authService.login(email, password)
      .then(retorno => {
        saveProfile()
        setLoaging(false)
        navigation.replace('Home')


      })
      .catch(erro => {
        setLoaging(false)
        if (erro.code == "auth/user-not-found") {
          setMensagem("Usuário não encontrado, verificque o e-mail digitado.")
        } else if (erro.code == "auth/wrong-password") {
          setMensagem("Senha incorreta verifique a senha digitada.")
        } else {
          setMensagem(erro.message)
        }

      })
    //     
  }

  const Cadastrar = async () => {
    setLoaging(true)
    await authService.create(email, password)
      .then(retorno => {
        saveProfile()
        setLoaging(false)
        workService.saveEmail(email).then(() => {
          navigation.replace('Home')
        })
      })
      .catch(erro => {
        setLoaging(false)

        if (erro.code == "auth/weak-password") {
          setMensagem("É necessário 6 caracteres para a senha!")
        } else if (erro.code == "auth/email-already-in-use") {
          setMensagem("E-mail já cadastrado!")
        } else {
          setMensagem(erro.message)
        }

      })
  }

  const Sobre = () => {
    navigation.navigate('Sobre')
  }

  useEffect(() => {
    const inicializaDados = async () => {
      let profile = JSON.parse(await AsyncStorage.getItem("profile"))
      if (profile) {
        setEmail(profile.email)
      }
    }
    inicializaDados()

    setTimeout(() => {
      let user = authService.verificarLogin()
      //console.log(user.currentUser)
      if (user.currentUser) {
        navigation.replace('Home')

      }
    }, 1000);



  }, [])

  return (
    <View style={styles.container}>
      <Logo margin="20" width="150" height="150"></Logo>
      <Text>Login!</Text>
      <Text style={styles.mensagemErro}>{mensagem}</Text>
      <TextInput
        style={styles.caixaTexto}
        placeholder="e-mail"
        value={email}
        onChangeText={texto => setEmail(texto)}

      />
      <TextInput
        style={styles.caixaTexto}
        placeholder="password"
        value={password}
        secureTextEntry
        onChangeText={texto => setPassword(texto)}
      />
      <View style={styles.caixaBotao}>
        <View style={styles.botao}>
          <Button
            title="Login"
            onPress={validarLogin}

          />
        </View>
        <View style={styles.botao}>
          <Button
            title="Novo Registro"
            style={styles.botao}
            onPress={Cadastrar}
          />
        </View>
        <View>
          <ActivityIndicator animating={loading} size="small" color="#00ff00" />
        </View>

      </View>
      <View style={styles.botaoSobre}>
        <Button
          title="Sobre"
          onPress={Sobre}
        />
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
  }, caixaTexto: {
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginTop: 5
  }, caixaBotao: {
    marginTop: 5,
    flexDirection: "row"
  },
  botao: {
    marginRight: 3
  },
  botaoSobre: {
    marginTop: 80,
  },
  mensagemErro: {
    color: "red",
    marginLeft: 20
  }
});
