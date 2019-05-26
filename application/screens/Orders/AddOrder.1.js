import React, {Component} from 'react';
import BackgroundImage from "../../components/BackgroundImage";
import AppButton from "../../components/AppButton";
import {View, StyleSheet,ScrollView,FlatList, Text, Alert, Rating,Image} from 'react-native';
import * as firebase from 'firebase';
import Slider from "react-native-slider";
import cafe_gran_bouquet from "../../../assets/images/cafe_gran_bouquet.png";
import cafe_natural_supremo from "../../../assets/images/cafe_natural_supremo.png";
import sm_alta_gama from "../../../assets/images/sm_alta-gama.png";
import sm_alta_gama_marron from "../../../assets/images/sm_alta-gama-marron.png";
import sm_gama_descafeinado from "../../../assets/images/sm_gama-descafeinado.png";
import sm_guor from "../../../assets/images/sm_guor.png";
import sm_guor_verde_oscuro from "../../../assets/images/sm_guor-verde-oscuro.png";
import cafedescafeinado from "../../../assets/images/cafedescafeinado.png";
import sm_sin_titulo_1001440010 from "../../../assets/images/sm_sin-titulo-1001440010.jpeg";
import sm_sin_titulo_1001340020 from "../../../assets/images/sm_sin-titulo-1001340020.png";
import sm_sin_titulo_1000940060 from "../../../assets/images/sm_sin-titulo-1000940060.png";
import sm_sin_titulo_1001040050 from "../../../assets/images/sm_sin-titulo-1001040050.png";
import sm_te_verde_gunpower from "../../../assets/images/sm_te-verde-gunpower.png";
import sm_sin_titulo_1001240030 from "../../../assets/images/sm_sin-titulo-1001240030.png";
import sm_sin_titulo_1000540100 from "../../../assets/images/sm_sin-titulo-1000540100.png";
import sm_sin_titulo_1000040150 from "../../../assets/images/sm_sin-titulo-1000040150.png";
import sm_sin_titulo_1000340120 from "../../../assets/images/sm_sin-titulo-1000340120.png"; 
import sm_sin_titulo_1000240130 from "../../../assets/images/sm_sin-titulo-1000240130.png";
import sm_sin_titulo_1000740080 from "../../../assets/images/sm_sin-titulo-1000740080.png";
import sm_sin_titulo_1000640090 from "../../../assets/images/sm_sin-titulo-1000640090.png";
import sm_sin_titulo_1000440110 from "../../../assets/images/sm_sin-titulo-1000440110.png";
import sm_sin_titulo_1000140140 from "../../../assets/images/sm_sin-titulo-1000140140.png"; 
import sm_sin_titulo_1000840070 from "../../../assets/images/sm_sin-titulo-1000840070.png";
import sm_azucares_y_endulzantes from "../../../assets/images/sm_azucares-y-endulzantes.png";
import sm_smcon_leche_1 from "../../../assets/images/sm_smcon-leche-1.png";
import sm_smluna_azul from "../../../assets/images/sm_smluna-azul.png";
import sm_smextra_negro from "../../../assets/images/sm_smextra-negro.png";
import sm_smcon_leche from "../../../assets/images/sm_smcon-leche.png";       
import sm_smchili from "../../../assets/images/sm_smchili.png";          
import sm_smfresa from "../../../assets/images/sm_smfresa.png";
import sm_smcoco_1 from "../../../assets/images/sm_smcoco-1.png";
import sm_smmenta from "../../../assets/images/sm_smmenta.png";
import sm_smnaranja from "../../../assets/images/sm_smnaranja.png";
import sm_smlight from "../../../assets/images/sm_smlight.png";
import sm_chocolate_laplata_kilo from "../../../assets/images/sm_chocolate-laplata-kilo.png";
import sm_cocolate_taza_la_plata from "../../../assets/images/sm_cocolate-taza-la-plata.png";
import sm_chocolates from "../../../assets/images/sm_chocolates.png";
import sm_besochocolatetostadero from "../../../assets/images/sm_besochocolatetostadero.png";
import sm_galletachocolate from "../../../assets/images/sm_galletachocolate.png";
import sm_galletacaramelo from "../../../assets/images/sm_galletacaramelo.png";
import sm_galletavainilla from "../../../assets/images/sm_galletavainilla.png";
import sm_expositores from "../../../assets/images/sm_expositores.png";        
import sm_cartas from "../../../assets/images/sm_cartas.png";
import sm_cuadros from "../../../assets/images/sm_cuadros.png";
import sm_pizarras from "../../../assets/images/sm_pizarras.png";

// import {options, Pedido} from '../../forms/pedido';
import t from 'tcomb-form-native';
import {Card} from "react-native-elements"; //crear tarjeta formulario
// const Form = t.form.Form;

export default class AddOrder1 extends Component{
    constructor(props){
        super(props);
        this.state = {
            pedido:{
                name:'',
                type:'',
                quantity: 0,
                description: '',


                FlatListItems: [
                    {id: 'CAFÉ GRAN BOUQUET', image:cafe_gran_bouquet, cant:0},
                    {id: 'CAFÉ NATURAL SUPREMO', image:cafe_natural_supremo, cant:0}/*,
                    {key: 'CAFÉ ESPECIAL SUPREMO', image:sm_alta_gama, cant:0},
                    {key: 'CAFÉ SUPERIOR SELECTO', image:sm_alta_gama_marron, cant:0},
                    {key: 'CAFÉ DESCAFEINADO SELECTO', image:sm_gama_descafeinado, cant:0},
                    {key: 'CAFÉ GUOR NATURAL', image:sm_guor, cant:0},
                    {key: 'CAFÉ GUOR DESCAFEINADO',image:sm_guor_verde_oscuro, cant:0},
                    {key: 'CAFÉ DESCAFEINADO SOLUBLE',image:cafedescafeinado, cant:0},
                    {key: 'TÉ NEGRO CANELA',image:sm_sin_titulo_1001440010, cant:0},
                    {key: 'TÉ ROJO PU-ERH',image:sm_sin_titulo_1001340020, cant:0},
                    {key: 'TÉ VERDE FRESAS CON NATA',image:sm_sin_titulo_1000940060, cant:0},
                    {key: 'TÉ VERDE CON MENTA',image:sm_sin_titulo_1001040050, cant:0},
                    {key: 'TÉ VERDE GUNPOWDER',image:sm_te_verde_gunpower, cant:0},
                    {key: 'TÉ ROJO SILUETA',image:sm_sin_titulo_1001240030, cant:0},
                    {key: 'TÉ SECRETOS DE LA INDIA',image:sm_sin_titulo_1000540100, cant:0},
                    {key: 'TÉ ROOIBOS LIMÓN',image:sm_sin_titulo_1000040150, cant:0},
                    {key: 'TÉ FRUTAS CANNABIS',image:sm_sin_titulo_1000340120, cant:0},
                    {key: 'TÉ FRUTAS DEL BOSQUE',image:sm_sin_titulo_1000240130, cant:0},
                    {key: 'INFUSIÓN MANZANILLA',image:sm_sin_titulo_1000740080, cant:0},
                    {key: 'INFUSIÓN MENTA POLEO',image:sm_sin_titulo_1000640090, cant:0},
                    {key: 'INFUSIÓN SUEÑOS TROPICALES',image:sm_sin_titulo_1000440110, cant:0},
                    {key: 'INFUSIÓN RELAX',image:sm_sin_titulo_1000140140, cant:0},
                    {key: 'TÉ AZUL',image:sm_sin_titulo_1000840070, cant:0},      
                    {key: 'AZÚCARES Y ENDULZANTES',image:sm_azucares_y_endulzantes, cant:0},                
                    {key: 'CHOCOLATE PREMIUM BLANCO',image:sm_smcon_leche_1, cant:0},       
                    {key: 'CHOCOLATE PREMIUM BLUE MOON',image:sm_smluna_azul, cant:0},                  
                    {key: 'CHOCOLATE PREMIUM EXTRA NEGRO',image:sm_smextra_negro, cant:0},                  
                    {key: 'CHOCOLATE PREMIUM CON LECHE',image:sm_smcon_leche, cant:0},                  
                    {key: 'CHOCOLATE PREMIUM CON CHILI',image:sm_smchili, cant:0},                  
                    {key: 'CHOCOLATE PREMIUM FRESA',image:sm_smfresa, cant:0},                                    
                    {key: 'CHOCOLATE PREMIUM COCO',image:sm_smcoco_1, cant:0},                  
                    {key: 'CHOCOLATE PREMIUM MENTA',image:sm_smmenta, cant:0},                  
                    {key: 'CHOCOLATE PREMIUM NARANJA',image:sm_smnaranja, cant:0},                  
                    {key: 'CHOCOLATE PREMIUM LIGHT',image:sm_smlight, cant:0},                  
                    {key: 'CHOCOLATE',image:sm_chocolate_laplata_kilo, cant:0},                  
                    {key: 'CHOCOLATE A LA TAZA',image:sm_cocolate_taza_la_plata, cant:0},                  
                    {key: 'CHOCOLATINAS',image:sm_chocolates, cant:0},                  
                    {key: 'BESO DE CHOCOLATE',image:sm_besochocolatetostadero, cant:0},                  
                    {key: 'GALLETA CHOCOLATE',image:sm_galletachocolate, cant:0},                  
                    {key: 'GALLETA CARAMELO',image:sm_galletacaramelo, cant:0},                  
                    {key: 'GALLETA VAINILLA',image:sm_galletavainilla, cant:0},                  
                    {key: 'EXPOSITORES SOPORTE',image:sm_expositores, cant:0},                  
                    {key: 'CARTAS SOPORTE',image:sm_cartas, cant:0},                  
                    {key: 'CUADROS SOPORTE',image:sm_cuadros, cant:0},                  
                    {key: 'PIZARRAS SOPORTE',image:sm_pizarras, cant:0}*/
                ]
            
            }
        }
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
    getVal(val){
        console.warn(val);
        }     
    /*
    getVal(val,index){
        console.log("index: " + index);
        cantidadPrueba = this.state.pedido.FlatListItems[index].cant;
        console.log("prueba: " + cantidadPrueba);
        console.log(val);
        this.setState({cant:val});
        this.state.pedido.FlatListItems[index].cant=val;
        console.log(this.state.pedido.FlatListItems[index].cant);

       
        
    }  
*/    
getImage(name){
    var image = '';
    //alert('ITEM: ' + name);
    switch (name){
        case 'cafe_gran_bouquet':
            image = cafe_gran_bouquet;
            break;
        case 'cafe_natural_supremo':
            image = cafe_natural_supremo;
            break;
        default:
            image = cafe_gran_bouquet; 
    }
    return image;
}
setStateant(val, index){
    this.setState({cant:val});
    this.state.pedido.FlatListItems[index].cant=val;
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
                        keyExtractor={(data) => data.id}
                        
                        ItemSeparatorComponent = {this.FlatListItemSeparator}
                        extraData={this.state}
                        renderItem={({item,index}) =><View style={styles.container}>
                            <Text style={styles.item} onPress={this.GetItem.bind(this, item.id)} ><Image width={80} height={80} style={{width: 80, height: 80}} source={this.getImage(item.image)}/>{item.id}</Text>
                            <Slider style={{width: '70%', flex:1, left:90}}
                                maximumValue={100}
                                minimumValue={0}
                                step={1}
                                value={item.cant}
                                // onValueChange={val => this.setState({ cant: val })}
                                //onSlidingComplete={ val => this.getVal(val,index)} 
                                //Pegado de internet
                                value={item.cant}
                                // this.setState({cant:val});
                                //this.state.pedido.FlatListItems[index].cant=val;
                                onValueChange={val => this.setStateant(val,index)}
                                //onSlidingComplete={ val => this.getVal(val)}   
                            />
                            
                            <Text> Cantidad: {this.state.pedido.FlatListItems[index].cant}</Text>
                            </View>
                        }
                    
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