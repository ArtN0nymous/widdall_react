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
    static return_status(){

    }
}
class Firebase{
    static async loginIn(){
        await auth.signInWithEmailAndPassword(email,password)
        .then((result)=>{
            datos.dato=result.user.email;
        })
        .catch((error)=>{
            switch(error.code){
                case 'auth/user-not-found':
                    datos.dato=error.code;
                    datos.estado=false,
                    datos.message='Parece que este usuario no existe!.';
                    break;
            }
        });
        return datos;
    }
}
export default{
    App,
    Firebase
}