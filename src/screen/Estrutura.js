import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {

    const title = useState("Firestore");
    const body = useState("users");
    const body3 = useState("ID user");
    const body4 = useState("Contato");
    const body5 = useState("ID contato");
    const body6 = useState("SMS");
    const body7 = useState("ID sms");

    useEffect(() => {
        console.log('Sobre')

    }, [])

    return (

        <View style={styles.baseText}>

            <Text style={styles.titleText}>
                {title}
            </Text>

            <Text style={styles.bo}>{body} {"\n"}</Text>

            <Text style={styles.bo1}>{body3}  {"\n"}</Text>

            <Text style={styles.bo2}>{body4}     {"\n"}</Text>

            <Text style={styles.bo3}>{body5}   {"\n"}</Text>

            <Text style={styles.bo2}>{body6}{"\n"}</Text>

            <Text style={styles.bo3}>{body7}</Text>
            <Image
                style={{
                    margin: 10,
                    width: 300,
                    height: 300
                }}
                source={require('../../assets/bd.jpg')} />
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
        fontWeight: "bold"
    },
    bo1: {
        marginLeft: 40,
    },
    bo2: {
        marginLeft: 60,
        fontWeight: "bold"
    }
    ,
    bo3: {
        marginLeft: 80
    }
    ,
    titleText: {
        fontSize: 30,
        marginTop: 15,
        fontWeight: "bold"
    }
});

