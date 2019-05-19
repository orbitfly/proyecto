import React,{Component} from 'react';
import AppButton from '../AppButton';
import {StyleSheet, View} from 'react-native';


export default class OrdersAddButton extends Component{
    render(){
        const {addOrders} = this.props;        //evento que se ejecutará cuando se utilice

        return (
            <View style={styles.buttonContainer}>
                <AppButton
                    bgColor="rgba(200, 38, 74, 1)"
                    title = "Añadir un pedido"
                    action={addOrders}
                    iconName="plus"
                    iconSize={30}
                    iconColor="#fff"
                    setWidth = {true}
                />
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer:{
        position: 'absolute',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        width:'100%',
        bottom: 0,
    }
});