import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, ScrollView, FlatList, Text, View, Image, Alert, TouchableOpacity } from "react-native";
import BackgroundImage from "../../components/BackgroundImage";
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../../../assets/images/el_tostadero.png';
import cafe_gran_bouquet from "../../../assets/images/cafe_gran_bouquet.png";
import cafe_natural_supremo from "../../../assets/images/cafe_natural_supremo.png";

export default class NotificationDetail extends Component {
    constructor(props) {
        super(props);       //acceder a la navegacion
        const { params } = props.navigation.state;
        this.userId = firebase.auth().currentUser.uid;
        this.state = {
            idNotificacion: params.notificacion,
            notificaciones: [],
            loaded: false,
        };
    }


    componentDidMount() {
        
        let identificadorNotificacion = this.state.idNotificacion.id;
        console.log("identificadorNotificacion: " + identificadorNotificacion);
        //referencia base datos firebase
        //console.log('id user: ' + this.userId);        
        this.refOrders = firebase.database().ref().child('notifications/' + this.userId + '/' + identificadorNotificacion.id + '/');


        this._loadFirebaseNotifications();

    }

    updateRead(read) {
        firebase.database().ref('notifications/' + this.userId + '/' + this.state.idNotificacion.id + '/').update({
            read,
        });
    }

    _loadFirebaseNotifications() {
        //acceder a la información
        this.refOrders.on('value', snapshot => {
            let notificaciones = [];
            snapshot.forEach(row => {
                notificaciones.push({
                    id: row.key,
                    date: row.val().date,
                    description: row.val().description,
                    //type: row.val().type,               //tipo de café: descafeinado, cafeinado...
                    read: row.val().read,
                    title: row.val().title

                })
            });
            //cuando el componente ha cargado 
            this.setState({
                notificaciones,
                loaded: true
            });
        })
    }


    renderPedidos() {
        const { notification } = this.state;
        console.log("identificadorNotificacion: " + this.state.idNotificacion);
        console.log("TITLE: " + notification.title)


        return (

            <View /*style={styles.item}*/ style={styles.container}>
                <View style={{ flexGrow: 1 }}>
                    <Text style={styles.title} >
                        {notification.title}
                    </Text>
                    <View >
                        <Text style={styles.text} >
                            Descripción:
                        </Text>

                        <Text style={styles.quantity} >
                            {notification.description}
                        </Text>
                    </View>


                </View>


            </View>

        )
    }

    render() {
        const { notificacion } = this.state.idNotificacion;
        console.log("entra render")
        console.log("date: " + notificacion);
        // console.log("Notificacion: " + this.state.notificaciones[0].date);
        let read = this.state.idNotificacion.read = true;
        this.updateRead(read);
        return (
            <BackgroundImage style={{ flex: 1, width: null, height: null, backgroundColor: 'rgba(200, 38, 74, 0.3)' }}>
                <ScrollView>
                    <View style={{ flexGrow: 1 }}>
                        <Text style={styles.title} >
                            {this.state.idNotificacion.title}
                        </Text>
                        <View >
                            <Text style={styles.quantity} >
                                {this.state.idNotificacion.description} a las{this.state.idNotificacion.date.substring(10,16)} del {this.state.idNotificacion.date.substring(0,10)}.
                            </Text>
                        </View>
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
    title: {
        // marginTop:10,
        padding: 10,
        fontSize: 30,
        // height: 50,
        fontWeight: 'bold'
    },
    quantity: {
        // marginTop:10,
        padding: 20,
        fontSize: 20,
        // height: 50,
        //  left:'20%',
        // alignItems: "stretch",
        // justifyContent: "left",
        //  justifyContent: "center"
    },

    listIconStyle: {
        marginRight: 10,
        fontSize: 15,
        color: 'rgba(255, 38, 74, 0.6)'
    },
    // item: {
    //     padding: 0,
    //     backgroundColor: 'rgba(206, 206, 206, 0.6)'
    // },
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        // backgroundColor: '#D3033E'
        backgroundColor: 'rgba(200, 38, 74, 0.8)'

    },
    item: {
        alignItems: "flex-start",
        backgroundColor: 'rgba(206, 206, 206, 0.6)',
        flexGrow: 1,
        margin: 1,
        padding: 15,
        flexBasis: 0,
    },
    text: {
        color: "#333333",
        fontWeight: 'bold',
        padding: 15,
    },

    container: {
        backgroundColor: 'rgba(231, 228, 224, 0.8)',
        flex: 1,
        // marginLeft: 10,
        // marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center",
        flexDirection: 'row'
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30
      },
});