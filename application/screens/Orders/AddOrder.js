import React, {Component} from 'react';
import BackgroundImage from "../../components/BackgroundImage";
import AppButton from "../../components/AppButton";
import {View, StyleSheet,ScrollView,FlatList} from 'react-native';
import * as firebase from 'firebase';
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
                    {key: 'One'},
                    {key: 'Two'},
                    {key: 'Three'},
                    {key: 'Four'},
                    {key: 'Five'},
                    {key: 'Six'},
                    {key: 'Seven'},
                    {key: 'Eight'},
                    {key: 'Nine'},
                    {key: 'Ten'},
                    {key: 'Eleven'},
                    {key: 'Twelve'}
                  ]
            }
        };
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
       
                    data={ this.state.FlatListItems }
                    
                    ItemSeparatorComponent = {this.FlatListItemSeparator}

                    renderItem={({item}) => <Text style={styles.item} onPress={this.GetItem.bind(this, item.key)} > {item.key} </Text>}
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
        padding: 10
    }

});