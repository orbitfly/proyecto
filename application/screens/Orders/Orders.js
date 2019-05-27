import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import PreLoader from '../../components/PreLoader';
import { StyleSheet, FlatList, View, Image , Text, ScrollView, TouchableOpacity} from 'react-native';      //Desarrollar lista para definir los items
import { ListItem, SearchBar } from 'react-native-elements';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import OrdersEmpty from '../../components/Orders/OrdersEmpty';
import OrdersAddButton from '../../components/Orders/OrdersAddButton';

import GridView from 'react-native-super-grid';

export default class Orders extends Component {
    constructor() {
        super();
        this.userId = firebase.auth().currentUser.uid;
        //estado mínimo 
        this.state = {
            pedidos: [],
            loaded: false,
            search: ''
        };
    } 

    //cuando el componente haya cargado
    componentDidMount() {
        const {search} = this.state;

        if(!search){ 
            //referencia base datos firebase
            console.log('id user: ' + this.userId);
            this.refOrders = firebase.database().ref().child('order/'+this.userId);
        }else{
             //refernecia base datos firebase
            this._filterOrders(search);
        }
        this._loadFirebaseOrders();
    }

    //metodo privado
    _loadFirebaseOrders(){
        //acceder a la información
        this.refOrders.on('value', snapshot => {
            let pedidos = [];
            snapshot.forEach(row => {
                pedidos.push({
                    id:row.key,
                    date_delivery: row.val().date_delivery,
                    date_order: row.val().date_order,
                    //type: row.val().type,               //tipo de café: descafeinado, cafeinado...
                    quantity: row.val().qty_total,
                    description: row.val().description
                })
            });
            //cuando el componente ha cargado 
            this.setState({
                pedidos,
                loaded: true,
                
            });
        })
    }

    // dar de alta nuevo pedido
    addOrders() {
        const navigateAction = NavigationActions.navigate({
            routeName: 'AddOrder'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    pedidosDetail(pedido) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'OrderDetail',
            params:{pedido}
        });
        this.props.navigation.dispatch(navigateAction);
    }




    renderPedidos(pedido) {
        return (
            //cada vez que exista un pedido muestra la información
            // <ListItem
            //     containerStyle={styles.item}
            //     titleStyle={styles.title}
            //     title={`${pedido.name}`}
            //     // leftAvatar={{source: this.state.pedido_logo}}  
            //     //onPress={() => this.pedidosDetail(pedido)}
            //     rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
            // />
            // <View style={styles.item} onPress={this.pedidosDetail.bind(pedido)}>
            <TouchableOpacity style={styles.item} onPress={() => this.pedidosDetail(pedido)}> 
                <Text style={styles.text} >
                    {pedido.id}    
                </Text>
                <Text>Cantidad total: {pedido.quantity}</Text>
                <Text>Fecha creación: {pedido.date_order}  </Text>
                <Text>Fecha entregado: {pedido.date_delivery} </Text>
                 
            {/* </View> */}
            </TouchableOpacity>
        )

    }

    //pasamos la búsqueda primera letra del estado en mayúscula y el resto en minúscula
    searchPedidos(search) {
        this.setState({
            search: search.charAt(0).toUpperCase() + search.slice(1)
        });

        //búsqueda para optimizar
        if(search.length >= 3){
            this._filterOrders(search);
            //llamamos al loadFirebasePedidos una vez haya pasado 1 segundo
            setTimeout(() => {
                this._loadFirebaseOrders();
            },1000); 
        }
    }

    resetSearch(){
        this.setState({
            search: ''
        });
        this.refOrders = firebase.database().ref().child('pedidos');
        setTimeout(() => {
            this._loadFirebaseOrders();
        },1000); //carga los datos
    }

    _filterOrders(search){
        // var ref = firebase.database().ref("pedidos");
        // ref.orderByKey().on("child_added", function(snapshot) {
        // console.log(snapshot.key);
        // });
        this.refOrders = firebase.database().ref().child('pedidos')
            .orderByKey()   //ordenar por el nombre del pedido
            .startAt(search)        //empiece por search
            .endAt(`${search}\uf8ff`);          //finalice por todo lo que empieza la búsqueda
    }

    render(){
        const { loaded, pedidos } = this.state;
        const pedidosReverse = pedidos.reverse();
        if (!loaded) {
            console.log("No está loaded");
            return <PreLoader />;
        }

        const searchBar = (
            <SearchBar
                    platform="android"
                    showLoading
                    cancelIcon = {{type: 'font-awesome', name: 'chevron-left'}}
                    placeholder = 'Busca algún pedido'
                    onChangeText = {(text) => this.searchPedidos(text)}
                    onClear = {this.resetSearch.bind(this)}
                    value= {this.state.search}
                />
        );
        if (!pedidosReverse.length) {
            return (
                <BackgroundImage style={{flex:1, width: null, height:null, backgroundColor: 'rgba(200, 38, 74, 0.3)'}}>
                    {searchBar}
                    <OrdersEmpty text="No existen pedidos"/>
                    <OrdersAddButton addOrders={this.addOrders.bind(this)} />
                </BackgroundImage>  
            );
        }

        
        return (
            
                <BackgroundImage style={styles.backgroundContainer}>
                    <ScrollView>
                    {/* {searchBar} */}

                    <FlatList 
                        data={pedidosReverse}
                        renderItem={(data) => this.renderPedidos(data.item)}
                        keyExtractor={(data) => data.id}
                    />
                    
                    {/* <FlatList 
                        data={pedidos}
                        // numColumns={3}
                        keyExtractor={(data) => data.id}
                        renderItem={({ data }) => { this.renderPedidos(data.item)
                            console.log("La id del pedido es "+ data.id)
                        //     return(
                        //     <View style={styles.item}>
                        //         <Text style={styles.text}>
                        //             {item.id}       Línea de pedido: 5   
                        //         </Text>
                        //         <Text>Fecha realizado: 15/05/19    Fecha creación: 13/05/19</Text>
                        //     </View>
                        // );
                        }}
                    /> */}
                    </ScrollView>
                    <OrdersAddButton addOrders={this.addOrders.bind(this)} />
                </BackgroundImage>
                
            
            
        );

        
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
    
    backgroundContainer: {
        flex:1,
        width: null,
        height: null,
        // backgroundColor: '#D3033E'
        backgroundColor: 'rgba(200, 38, 74, 0.8)',
        
        
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