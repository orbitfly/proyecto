/*Created by noelia */
import React, {Component} from 'react';
//ActivityIndicator sirve para utilizar el preloader, style estilos dinamicos, view es contenedor
import {ActivityIndicator, Image, View, StyleSheet, Dimensions} from 'react-native';   


const {height} = Dimensions.get('window');

export default class PreLoader extends Component{
    render(){
        return(
            <View style={[styles.preloader]}>
                <ActivityIndicator style={{height: 80}} size="large" />
            </View>
        );
    }
}

//definimos los objetos que queremos para darle estilos
const styles = StyleSheet.create({
    preloader: {
        flex: 1,        //tanto  espacio como pueda
        flexDirection: 'column', //tanto espacio como pueda en vertical
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        backgroundColor: '#242935'
       
    }
});   