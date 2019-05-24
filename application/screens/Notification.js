import React, { Component } from 'react';
import * as firebase from 'firebase';
import { View, StyleSheet, Button, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import BackgroundImage from '../components/BackgroundImage';

export default class Notification extends Component {
    render() {
        return (
            <BackgroundImage style={styles.backgroundContainer} >
                <View style={styles.container}>
                    <Text>Notificaciones</Text>
                </View>

            </BackgroundImage>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: '#D3033E'

    },
    logo: {
        width: '70%',
        height: '45%',
        marginTop: 20

    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30
    },
    logoText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.9
    },
    inputIcon: {
        position: 'absolute',
        top: 15,
        left: 37
    },
    inputContainer: {
        marginTop: 10
    },
    btnEye: {
        position: 'absolute',
        top: 15,
        right: 37
    },

    text: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }

});

