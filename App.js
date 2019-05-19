import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import firebaseConfig from './application/utils/firebase';
import * as firebase from 'firebase';
import PreLoader from './application/components/PreLoader';
import GuestNavigation from './application/navigations/guest';
import LoggedNavigation from './application/navigations/logged';
firebase.initializeApp(firebaseConfig);
console.disableYellowBox = true;
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      isLogged: false,
      loaded: false

    }
  }

  async componentDidMount(){
    //firebase.auth().signOut(); 
    await firebase.auth().onAuthStateChanged((user) => {
      //si el usuario está identificado
      if(user!=null){
        this.setState({
          isLogged: true,
          loaded: true
        });
      }else{
        this.setState({
          isLogged: false,
          loaded: true    //componente ha cargado
        });
      }
    })
  }

  render() {
    const {isLogged, loaded}=this.state;
    if(!loaded){
      console.log("no está cargado");
      return (<PreLoader/>);
    }

    if(isLogged){
      console.log("está logueado");
      //return (<PedidosEmpty text="No hay pedidos disponibles"/>);
      return (<LoggedNavigation />);
    }else{
      return (<GuestNavigation />);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundContainer: {
    flex:1,
    width: null,
    height: null,
    backgroundColor: '#D3033E'
    
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
});

