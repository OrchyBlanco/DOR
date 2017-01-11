//Crea una cookie recibiendo como parametros: nombre de la cookie, valor de la cookie, los minutos para que expire la cookie.
function setCookie(nombre, valor, minutos) {
    var fechaExpCookie = new Date();
    fechaExpCookie.setTime(fechaExpCookie.getTime() + (minutos * 60 * 1000));
    var expira = "expires=" + fechaExpCookie.toUTCString();
    document.cookie = nombre + "=" + valor + ";" + expira + ";path=/";
    //Escribe una cookie como :  nombre=valor;expires=fecha;path=/
}

function getCookie(nombreCookie) {
    var index = document.cookie.indexOf(nombreCookie + "=");
    if (index == -1) {
        return null;
    } else {
        index = document.cookie.indexOf("=", index) + 1;
        var endstr = document.cookie.indexOf(";", index);
        if (endstr == -1)
            endstr = document.cookie.length;
        return decodeURIComponent(document.cookie.substring(index, endstr));
    }

}
