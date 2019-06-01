import React, { Component } from 'react';
import * as firebase from 'firebase';
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import BackgroundImage from '../components/BackgroundImage';
import logo from '../../assets/images/el_tostadero.png'
//el_tostadero.png
export default class Setting extends Component {
    render() {
        return (
            <BackgroundImage style={{ flex: 1, width: null, height: null, backgroundColor: 'rgba(200, 38, 74, 0.3)' }}>
                <ScrollView>
                    <View style={{ flexGrow: 1 }}>
                        <Text style={styles.title} >
                            Esta funcionalidad está en desarrolllo y pronto estará disponible. Para cualquier cambio en sus ajustes
                            póngase en contacto con un administrador o con atención al cliente.

                            Disculpe las molestias.
                        </Text>
                    </View>
                    <View style={styles.logoContainer}>
                        <Image source={logo} />
                    </View>

                </ScrollView>
            </BackgroundImage>
        )
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
    },
    title: {
        // marginTop:10,
        padding: 10,
        fontSize: 30,
        // height: 50,
        fontWeight: 'bold'
    },

});

