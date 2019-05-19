import React, {Component} from 'react';
import {View,StyleSheet,Button, Image,Dimensions, TouchableOpacity, Text} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import BackgroundImage from '../components/BackgroundImage';
import t from 'tcomb-form-native';
import FormValidation from '../utils/validation';
const Form = t.form.Form;
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons'
import logo from '../../assets/images/el_tostadero.png';
import Toast  from 'react-native-whc-toast';

const { width: WIDTH } = Dimensions.get('window');

export default class Login extends Component{
    constructor(){
        super();    //todo clase component
        //struct: estructura necesaria en nuestro formulario
        this.user = t.struct({
            email: FormValidation.email,
            password: FormValidation.password
            
        });
       
        this.options = {
            fields:{    //campos
                email:{
                    help: 'Introduce tu email',     //mensaje de ayuda para que el usuario sepa lo que tiene que hacer
                    error: 'Email incorrecto',      //mensaje en color rojo
                    autoCapitalize: 'none'          //email no empiece por mayúscula
                },
                password: {
                    help: 'Introduce tu contraseña',
                    error: 'Contraseña incorrecta',
                    password: true,                 //campo tipo password
                    secureTextEntry: true           //******** 
                }
            }
        };
    }
    
    state = {
        name:'',
        passwd:'',
        showPass: true,
        press: false
    }
    
    showPass = () => {
        if(this.state.press == false){
            this.setState({showPass: false, press: true})
        }else{
            this.setState({showPass: true, press: false})
        }
    }
    updateValue = (val) => {
        this.state.name = val;
    }
    updateValuePassword = (val) => {
        this.state.passwd = val;
    }

    login(){
        console.log("email: " + this.state.name + " y contraseña: " + this.state.passwd);
            console.log("succes");
            firebase.auth().signInWithEmailAndPassword(this.state.name, this.state.passwd)
            .then(()=>{
                // alert("Bienvenido!"); 
                this.refs.toast.show('BIENVENIDO!',Toast.Duration.long, Toast.Position.bottom);
            })
            .catch((error) => {
                console.log("Entra aqui");
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode === 'auth/wrong-password'){
                    // alert("Contraseña incorrecta!"); 
                    this.refs.toast.show('CONTRASEÑA INCORRECTA', Toast.Duration.long, Toast.Position.bottom);
                }else{
                    // alert(errorMessage); 
                    this.refs.toast.show(errorMessage, Toast.Duration.long, Toast.Position.bottom);
                }
            })
            //this.refs.toast.show('BIENVENIDO!',Toast.Duration.long, Toast.Position.bottom);    //poner en pedidos
    }

    render(){
        return(
            <BackgroundImage style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Image source={logo} />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name={'ios-person'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon}/>
                    <TextInput 
                        style = {styles.input}
                        placeholder={'Username'}
                        val= {this.state.name}
                        onChangeText={this.updateValue}
                        clearButtonMode='always'
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                        
                    />
                </View>


                <View style={styles.inputContainer}>
                    <Icon name={'ios-lock'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon}/>
                    <TextInput 
                        style = {styles.input}
                        placeholder={'Password'}
                        val={this.state.passwd}
                        onChangeText={this.updateValuePassword }
                        secureTextEntry={this.state.showPass}
                        
                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                    />

                    <TouchableOpacity style={styles.btnEye}
                        onPress={this.showPass.bind(this)}>
                        <Icon name={this.state.press==false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'rgba(255,255,255,0.7)'}/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btnLogin}>
                    <Text style={styles.text} onPress={this.login.bind(this)}> LOGIN</Text>
                </TouchableOpacity>
                <Toast
                    ref="toast"
                    position = {Toast.Position.bottom}
                    fadeInDuration = {300}
                    fadeOutDuration = {300}
                    dutarion = {Toast.Duration.long}
                    opacity={0.9}
                    positionValue={100}
                />
                
            </BackgroundImage>
        );
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
    logo: {
      width: '70%',
      height: '45%',
      marginTop: 20
      
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 30
    },
    logoText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
      marginTop: 10,
      opacity: 0.9
    },
    input:{
      width: WIDTH - 55,
      height: 45,
      borderRadius: 45,
      fontSize: 16,
      paddingLeft: 45,
      backgroundColor: 'rgba(0,0,0,0.1)',
      color: 'rgba(255,255,255,0.7)',
      marginHorizontal: 25,
      marginTop: 10
    },
    inputIcon: {
      position: 'absolute',
      top: 15,
      left: 37
    },
    inputContainer: {
      marginTop: 10
    },
    btnEye: {
      position: 'absolute',
      top: 15,
      right: 37
    },
    btnLogin: {
      width: WIDTH - 250,
      height: 45,
      borderRadius: 15,
      backgroundColor: '#8091AF',
      justifyContent: 'center',
      marginTop: 20,
      marginHorizontal: 125
  
    },
    text: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center'
    }
  
  }); 
  
  