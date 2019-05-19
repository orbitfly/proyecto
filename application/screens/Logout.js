import React, {Component} from 'react';
import * as firebase from 'firebase';

export default class Logout extends Component{
    componentDidMount(){
        firebase.auth().signOut()
            .then(()=>{
                // alert("Has cerrado sesión correctamente!"); 
            }) 
            .catch(error => {
                alert(error.message); 
            })
        
    }

    render(){
        return null;
    }
}