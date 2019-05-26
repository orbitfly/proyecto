import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {StyleSheet,ScrollView,FlatList, Text, View, Image, Alert, TouchableOpacity} from "react-native";
import BackgroundImage from "../../components/BackgroundImage";
import * as firebase from 'firebase';

import cafe_gran_bouquet from "../../../assets/images/cafe_gran_bouquet.png";
import cafe_natural_supremo from "../../../assets/images/cafe_natural_supremo.png";

export default class OrderDetail extends Component{
    constructor(props){
        super(props);       //acceder a la navegacion
        const {params} = props.navigation.state;
        this.userId = firebase.auth().currentUser.uid;
        this.state = {
            idPedido:params.pedido.id,
            orderLines:[],
            loaded: false,
        };
    }

    getImage(name){
        var image = '';
        switch (name){
            case 'cafe_gran_bouquet':
                image = cafe_gran_bouquet;
                break;
            case 'cafe_natural_supremo':
                image = cafe_natural_supremo;
                break;
            default:
                image = null; 
        }
        return image;
    }

    componentDidMount() {
      
        let identificadorPedido = this.state.idPedido;
        console.log("identificadorPedido: " + identificadorPedido);
        //referencia base datos firebase
        //console.log('id user: ' + this.userId);        
        this.refOrders = firebase.database().ref().child('order/' + this.userId + '/' + identificadorPedido+'/order_lines');
        this._loadFirebaseOrdersLines();        
        
    }

    _loadFirebaseOrdersLines(){
        //acceder a la información
        this.refOrders.on('value', snapshot => {
            let orderLines = [];
            snapshot.forEach(row => {
                orderLines.push({
                    id:row.key,
                    name:row.val().name,
                    quantity: row.val().quantity                    
                    /*img: firebase.storage().ref('products').child(row.key + '.png').getDownloadURL().then(result => {             
                        console.log(result)
                    }).catch(error =>{
                        img = '../../../assets/images/sm_pizarras.png';
                    })*/
                    
                })
            });
            //cuando el componente ha cargado 
            this.setState({
                orderLines,
                loaded: true                
            });
        })
    }

     /*getImageFromFB(item){
        firebase.storage().ref('products').child(item.img).getDownloadURL().then(result => { 
            item.img = result;
            console.log(result)
        }).catch(error =>{
            item.img = '../../../assets/images/sm_pizarras.png';
        });
     }*/


    renderPedidos(orderLine) {
        //this.getImageFromFB(orderLine);
        //let Img = require('');
        return (

            <View style={styles.item}> 
            <Image width={80} height={80} style={{width: 80, height: 80}}  source={this.getImage(orderLine.id)} />
                <Text style={styles.text} >
                    {orderLine.name}    
                </Text>
                <Text>Cantidad: {orderLine.quantity}</Text>
            </View>
           
        )
    }

    render(){
        const { loaded, orderLines } = this.state;
        console.log("entra render")
        return(
            <BackgroundImage style={{flex:1, width: null, height:null, backgroundColor: 'rgba(200, 38, 74, 0.3)'}}>
                <ScrollView>
                    <FlatList 
                            data={orderLines}
                            renderItem={(data) => this.renderPedidos(data.item)}
                            keyExtractor={(data) => data.id}
                        />
                </ScrollView>
            </BackgroundImage>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#fff'
    },

    listIconStyle: {
        marginRight: 10,
        fontSize: 15,
        color: 'rgba(255, 38, 74, 0.6)'
    },
    item: {
        padding: 0,
        backgroundColor: 'rgba(206, 206, 206, 0.6)'
    },
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
        fontWeight: 'bold'
      }
});