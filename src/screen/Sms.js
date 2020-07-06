import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import * as smsService from '../service/smsService'


export default function App(props) {

    const { navigation } = props


    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [telefone, setTelefone] = useState("")
    const [key, setKey] = useState("")
    const [mensagem, setMensagem] = useState("")
    const [works, setWorks] = useState([])
    const [loading, setLoaging] = useState(false)




    const agendar = () => {
        navigation.navigate('Agendar')
    }

    const totalvoice = () => {
        navigation.navigate('Totalvoice')
    }


    const getTrabalhos = () => {
        setLoaging(true)
        smsService.getSMS()
            .then(retorno => {
                console.log(retorno)
                setWorks(retorno)
                setLoaging(false)
            })
            .catch(erro => setMensagem(erro))
    }


    useEffect(() => {
        console.log('sms')
        getTrabalhos()

    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.caixaBotao}>
                <View style={styles.botao}>
                    <Button
                        title="Agendar"
                        onPress={agendar}
                    />
                </View>
                <View style={styles.botao}>
                    <Button
                        title="Atualizar"
                        onPress={getTrabalhos}
                    />
                </View>
            </View>
            <View>
                <ActivityIndicator animating={loading} size="small" color="#00ff00" />
                <FlatList
                    data={works}
                    renderItem={({ item }) =>
                        <View style={styles.box}>
                            <View style={styles.boxCollum}>
                                <Text style={styles.boxTitle}>{item.data} as: {item.hora}</Text>
                                <Text>{item.mensagem}</Text>
                                <Text style={styles.boxStatus}>{item.status}</Text>
                            </View>

                        </View>
                    }
                />
            </View>
        </View>
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
    },
    boxStatus: {
        fontWeight: "bold",
        textAlign: "right"
    }
});

