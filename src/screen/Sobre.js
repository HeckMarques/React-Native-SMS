import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, } from 'react-native';

export default function App() {

    const title = useState("Versão 1.0.0");
    const body = useState("Desenvolvido usando React-Native com expo.");
    const title1 = useState("Por Mauricio Marques");
    const body1 = useState("Contato (54) 99153-0359 ou mauricio.marques888@gmail.com");

    const title2 = useState("Backend");
    const body2 = useState("Firebase: Firestore e Functions.");

    useEffect(() => {
        console.log('Sobre')

    }, [])

    return (

        <Text style={styles.baseText}>
            <Text style={styles.titleText}>
                {title}
                {"\n"}
            </Text>
            <Text numberOfLines={2}>{body}</Text>
            {"\n"}
            <Text style={styles.titleText}>
                {title1}
                {"\n"}
            </Text>
            <Text numberOfLines={2}>{body1}</Text>
            {"\n"}
            <Text style={styles.titleText}>
                {title2}
                {"\n"}
            </Text>
            <Text numberOfLines={2}>{body2}</Text>
        </Text>



    );
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Cochin",
        fontSize: 17
    },
    titleText: {
        fontSize: 30,
        marginTop: 15,
        fontWeight: "bold"
    }
});

