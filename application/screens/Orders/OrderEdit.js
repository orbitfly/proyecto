import React, { Component } from 'react';
import BackgroundImage from "../../components/BackgroundImage";
import AppButton from "../../components/AppButton";
import { View, StyleSheet, ScrollView, FlatList, Text, Alert, Rating, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import Slider from "react-native-slider";
import cafe_gran_bouquet from "../../../assets/images/cafe_gran_bouquet.png";
import cafe_natural_supremo from "../../../assets/images/cafe_natural_supremo.png";
import cafe_alta_gama from "../../../assets/images/cafe_alta_gama.png";
import cafe_gama_descafeinado from "../../../assets/images/cafe_gama_descafeinado.png";
import te_negro_canela from "../../../assets/images/te_negro_canela.jpeg";
import te_rojo_puerh from "../../../assets/images/te_rojo_puerh.png";
import te_rojo_silueta from "../../../assets/images/te_rojo_silueta.png";
import te_secretos_india from "../../../assets/images/te_secretos_india.png";

export default class AddOrder1 extends Component {
    constructor(props) {
        super(props);       //acceder a la navegacion
        const { params } = props.navigation.state;
        this.userId = firebase.auth().currentUser.uid;
        this.state = {
            idPedido: params.pedido,
            orderLines: [],
            orders: [],
            loaded: false,
            FlatListItems: [
                { id: 'CAFÉ GRAN BOUQUET', image: 'cafe_gran_bouquet', cant: 0 },
                { id: 'CAFÉ NATURAL SUPREMO', image: 'cafe_natural_supremo', cant: 0 },
                { id: 'CAFÉ ALTA GAMA ', image: 'cafe_alta_gama', cant: 0 },
                { id: 'CAFÉ DESCAFEINADO SELECTO', image: 'cafe_gama_descafeinado', cant: 0 },
                { id: 'TÉ ROJO PU-ERH', image: 'te_rojo_puerh', cant: 0 },
                { id: 'TÉ NEGRO CANELA', image: 'te_negro_canela', cant: 0 },
                { id: 'TÉ ROJO SILUETA', image: 'te_rojo_silueta', cant: 0 },
                { id: 'TÉ SECRETOS DE LA INDIA', image: 'te_secretos_india', cant: 0 },
            ],
            quantityTotal: 0,
            date_delivery: '',
            date_order: '',
            date_shipment: ''
        };

    }


    getImage(name) {
        var image = '';
        switch (name) {
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

        let identificadorPedido = this.state.idPedido.id;
        this.date_delivery = this.state.idPedido.delivery;
        this.date_order = this.state.idPedido.date_order;
        this.date_shipment = this.state.idPedido.date_shipment;
        this.refOrders = firebase.database().ref().child('order/' + this.userId + '/' + identificadorPedido + '/order_lines');
        this._loadFirebaseOrdersLines();

    }

    _loadFirebaseOrdersLines() {
        //acceder a la información
        let i = 0;
        this.refOrders.on('value', snapshot => {
            let orderLines = [];
            snapshot.forEach(row => {
                orderLines.push({
                    id: row.key,
                    name: row.val().name,
                    quantity: row.val().quantity
                })
                for (var j = 0; j < this.state.FlatListItems.length; j++) {
                    if ((orderLines[i].id) === this.state.FlatListItems[j].image) {
                        this.state.FlatListItems[j].cant = orderLines[i].quantity;
                    }
                }

                i++;
            });
            i = 0;
            //cuando el componente ha cargado 
            this.setState({
                orderLines,
                loaded: true
            });
        })
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }}
            />
        );
    }

    getLinesQuantity() {

        var orderLines = [];
        this.state.FlatListItems.forEach(element => {
            // console.log("Cantidad línea: " + element.cant)
            if (element.cant > 0) {
                this.state.quantityTotal += element.cant;
            }
        });
    }

    // save() {

    //     // Buscar lineas con cantidad >0 para ejecutar el guardado.
    //     //var lines = this.linesWithQuantity();
    //     // 0. Crear JSON de pedido
    //     this.getLinesQuantity();
    //     if (this.state.quantityTotal > 0) {
    //         //probando si coge el último pedido
    //         var ref = firebase.database().ref().child('order/' + this.userId)
    //         var nombrePedido = this.state.idPedido.id;

    //         // 1. guardar pedido 
    //         firebase.database().ref('order/' + this.userId + '/').child(nombrePedido).update({
    //             date_delivery: this.state.idPedido.date_delivery,
    //             date_order: this.state.idPedido.date_order,
    //             date_shipment: this.state.idPedido.date_shipment,
    //             // order_lines : null, 
    //             qty_total: this.state.quantityTotal
    //         }).then((data) => {
    //             //success callback
    //             console.log('data ', data)
    //         }).catch((error) => {
    //             //error callback
    //             console.log('error ', error)
    //             this.state.saveInProcess = false;
    //         })
    //         // 2. añadir las lineas .

    //         this.state.FlatListItems.forEach(element => {
    //             // if (element.cant > 0) {
    //             for (var i = 0; i < this.state.orderLines.length; i++) { 
    //                 if (element.image === this.state.orderLines[i].id || element.cant>0) {
    //                     firebase.database().ref('order/' + this.userId + '/' + nombrePedido + '/order_lines/').child(element.image).update({
    //                         name: element.id,
    //                         quantity: element.cant
    //                     }).then((data) => {
    //                         //success callback
    //                         this.props.navigation.navigate('ListOrder');
    //                     }).catch((error) => {
    //                         //error callback
    //                         this.state.saveInProcess = false;
    //                     })
    //                 }
    //             }
    //         });



    //     } else {
    //         this.state.saveInProcess = false;
    //     }
    // }


    save() {

        // Buscar lineas con cantidad >0 para ejecutar el guardado.
        //var lines = this.linesWithQuantity();
        // 0. Crear JSON de pedido
        this.getLinesQuantity();
        if (this.state.quantityTotal > 0) {
            //probando si coge el último pedido
            var ref = firebase.database().ref().child('order/' + this.userId)
            var nombrePedido = this.state.idPedido.id;
           
            
            // console.log("nombrePedido: " + nombrePedido)
            var currentDate = new Date();
            var fecha = String(currentDate.getDate()).padStart(2, "0") + '/' + String((currentDate.getMonth() + 1)).padStart(2, "0") + '/' + (currentDate.getFullYear()) +
                ' ' + String(currentDate.getHours()).padStart(2, "0") + ':' + String(currentDate.getMinutes()).padStart(2, "0");

            // 1. guardar pedido 
            firebase.database().ref('order/' + this.userId + '/').child(nombrePedido).update({
                date_delivery: this.state.idPedido.date_delivery,
                date_order: this.state.idPedido.date_order,
                date_shipment: this.state.idPedido.date_shipment,
                order_lines : null, 
                qty_total: this.state.quantityTotal
            }).then((data) => {
                //success callback
                // console.log('data ', data)
            }).catch((error) => {
                //error callback
                // console.log('error ', error)
                this.state.saveInProcess = false;
            })
            // 2. añadir las lineas .
            this.state.FlatListItems.forEach(element => {
                 if (element.cant > 0) {
                    firebase.database().ref('order/' + this.userId + '/' + nombrePedido + '/order_lines/').child(element.image).set({
                        name: element.id,
                        quantity: element.cant
                    }).then((data) => {
                        //success callback
                        // console.log('data_line ', data)
                        this.props.navigation.navigate('ListOrder');
 

                    }).catch((error) => {
                        //error callback
                        // console.log('error_line ', error)
                        this.state.saveInProcess = false;
                    })
                 }
            });

        } else {
            this.state.saveInProcess = false;
        }
    }

    getImageFlatList(index) {
        var name = this.state.FlatListItems[index].image;
        var image = '';

        switch (name) {
            case 'cafe_gran_bouquet':
                image = cafe_gran_bouquet;
                break;
            case 'cafe_natural_supremo':
                image = cafe_natural_supremo;
                break;
            case 'cafe_descafeinado':
                image = cafe_descafeinado;
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
    setStateant(val, index) {
        this.setState({ cant: val });
        this.state.FlatListItems[index].cant = val;
    }
    render() {
        const { pedido } = this.state;

        const { width } = Dimensions.get('window');   //ocupa el 100% de la pantalla
        return (
            <BackgroundImage style={{ flex: 1, width: null, height: null, backgroundColor: 'rgba(200, 38, 74, 0.3)' }}>
                <ScrollView>
                    <FlatList
                        data={this.state.FlatListItems}
                        keyExtractor={(data) => data.id}

                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        extraData={this.state}
                        renderItem={({ item, index }) =>
                            <View style={styles.container}>
                                <View style={{ width: 110 }}>
                                    <Image width={80} height={80} style={{ width: 80, height: 80, justifyContent: "flex-start" }} source={this.getImageFlatList(index)} />
                                    <Text> Cantidad: {this.state.FlatListItems[index].cant}</Text>
                                </View>

                                <View style={{ flexGrow: 1 }}>
                                    <Text style={styles.title}>
                                        {this.state.FlatListItems[index].id}
                                    </Text>

                                    <Slider style={{ width: '70%', flex: 1, left: 20 }}
                                        maximumValue={100}
                                        minimumValue={0}
                                        step={1}
                                        value={item.cant}
                                        onValueChange={val => this.setStateant(val, index)}
                                    //onSlidingComplete={ val => this.getVal(val)}   
                                    />
                                </View>
                            </View>
                        }
                    />

                </ScrollView>
                {/* <AppButton
                    action = {() => {

                        if (!this.state.saveInProcess) {
                            this.state.saveInProcess = true;
                            this.save();
                        } else {
                            /*Login in process, do something else
                        }}}
                    bgColor="rgba(255, 38, 74, 0.9)"
                    title="Confirmar pedido"
                    ref="btn"
                    //action={this.save.bind(this)}
                    iconName="plus"
                    iconSize={30}
                    iconColor="#fff"
                /> */}

                <Button
                    onPress={() => {

                        if (!this.state.saveInProcess) {
                            this.state.saveInProcess = true;
                            this.save();
                        } else {
                            /*Login in process, do something else*/
                        }
                    }}
                    buttonStyle={{
                        backgroundColor: "rgba(255, 38, 74, 0.9)",
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5,
                        marginBottom: 5,
                        width: width,//'100%', funciona bien
                        alignContent: 'center',
                        alignItems: 'center',
                        //marginHorizontal: 125

                    }}
                    title="Actualizar pedido"
                    //icono representado en el botón style={{ marginLeft: 10 }}
                    icon={
                        <Icon style={{ marginLeft: 10 }}
                            name={"save"}
                            size={18}
                            color="#fff"

                        />
                    }

                    iconRight={true}    //icono se muestre a la derecha del botón
                >

                </Button>




            </BackgroundImage>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(231, 228, 224, 0.8)',
        flex: 1,
        // marginLeft: 10,
        // marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center",
        flexDirection: 'row'
    },

    item: {

        marginTop: 15,
        padding: 10,
        fontSize: 16,
        height: 50,
    },
    title: {
        // marginTop:10,
        padding: 10,
        fontSize: 16,
        // height: 50,
        fontWeight: 'bold'
    },
    // item: {

    //     marginTop:15,
    //     padding: 10,
    //     fontSize: 16,
    //     height: 50,
    //   },
    logo: {
        //  width: '70%',
        height: '45%',
        marginTop: 20

    },

});