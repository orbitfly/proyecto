/*Created by noelia */
import React, {Component} from 'react';
import {ImageBackground} from 'react-native';  

export default class BackgroundImage extends Component{
    render(){
        const {source, style, children} = this.props; //children: todos los componentes que esten dentro del componente background son renderizados

        return(
            <ImageBackground
                source={source}
                //style={{flex:1, width: null, height:null, backgroundColor: 'rgba(200, 38, 74, 0.3)'}}
                style={style}
            >
                {children}
            </ImageBackground>
        );
    }
}