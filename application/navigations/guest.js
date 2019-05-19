import React from 'react';
import {createStackNavigator} from "react-navigation";
import LoginScreen from "../screens/Login";

export default createStackNavigator  (
    {
        Login: {
            screen: LoginScreen
        }
    },
    {
        //configuración
        initialRouteName: 'Login',          //nombre ruta inicial
        navigationOptions:{
            header: null,
            headerStyle:{
                backgroundColor: '#f4511e'   //cambiar el color de la cabecera ed622f
            },
            headerTitleStyle: {             //estilo título cabecera
				textAlign: 'center',
				alignSelf: 'center',
				fontSize: 20,
				color: '#fff',
				fontWeight: 'bold'
            },
            //cardStyle: { backgroundColor: '##ed622f' },
        }
    }
);