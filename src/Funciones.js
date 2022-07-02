var datos = {
    'estado':true,
    'dato':'',
    'message':''
}
class App{
    static validarEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email) ? true : false;
    }
    static validadPass(pass, pass2) {
        if (pass.length >= 10 && pass2.length >= 10) {
          if (pass == pass2) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
    }
    static checkUser(email,password){
        console.log(password);
        if(email!=""){
            if(password!=""){
                var valido = App.validarEmail(email);
                if(valido!=true){
                    datos.estado=false;
                    datos.dato='email';
                    datos.message = 'Ingresa una dirección de correo valida.';
                    return datos;
                }else{
                    return datos;
                }
            }else{
                datos.estado=false;
                datos.dato='password';
                datos.message = 'Debes ingresar una contraseña.';
                return datos;
            }
        }else{
            datos.estado=false;
            datos.dato='email';
            datos.message = 'El campo de correo no puede estar vacío.';
            return datos;
        }
    }
    static newUser(email,name,pass,pass2){
        if(email!=""){
            let e = App.validarEmail(email);
            if(e!=false){
                if(name!=""){
                    if(pass!=""){
                        if(pass2!=""){
                            let p = App.validadPass(pass,pass2);
                            if(p!=false){
                                return datos;
                            }else{
                                console.log(pass+' '+pass2);
                                datos.dato='Verifique su contraseña';
                                datos.estado=false;
                                datos.message='Sus contraseñas no coincicen o no tienen más de 10 caracteres.'
                                return datos;
                            }
                        }else{
                            datos.dato='Contraseña';
                            datos.estado=false;
                            datos.message='Debe verificar su contraseña.';
                            return datos;
                        }
                    }else{
                        datos.dato='Contraseña';
                        datos.estado=false;
                        datos.message='Su contraseña no puede estar vacía.';
                        return datos;
                    }
                }else{
                    datos.dato='Atención';
                    datos.estado=false;
                    datos.message='Debe ingresar un nombre de usuario.';
                    return datos;
                }
            }else{
                datos.dato='Atención';
                datos.estado=false;
                datos.message='Ingrese una dirección de correo valida.';
                return datos;
            }
        }else{
            datos.dato='Atención';
            datos.estado=false;
            datos.message='Su correo no puede estar vacío.';
            return datos;
        }
    }
}
export default{
    App
}