import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {StyleSheet,ScrollView,FlatList, Text, View, Image, Alert, TouchableOpacity} from "react-native";
import BackgroundImage from "../../components/BackgroundImage";
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import cafe_gran_bouquet from "../../../assets/images/cafe_gran_bouquet.png";
import cafe_natural_supremo from "../../../assets/images/cafe_natural_supremo.png";

export default class NotificationDetail extends Component{
    constructor(props){
        super(props);       //acceder a la navegacion
        const {params} = props.navigation.state;
        this.userId = firebase.auth().currentUser.uid;
        this.state = {
            idNotificacion:params.notificacion.id,
            notificaciones:[],
            loaded: false,
        };
    }


    componentDidMount() {
      
        let identificadorNotificacion = this.state.idNotificacion;
        
        //referencia base datos firebase
        //console.log('id user: ' + this.userId);        
        this.refOrders = firebase.database().ref().child('notifications/' + this.userId + '/' + identificadorNotificacion+'/');
        this._loadFirebaseNotifications();        
        
    }

    _loadFirebaseNotifications(){
        //acceder a la información
        this.refOrders.on('value', snapshot => {
            let notificaciones = [];
            snapshot.forEach(row => {
                notificaciones.push({
                    id:row.key,
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

        return (

            <View /*style={styles.item}*/ style={styles.container}> 
                <View style={{flexGrow: 1}}>
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

    render(){
        const { loaded, notificaciones } = this.state;
        // console.log("entra render")
        // console.log("identificadorNotificacion: " + this.state.idNotificacion);
        return(
            <BackgroundImage style={{flex:1, width: null, height:null, backgroundColor: 'rgba(200, 38, 74, 0.3)'}}>
                <ScrollView>
                    <Text> {this.renderPedidos()}</Text>
                 
                </ScrollView>
            </BackgroundImage>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        // marginTop:10,
         padding: 10,
         fontSize: 16,
         // height: 50,
         fontWeight: 'bold'
       },
       quantity: {
        // marginTop:10,
         padding: 10,
         fontSize: 25,
         // height: 50,
        //  left:'20%',
        //  alignItems: "stretch",
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
        flex:1,
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

      container:{
        backgroundColor: 'rgba(231, 228, 224, 0.8)',
        flex: 1,
        // marginLeft: 10,
        // marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center",
        flexDirection: 'row'
    },
});