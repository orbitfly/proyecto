import t from 'tcomb-form-native';

export default formValidation = {
    //tipo dato y el valor que llega desde el formulario
    email: t.refinement(t.String, (s) => {
        //ejecutar validación en la que el texto que se le pase tiene que contener un @
        return /@/.test(s);
    }),
    password: t.refinement(t.String, (s) => {
        //longitud >= 6
        return s.length >= 6;
    })
}