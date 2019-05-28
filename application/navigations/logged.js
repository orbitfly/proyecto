import React from 'react';
import { Platform } from 'react-native';
import OrdersScreen from "../screens/Orders/Orders";
import LogoutScreen from "../screens/Logout";
import AddOrderScreen from "../screens/Orders/AddOrder";
import OrderDetailScreen from "../screens/Orders/OrderDetail";
import OrderEditScreen from "../screens/Orders/OrderEdit";
import NotificationDetailScreen from "../screens/Notifications/NotificationDetail";
import NotificationsScreen from "../screens/Notifications/Notifications";
import SettingScreen from "../screens/Setting";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/Ionicons';


const navigationOptions = {
    navigationOptions: {
        headerStyle: {
            backgroundColor: 'rgba(200, 38, 74, 1)',
        },
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: 20,
            color: '#fff',
            fontWeight: 'bold'
        }
    }
};

const leftIcon = (navigation, iocn) => <Icon
    name={iocn}
    style={{ marginLeft: 20 }}
    size={20}
    color="white"
    onPress={() => navigation.openDrawer()}        //abrir el menú 
/>;

const rightIcon = (navigation, iocn) => <Icon
    name={iocn}
    style={{ marginRight: 20 }}
    size={25}
    color="white"
    onPress={() => navigation.navigate('ListOrder')}        // irá al listado de pedidos
/>;

const backIcon = (navigation, iocn) => <Icon
    name={iocn}
    style={{ marginRight: 20 }}
    size={20}
    color="white"
    onPress={() => navigation.navigate('ListNotification')}        // irá al listado de pedidos
/>;


//navegaciones
const OrdersScreenStack = createStackNavigator(
    {
        ListOrder: {
            screen: OrdersScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Pedidos',
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        AddOrder: {
            screen: AddOrderScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Añadir pedido',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        OrderDetail: {
            screen: OrderDetailScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Detalles del pedido',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        OrderEdit: {
            screen: OrderEditScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Editar pedido',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
    },
    navigationOptions
);

const NotificationScreenStack = createStackNavigator(
    {
        ListNotification: {
            screen: NotificationsScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Notificaciones',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
        NotificationDetail: {
            screen: NotificationDetailScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Detalles notificación',
                headerRight: backIcon(navigation, 'mail-reply'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        },
    },
    navigationOptions
);

const SettingScreenStack = createStackNavigator(
    {
        SettingScreen: {
            screen: SettingScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Ajustes',
                headerRight: rightIcon(navigation, 'home'),
                headerLeft: leftIcon(navigation, 'bars')
            })
        }
    },
    navigationOptions
);

const logoutScreenStack = createStackNavigator({
    LogoutScreen: {
        screen: LogoutScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Cerrar sesión',
        })
    }
});

export default createDrawerNavigator(
    {
        OrdersScreen: {
            screen: OrdersScreenStack,
            navigationOptions: ({ navigation }) => ({
                drawerLabel: 'Pedidos',
                drawerIcon: ({ tintColor }) => (<Icon name="home" size={24} style={{ color: tintColor }} />),
            })
        },
        NotificationScreen: {
            screen: NotificationScreenStack,
            navigationOptions: ({ navigation }) => ({
                drawerLabel: 'Notificaciones',
                drawerIcon: ({ tintColor }) => (<Icon name={"bell"} size={24} style={{ color: tintColor }} />),
            })
        },
        SettingScreen: {
            screen: SettingScreenStack,
            navigationOptions: ({ navigation }) => ({
                drawerLabel: 'Ajustes',
                drawerIcon: ({ tintColor }) => (<Icon name={"sliders"} size={24} style={{ color: tintColor }} />),
            })
        },
        LogoutScreen: {
            screen: logoutScreenStack,
            navigationOptions: ({ navigation }) => ({
                drawerLabel: 'Cerrar sesión',
                drawerIcon: ({ tintColor }) => (<Icon name={"sign-out"} size={24} style={{ color: tintColor }} />),
            })
        }
    },
    {   //estilos
        drawerBackgroundColor: 'rgba(128, 35, 60, 0.7)',
        contentOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: 'white',
            itemsContainerStyle: {
                marginVertical: 0,
            }
        },
    }
)