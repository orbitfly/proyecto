import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class OrdersEmpty extends Component{
    render(){
        const {text} = this.props;
        return (
            //en medio va a mostrar un texto
            <View style={styles.ordersEmptyView}>
                <Text style={styles.ordersEmptyText}>
                    {text}      
                </Text>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    ordersEmptyView:{
        justifyContent: 'center',
        flex: 1,
        marginTop: 10,
        marginBottom: 10
    },

    ordersEmptyText:{
        backgroundColor: 'gray',
        color: 'white',
        textAlign: 'center',
        padding: 20
    }
});