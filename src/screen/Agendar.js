import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import * as SmsService from '../service/smsService'
import * as WorkService from '../service/workService'
import { firebase } from '../back-end/firebase'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App(props) {

    const { navigation } = props


    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [telefone, setTelefone] = useState("")
    const [key, setKey] = useState("")
    const [mensagem, setMensagem] = useState("")
    const [works, setWorks] = useState([])
    const [numeros, setNumeros] = useState([])
    var [ViewNumeros, setViewNumeros] = useState('Numeros selecionados: ')
    const [loading, setLoaging] = useState(false)
    const [loading2, setLoading2] = useState(false)



    const addContato = (item) => {
        numeros.push(item.telefone)
        if (ViewNumeros == 'Numeros selecionados: ') {
            ViewNumeros = ViewNumeros + item.telefone
        } else {
            ViewNumeros = ViewNumeros + ', ' + item.telefone
        }

        setViewNumeros(ViewNumeros)
    }


    const limpar = () => {
        setNumeros([])
        setViewNumeros('Numeros selecionados: ')
    }

    const save = () => {
        setLoading2(true)
        //var num = [54991530359, 54991530359]

        const work = {
            data: title,
            hora: telefone,
            mensagem: description,
            numeros: numeros,
            status: 'Agendado',
            KeyUser: firebase.auth().currentUser.uid
        }

        SmsService.saveSMS(work)
            .then(id => {
                console.log('Id: ' + id)
                // Fazendo update de KEY
                SmsService.updateSMSid(id).then(() => {
                    navigation.goBack()
                    setLoading2(false)
                }).catch(erro => {
                    setMensagem(erro.message)
                    setLoading2(false)
                })

            }).catch(erro => {
                setMensagem(erro.message)
                setLoading2(false)
            })
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
                placeholder='Data'
                value={title}
                onChangeText={texto => setTitle(texto)}
            />
            <TextInput
                style={telefone ? styles.caixaTexto : styles.caixaTextoError}
                placeholder='Hora'
                value={telefone}
                onChangeText={texto => setTelefone(texto)}
            />
            <TextInput
                style={description ? styles.caixaTexto : styles.caixaTextoError}
                placeholder='Mensagem'
                value={description}
                onChangeText={texto => setDescription(texto)}
            />

            <Text style={styles.numero}>{ViewNumeros}</Text>

            <Button
                title="Limpar seleção"
                onPress={limpar}
            />

            <View>
                <ActivityIndicator animating={loading} size="small" color="#00ff00" />
                <FlatList
                    data={works}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            onPress={() => {
                                addContato(item)
                            }}
                        >
                            <View style={styles.box}>
                                <View style={styles.boxCollum}>
                                    <Text style={styles.boxTitle}>{item.nome} </Text>
                                    <Text>Tel: {item.telefone}</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                    }
                />


            </View>
            <View style={styles.salvar}>
                <Button
                    title="Salvar"
                    onPress={save}
                />
            </View>
            <ActivityIndicator animating={loading2} size="small" color="#00ff00" />



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
    },
    numero: {
        marginTop: 20,
    },
    salvar: {
        marginTop: 20,
    }
    , box: {
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

