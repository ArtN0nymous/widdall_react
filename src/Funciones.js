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
}
export default{
    App
}