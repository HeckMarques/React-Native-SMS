import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View } from 'react-native';

export default function App() {

    const title1 = useState("Quanto custa o SMS?");
    const title2 = useState("Devo cadastrar os contatos?");
    const title3 = useState("Como inserir data e hora?");
    const title4 = useState("Como pago pelo uso?");
    const body1 = useState("Cada SMS custa 0,09 centavos para enviar");
    const body2 = useState("Sim, cadastre previamente seus contatos para programar os SMSs.");
    const body3 = useState("Insira a data no formato dia/mês/ano, exemplo: 06/05/2020 e a hora no formato hora:minuto exemplo: 08:00");
    const body4 = useState("Todo dia 05 do mês será enviado uma fatura por e-mail");


    useEffect(() => {
        console.log('Sobre')

    }, [])

    return (

        <View style={styles.baseText}>
            <Text style={styles.titleText}>
                {title1}
            </Text>
            <Text style={styles.bo}>{body1} {"\n"}</Text>

            <Text style={styles.titleText}>
                {title2}
            </Text>
            <Text style={styles.bo}>{body2} {"\n"}</Text>

            <Text style={styles.titleText}>
                {title3}
            </Text>
            <Text style={styles.bo}>{body3} {"\n"}</Text>

            <Text style={styles.titleText}>
                {title4}
            </Text>
            <Text style={styles.bo}>{body4} {"\n"}</Text>

        </View>

    );
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Cochin",
        fontSize: 17
    },
    bo: {
        marginLeft: 20,
    }
    ,
    titleText: {
        marginLeft: 5,
        fontSize: 25,
        marginTop: 5,
        fontWeight: "bold"
    }
});

