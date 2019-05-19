import React from 'react';
import OrdersScreen from "../screens/Orders/Orders";
import LogoutScreen from "../screens/Logout";
import AddOrderScreen from "../screens/Orders/AddOrder";
import {createDrawerNavigator, createStackNavigator} from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

const navigationOptions = {
    navigationOptions:{
        headerStyle:{
            backgroundColor: 'rgba(200, 38, 74, 1)',
        },
        headerTitleStyle:{
            textAlign:'center',
            alignSelf: 'center',
            fontSize: 20,
            color: '#fff',
            fontWeight: 'bold'
        }
    }
};

const leftIcon = (navigation, iocn) => <Icon
    name= {iocn}
    style={{marginLeft: 20}}
    size={20}
    color="white"
    onPress={() => navigation.openDrawer()}        //abrir el menú 
/>;

const rightIcon = (navigation, iocn) => <Icon
    name= {iocn}
    style={{marginLeft: 20}}
    size={30}
    color="white"
    onPress={() => navigation.navigate('ListOrder')}        // irá al listado de pedidos
/>;

//navegaciones
const OrdersScreenStack = createStackNavigator(
    {
        ListOrder:{
            screen: OrdersScreen,
            navigationOptions:({navigation})=>({
                title: 'Pedidos',
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        AddOrder: {
            screen: AddOrderScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Añadir pedido',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
    },
    navigationOptions
);

const logoutScreenStack = createStackNavigator({
    LogoutScreen: {
        screen: LogoutScreen,
        navigationOptions: ({navigation}) => ({
            title: 'Cerrar sesión',
        })
    } 
 }); 

export default createDrawerNavigator(
    {
        OrdersScreen:{
            screen: OrdersScreenStack,
            navigationOptions: ({navigation}) => ({
                drawerLabel: 'Pedidos',
                drawerIcon: ({tintColor}) => (<Icon name="home" size={24} style= {{color:tintColor}}/>),
            })
        },
        LogoutScreen: {
            screen: logoutScreenStack,
            navigationOptions: ({navigation}) => ({
                drawerLabel: 'Cerrar sesión',
                drawerIcon: ({tintColor}) => (<Icon name="sign-out" size={24} style= {{color:tintColor}}/>),
            })
        }
    },
    {   //estilos
        drawerBackgroundColor: 'rgba(128, 35, 60, 0.7)',
        contentOptions:{
            activeTintColor: 'white',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: 'white',
            itemsContainerStyle:{
                marginVertical: 0,
            }
        },
    }
)