import React, {Component} from 'react';
import BackgroundImage from "../../components/BackgroundImage";
import AppButton from "../../components/AppButton";
import {View, StyleSheet,ScrollView,FlatList, Text, Alert, Rating,Image} from 'react-native';
import * as firebase from 'firebase';
import Slider from "react-native-slider";
// import {options, Pedido} from '../../forms/pedido';
import t from 'tcomb-form-native';
import {Card} from "react-native-elements"; //crear tarjeta formulario
// const Form = t.form.Form;

export default class AddOrder extends Component{
    constructor(props){
        super(props);
        this.state = {
            pedido:{
                name:'',
                type:'',
                quantity: 0,
                description: '',


                FlatListItems: [
                    {key: 'CAFÉ GRAN BOUQUET', image:require("../../../assets/images/sm_gran-bouquet.png")},
                    {key: 'CAFÉ NATURAL SUPREMO', image:require("../../../assets/images/sm_alta-gama-naranja.png")},
                    {key: 'CAFÉ ESPECIAL SUPREMO', image:require("../../../assets/images/sm_alta-gama.png")},
                    {key: 'CAFÉ SUPERIOR SELECTO', image:require("../../../assets/images/sm_alta-gama-marron.png")},
                    {key: 'CAFÉ DESCAFEINADO SELECTO', image:require("../../../assets/images/sm_gama-descafeinado.png")},
                    {key: 'CAFÉ GUOR NATURAL', image:require("../../../assets/images/sm_guor.png")},
                    {key: 'CAFÉ GUOR DESCAFEINADO',image:require("../../../assets/images/sm_guor-verde-oscuro.png")},
                    {key: 'CAFÉ DESCAFEINADO SOLUBLE',image:require("../../../assets/images/cafedescafeinado.png")},
                    {key: 'TÉ NEGRO CANELA',image:require("../../../assets/images/sm_sin-titulo-1001440010.jpeg")},
                    {key: 'TÉ ROJO PU-ERH',image:require("../../../assets/images/sm_sin-titulo-1001340020.png")},
                    {key: 'TÉ VERDE FRESAS CON NATA',image:require("../../../assets/images/sm_sin-titulo-1000940060.png")},
                    {key: 'TÉ VERDE CON MENTA',image:require("../../../assets/images/sm_sin-titulo-1001040050.png")},
                    {key: 'TÉ VERDE GUNPOWDER',image:require("../../../assets/images/sm_te-verde-gunpower.png")},
                    {key: 'TÉ ROJO SILUETA',image:require("../../../assets/images/sm_sin-titulo-1001240030.png")},
                    {key: 'TÉ SECRETOS DE LA INDIA',image:require("../../../assets/images/sm_sin-titulo-1000540100.png")},
                    {key: 'TÉ ROOIBOS LIMÓN',image:require("../../../assets/images/sm_sin-titulo-1000040150.png")},
                    {key: 'TÉ FRUTAS CANNABIS',image:require("../../../assets/images/sm_sin-titulo-1000340120.png")},
                    {key: 'TÉ FRUTAS DEL BOSQUE',image:require("../../../assets/images/sm_sin-titulo-1000240130.png")},
                    {key: 'INFUSIÓN MANZANILLA',image:require("../../../assets/images/sm_sin-titulo-1000740080.png")},
                    {key: 'INFUSIÓN MENTA POLEO',image:require("../../../assets/images/sm_sin-titulo-1000640090.png")},
                    {key: 'INFUSIÓN SUEÑOS TROPICALES',image:require("../../../assets/images/sm_sin-titulo-1000440110.png")},
                    {key: 'INFUSIÓN RELAX',image:require("../../../assets/images/sm_sin-titulo-1000140140.png")},
                    {key: 'TÉ AZUL',image:require("../../../assets/images/sm_sin-titulo-1000840070.png")},      
                    {key: 'AZÚCARES Y ENDULZANTES',image:require("../../../assets/images/sm_azucares-y-endulzantes.png")},                
                    {key: 'CHOCOLATE PREMIUM BLANCO',image:require("../../../assets/images/sm_smcon-leche-1.png")},       
                    {key: 'CHOCOLATE PREMIUM BLUE MOON',image:require("../../../assets/images/sm_smluna-azul.png")},                  
                    {key: 'CHOCOLATE PREMIUM EXTRA NEGRO',image:require("../../../assets/images/sm_smextra-negro.png")},                  
                    {key: 'CHOCOLATE PREMIUM CON LECHE',image:require("../../../assets/images/sm_smcon-leche.png")},                  
                    {key: 'CHOCOLATE PREMIUM CON CHILI',image:require("../../../assets/images/sm_smchili.png")},                  
                    {key: 'CHOCOLATE PREMIUM FRESA',image:require("../../../assets/images/sm_smfresa.png")},                                    
                    {key: 'CHOCOLATE PREMIUM COCO',image:require("../../../assets/images/sm_smcoco-1.png")},                  
                    {key: 'CHOCOLATE PREMIUM MENTA',image:require("../../../assets/images/sm_smmenta.png")},                  
                    {key: 'CHOCOLATE PREMIUM NARANJA',image:require("../../../assets/images/sm_smnaranja.png")},                  
                    {key: 'CHOCOLATE PREMIUM LIGHT',image:require("../../../assets/images/sm_smlight.png")},                  
                    {key: 'CHOCOLATE',image:require("../../../assets/images/sm_chocolate-laplata-kilo.png")},                  
                    {key: 'CHOCOLATE A LA TAZA',image:require("../../../assets/images/sm_cocolate-taza-la-plata.png")},                  
                    {key: 'CHOCOLATINAS',image:require("../../../assets/images/sm_chocolates.png")},                  
                    {key: 'BESO DE CHOCOLATE',image:require("../../../assets/images/sm_besochocolatetostadero.png")},                  
                    {key: 'GALLETA CHOCOLATE',image:require("../../../assets/images/sm_galletachocolate.png")},                  
                    {key: 'GALLETA CARAMELO',image:require("../../../assets/images/sm_galletacaramelo.png")},                  
                    {key: 'GALLETA VAINILLA',image:require("../../../assets/images/sm_galletavainilla.png")},                  
                    {key: 'EXPOSITORES SOPORTE',image:require("../../../assets/images/sm_expositores.png")},                  
                    {key: 'CARTAS SOPORTE',image:require("../../../assets/images/sm_cartas.png")},                  
                    {key: 'CUADROS SOPORTE',image:require("../../../assets/images/sm_cuadros.png")},                  
                    {key: 'PIZARRAS SOPORTE',image:require("../../../assets/images/sm_pizarras.png")}
                ]
            
            },
            value: 0
        }
    }
        FlatListItemSeparator = () => {
            const {rating} = this.state;
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
    
    GetItem (item) {

    Alert.alert(item);
    
    }
    save(){
        const validate = this.refs.form.getValue();
        if(validate){
            let data = {};
            const key = firebase.database().ref().child('pedidos').push().key;
            data[`pedidos/${key}`] = this.state.pedido;     
            //guardamos los datos
            firebase.database().ref().update(data).then(()=>{
               this.props.navigation.navigate('ListOrders'); 
            });
        }
    }

    onChange(pedido){
        this.setState({pedido});
    }

    render(){
        const {pedido} = this.state;
        
        return(
            <BackgroundImage style={{flex:1, width: null, height:null, backgroundColor: 'rgba(200, 38, 74, 0.3)'}}>
                <ScrollView>
                {/* <FlatList 
                        data={pedidos}
                        // numColumns={3}
                        keyExtractor={(data) => data.id}
                        renderItem={({ item }) => {
                            return(
                            <View style={styles.item}>
                                <Text style={styles.text}>
                                    {item.id}       Línea de pedido: 5   
                                </Text>
                                <Text>Fecha realizado: 15/05/19    Fecha creación: 13/05/19</Text>
                            </View>
                        );
                        }}
                    /> */}
                    <FlatList
                    data={ this.state.pedido.FlatListItems } 
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    renderItem={({item}) =><View style={styles.container}>
                    <Text style={styles.item} onPress={this.GetItem.bind(this, item.key)} ><Image style={{width: 80, height: 80}} source={item.image}/>{item.key}</Text>
                    <Slider style={{width: '70%', flex:1, left:90}}
                    maximumValue={100}
                    minimumValue={0}
                    value={this.state.value}
                    step={0}
                            value={this.state.value}
                            onValueChange={value => this.setState({ value })}
                            
                            />
                    <Text>Cantidad: {this.state.value}</Text>
                    </View>}
                    />
                   
                </ScrollView>
                <AppButton
                                bgColor="rgba(255, 38, 74, 0.9)"
                                title="Confirmar pedido"
                                action={this.save.bind(this)}
                                iconName="plus"
                                iconSize={30}
                                iconColor="#fff"
                            />
            </BackgroundImage>
        )
    }          
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(231, 228, 224, 0.8)',
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center"
    },
    
 
item: {
   
    marginTop:15,
    padding: 10,
    fontSize: 16,
    height: 50,
  },
  logo: {
  //  width: '70%',
    height: '45%',
    marginTop: 20
    
  },

});