var canvas = document.getElementById("zonajuego");
var ctx = canvas.getContext("2d");
var rnd = function() {
    return Math.floor((Math.random() * canvas.width - 10));
};
var usarDisparo = false;

var Elemento = function(posX, posY) {
    this.posX = 0;
    this.posY = 0;
    this.velX = 10;
    this.velY = 1;
    this.ancho = 20;
    this.alto = 20;
    this.color = "#0F0";
};
Elemento.prototype = {
    dibujar: function() {
        ctx.beginPath();
        ctx.rect(this.posX, this.posY, this.ancho, this.alto); //parametros: ejeX,ejeY,Ancho,Alto
        ctx.fillStyle = this.color;
        ctx.fill();
    },
    moverDerecha: function() {
        this.posX += this.velX;
        if (this.posX > canvas.width - this.ancho) {
            this.posX = canvas.width - this.ancho;
        }
    },
    moverIzquierda: function() {
        this.posX -= this.velX;
        if (this.posX < 0) {
            this.posX = 0;
        }
    },
    colision: function(otro) {
        if (this.posX + this.ancho < otro.posX) {
            return false;
        }
        if (this.posY + this.alto < otro.posY) {
            return false;
        }
        if (this.posX > otro.posX + otro.ancho) {
            return false;
        }
        if (this.posY > otro.posY + otro.alto) {
            return false;
        }
        return true;
    },
    setPosition: function(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    },
    getPosition: function() {
        posicion = [this.posX, this.posY];
        return posicion;
    }
};
var Marciano = function() {
    Elemento.call(this);
    this.posX = rnd();
    this.velY = 0.6;
    this.vivo = true;
};
Marciano.prototype = new Elemento();
Marciano.prototype.moverAbajo = function() {
    this.posY += this.velY;
    if (this.posY > canvas.height) {

        window.alert("Los marcianos han llegado, ¡¡has perdido!!");
        this.setPosition(rnd(), 0);
    }
};

var Nave = function() {
    Elemento.call(this);
    this.posX = 5;
    this.posY = 285;
    this.ancho = 20;
    this.color = "#F00";
};
Nave.prototype = new Elemento();
Nave.prototype.dibujar = function() {
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, 20, 10); //nave
    ctx.rect(this.posX + 7, this.posY - 10, 5, 10); //cañon
    ctx.fillStyle = this.color;
    ctx.fill();
};

var Disparo = function(posNaveX, posNaveY) {
    Elemento.call(this);
    this.enVuelo = false;

    this.posX = posNaveX + 7;
    this.posY = posNaveY;
    this.velY = 3;
};
Disparo.prototype = new Elemento();
Disparo.prototype.dibujar = function() {
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, 5, 7); //cañon
    ctx.fillStyle = "#FF0";
    ctx.fill();
};
Disparo.prototype.moverArriba = function() {
    this.posY -= this.velY;
    this.enVuelo = true;
    if (this.posY < 0) {
        this.setPosition(this.posX, this.posY);
        this.enVuelo = false;
    }
};
Disparo.prototype.disparar = function(objNave, objMarciano) {
    this.moverArriba();
    this.colision(objMarciano);
    if (this.enVuelo === false) {
        this.setPosition(objNave.posX + 7, objNave.posY - 7);
        usarDisparo = false;
    }
};
Disparo.prototype.moverDerecha = function() {
    if (this.enVuelo === false) {
        this.posX += this.velX;
        if (this.posX > canvas.width - this.ancho) {
            this.posX = canvas.width - this.ancho;
        }
    }

};
Disparo.prototype.moverIzquierda = function() {
    if (this.enVuelo === false) {
        this.posX -= this.velX;
        if (this.posX < 0) {
            this.posX = 0;
        }
    }
};

/////////////////////---/////////////////////
var m = new Marciano();
var n = new Nave();
var d = new Disparo(n.posX, n.posY);

window.addEventListener("keypress", function(e) {
    controles(e);
});
document.getElementById('flechaIzquierda').addEventListener("mousedown", function() {
    n.moverIzquierda();
    d.moverIzquierda();
});
document.getElementById('flechaArriba').addEventListener("mousedown", function() {
    usarDisparo = true;
});
document.getElementById('flechaDerecha').addEventListener("mousedown", function() {
    n.moverDerecha();
    d.moverDerecha();
});

function controles(e) {
    var x = e.which || e.keyCode;
    switch (x) {
        case 37:
            n.moverIzquierda();
            d.moverIzquierda();
            break;
        case 38:

            usarDisparo = true;
            break;

        case 39:
            n.moverDerecha();
            d.moverDerecha();
            break;
        default:
    }
}

function jugar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (m !== null) {
        d.dibujar();
        n.dibujar();
        m.dibujar();
        m.moverAbajo();
        if (d.colision(m) && d.enVuelo === true) {
            m = new Marciano();
            d = new Disparo(0, 0);
            window.alert("¡¡Has salvado el mundo!!");
        }
    }
    if (usarDisparo === true) {
        d.disparar(n, m);
    }
    requestAnimationFrame(jugar);
}
requestAnimationFrame(jugar);
