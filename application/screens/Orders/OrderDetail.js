import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {StyleSheet,ScrollView,FlatList, Text, View, Image, Alert, TouchableOpacity} from "react-native";
import BackgroundImage from "../../components/BackgroundImage";
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import cafe_gran_bouquet from "../../../assets/images/cafe_gran_bouquet.png";
import cafe_natural_supremo from "../../../assets/images/cafe_natural_supremo.png";
import cafe_alta_gama from "../../../assets/images/cafe_alta_gama.png";
import cafe_gama_descafeinado from "../../../assets/images/cafe_gama_descafeinado.png";
import te_rojo_puerh from "../../../assets/images/te_rojo_puerh.png";
import te_negro_canela from "../../../assets/images/te_negro_canela.jpeg";
import te_rojo_silueta from "../../../assets/images/te_rojo_silueta.png";
import te_secretos_india from "../../../assets/images/te_secretos_india.png";


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
            case 'cafe_alta_gama':
                image = cafe_alta_gama;
                break;
            case 'cafe_gama_descafeinado':
                image = cafe_gama_descafeinado;
                break;
            case 'te_rojo_puerh':
                image = te_rojo_puerh;
                break;
            case 'te_negro_canela':
                image = te_negro_canela;
                break;
            case 'te_rojo_silueta':
                image = te_rojo_silueta;
                break;
            case 'te_secretos_india':
                image = te_secretos_india;
                break;
            default:
                image = null; 
                break;
        }
        return image;
    }

    componentDidMount() {
        let identificadorPedido = this.state.idPedido;  
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
                })
            });
            //cuando el componente ha cargado 
            this.setState({
                orderLines,
                loaded: true                
            });
        })

        
    }

    renderPedidos(orderLine) {

        return (

            <View /*style={styles.item}*/ style={styles.container}> 
                <View style={{width: 110}}> 
                    <Image width={80} height={80} style={{width: 80, height: 80}}  source={this.getImage(orderLine.id)} />    
                    {/* <Text>Cantidad: {orderLine.quantity}</Text>  */}
                </View>
                <View style={{flexGrow: 1}}>
                    <Text style={styles.title} >
                        {orderLine.name}    
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.text} >
                            Cantidad       <Icon name='arrow-right' size={20}/>
                        </Text>
                        
                        <Text style={styles.quantity} >
                            {orderLine.quantity}
                        </Text>
                    </View>
                    
                       
                </View>
                
                
            </View>
           
        )
    }

    render(){
        const { loaded, orderLines } = this.state;
        // for(var i= 0; i < this.state.orderLines.length; i++){
        //     if(this.state.orderLines[i].quantity === 0){
        //         firebase.database().ref('order/' + this.userId + '/' + this.state.idPedido+'/order_lines/' + this.state.orderLines[i].id).remove()
        //     }
        // }
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