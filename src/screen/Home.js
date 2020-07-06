import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as authService from '../service/authService'
import Logo from './componentes/Logo'

export default function App(props) {

    const { navigation } = props


    const IrParaEstrutura = () => {
        navigation.navigate('Estrutura')
    }
    const IrParaContatos = () => {
        navigation.navigate('Contatos')
    }

    const IrParaSms = () => {
        navigation.navigate('Sms')
    }

    const IrParaFaq = () => {
        navigation.navigate('Faq')
    }

    const sair = () => {
        authService.logof()
            .then(retorno => {
                navigation.replace('Login')
            })
            .catch(erro => {
                console.log(erro.message)
            })
    }

    useEffect(() => {
        console.log('home')

    }, [])

    return (
        <View style={styles.caixaBotao}>

            <View style={styles.container}>
                <Logo margin="10" width="70" height="70"></Logo>
            </View>

            <View style={styles.botao}>
                <Button
                    title="Contatos"
                    onPress={IrParaContatos}
                />
            </View>
            <View style={styles.botao}>
                <Button
                    title="SMS"
                    onPress={IrParaSms}
                />
            </View>
            <View style={styles.botao}>
                <Button
                    title="Estrutura"
                    onPress={IrParaEstrutura}
                />
            </View>
            <View style={styles.botao}>
                <Button
                    title="FAQ"
                    onPress={IrParaFaq}
                />
            </View>
            <View style={styles.botao}>
                <Button
                    title="Sair"
                    onPress={sair}
                />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        alignItems:"center"

    }, caixaBotao: {
        marginTop: 20,
    },
    botao: {
        marginTop: 20,
    },
    mensagemErro: {
        color: "red",
        marginLeft: 20
    },
});

