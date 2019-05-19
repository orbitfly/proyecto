/*Created by noelia */
import React, {Component} from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';

export default class AppButton extends Component{
    render(){
        const {action, iconName, iconColor, title, bgColor, setWidth} = this.props; //los añadimos de manera dinámica para que pueda ser reutilizado en el resto de la aplicacion
        const {width} = setWidth ? Dimensions.get('window') : {};   //ocupa el 100% de la pantalla
        return (
            
            <Button
                onPress={action}
                buttonStyle={{
                    backgroundColor: bgColor,
                    height: 45,
                    borderColor:"transparent",
                    borderWidth: 0,
                    borderRadius: 5,
                    marginBottom: 5,
                    width: width,//'100%', funciona bien
                    alignContent:'center',
                    alignItems:'center',
                    //marginHorizontal: 125
                    
                }}
                title= {title}
                //icono representado en el botón style={{ marginLeft: 10 }}
                icon={
                    <Icon style={{ marginLeft: 10 }}
                        name={iconName}
                        size={18}
                        color={iconColor}
                     
                    />
                }
                text={title}
                iconRight={true}    //icono se muestre a la derecha del botón
            >

            </Button>
        );
    }
}