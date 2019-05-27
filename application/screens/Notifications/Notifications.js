import React, { Component } from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import PreLoader from '../../components/PreLoader';
import { StyleSheet, FlatList, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';      //Desarrollar lista para definir los items
import { ListItem, SearchBar } from 'react-native-elements';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import NotificationsEmpty from '../../components/Notifications/NotificationsEmpty';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Notifications extends Component {
    constructor() {
        super();
        this.userId = firebase.auth().currentUser.uid;
        //estado mínimo 
        this.state = {
            notificaciones: [],
            loaded: false,
            search: ''
        };
    }

    //cuando el componente haya cargado
    componentDidMount() {
        const { search } = this.state;

        if (!search) {
            //referencia base datos firebase
            console.log('id user: ' + this.userId);
            this.refOrders = firebase.database().ref().child('notifications/' + this.userId);
        } else {
            //refernecia base datos firebase
            this._filterNotifications(search);
        }
        this._loadFirebaseNotifications();
    }

    //metodo privado
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
                loaded: true,

            });
        })
    }



    // notificacionesDetail(notificacion) {
    //     const navigateAction = NavigationActions.navigate({
    //         routeName: 'Detailnotificacion',
    //         params:{notificacion}
    //     });
    //     this.props.navigation.dispatch(navigateAction);
    // }
    notificacionesDetail(notificacion) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'NotificationDetail',
            params: { notificacion }
        });
        this.props.navigation.dispatch(navigateAction);
    }




    renderNotificaciones(notificacion) {
        console.log("Notificación: " + notificacion.id)
        if (!notificacion.read) {
            console.log("READ: " + notificacion.read)
            return (
                //cada vez que exista un notificacion muestra la información
                // <ListItem
                //     containerStyle={styles.item}
                //     titleStyle={styles.title}
                //     title={`${notificacion.name}`}
                //     // leftAvatar={{source: this.state.notificacion_logo}}  
                //     //onPress={() => this.notificacionesDetail(notificacion)}
                //     rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
                // />
                // <View style={styles.item} onPress={this.notificacionesDetail.bind(notificacion)}>

                <TouchableOpacity style={styles.itemViewed} onPress={() => this.notificacionesDetail(notificacion)}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: 30, paddingTop:5, paddingBottom:5}}> 
                            <Icon name='bookmark' size={20}/>
                        </View>
                        <View style={{flexGrow: 1}}>
                            <Text style={styles.text} >
                                {notificacion.id}: 
                            </Text>
                            <Text style={{color:'#333333'}}>
                                {notificacion.title}
                            </Text>
                        </View>
                        
                        <View style={{width: 115}}> 
                            <Text style={styles.text}> {notificacion.date} </Text>
                        </View>
                        
                    </View>

                    {/* </View> */}
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.itemViewed} onPress={() => this.notificacionesDetail(notificacion)}>
                    <View style={{flexDirection: 'row'}}>
                         <View style={{width: 30, paddingTop:5, paddingBottom:5}}> 
                            <Icon name='bookmark-o' size={20}/>
                        </View>
                        <View style={{flexGrow: 1}}>
                            <Text style={styles.textViewed} >
                                {notificacion.id}: 
                            </Text>
                            <Text style={styles.textViewed}>
                                {notificacion.title}
                            </Text>
                        </View>
                        
                        <View style={{width: 115}}> 
                            <Text style={styles.textViewed}> {notificacion.date} </Text>
                        </View>
                        
                    </View>

                    {/* </View> */}
                </TouchableOpacity>
            );
        }

    }

    //pasamos la búsqueda primera letra del estado en mayúscula y el resto en minúscula
    searchNotificaciones(search) {
        this.setState({
            search: search.charAt(0).toUpperCase() + search.slice(1)
        });

        //búsqueda para optimizar
        if (search.length >= 3) {
            this._filterNotifications(search);
            //llamamos al loadFirebasenotificaciones una vez haya pasado 1 segundo
            setTimeout(() => {
                this._loadNotifications();
            }, 1000);
        }
    }

    resetSearch() {
        this.setState({
            search: ''
        });
        this.refOrders = firebase.database().ref().child('notificaciones');
        setTimeout(() => {
            this._loadNotifications();
        }, 1000); //carga los datos
    }

    _filterNotifications(search) {
        // var ref = firebase.database().ref("notificaciones");
        // ref.orderByKey().on("child_added", function(snapshot) {
        // console.log(snapshot.key);
        // });
        // this.refOrders = firebase.database().ref().child('notificaciones')
        //     .orderByKey()   //ordenar por el nombre del notificacion
        //     .startAt(search)        //empiece por search
        //     .endAt(`${search}\uf8ff`);          //finalice por todo lo que empieza la búsqueda
    }

    render() {
        const { loaded, notificaciones } = this.state;
        const notificacionesReverse = notificaciones.reverse();
        if (!loaded) {
            console.log("No está loaded");
            console.log("se queda en el preloader de notificaciones")
            return <PreLoader />;
        }

        const searchBar = (
            <SearchBar
                platform="android"
                showLoading
                cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                placeholder='Busca algún notificacion'
                onChangeText={(text) => this.searchNotificaciones(text)}
                onClear={this.resetSearch.bind(this)}
                value={this.state.search}
            />
        );
        if (!notificacionesReverse.length) {
            return (
                <BackgroundImage style={{ flex: 1, width: null, height: null, backgroundColor: 'rgba(200, 38, 74, 0.3)' }}>
                    {searchBar}
                    <NotificationsEmpty text="No hay notificaciones" />
                </BackgroundImage>
            );
        }


        return (

            <BackgroundImage style={styles.backgroundContainer}>
                <ScrollView>
                    {/* {searchBar} */}

                    <FlatList
                        data={notificacionesReverse}
                        renderItem={(data) => this.renderNotificaciones(data.item)}
                        keyExtractor={(data) => data.id}
                    />
                    {/* <FlatList 
                        data={notificaciones}
                        // numColumns={3}
                        keyExtractor={(data) => data.id}
                        renderItem={({ data }) => { this.renderNotificaciones(data.item)
                            console.log("La id del notificacion es "+ data.id)
                        //     return(
                        //     <View style={styles.item}>
                        //         <Text style={styles.text}>
                        //             {item.id}       Línea de notificacion: 5   
                        //         </Text>
                        //         <Text>Fecha realizado: 15/05/19    Fecha creación: 13/05/19</Text>
                        //     </View>
                        // );
                        }}
                    /> */}
                </ScrollView>

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
    item: {
        padding: 0,
        backgroundColor: 'rgba(206, 206, 206, 0.6)'
    },
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

    itemViewed: {
        alignItems: "flex-start",
        backgroundColor: 'rgba(206, 206, 206, 1)',
        flexGrow: 1,
        margin: 1,
        padding: 15,
        flexBasis: 0,
    },
    text: {
        color: "#333333",
        fontWeight: 'bold'
    },
    textViewed: {
        color: "gray",

    }, 
    textAlign: {
        textAlign: 'right', 
        alignSelf: 'stretch'
    }
});