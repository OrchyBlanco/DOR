var canvas = document.getElementById("zonajuego");
var ctx = canvas.getContext("2d");
var rnd = function() {
    return Math.floor((Math.random() * canvas.width - 10));
};
var usarDisparo=false;

var Elemento = function(posX, posY) {
    this.posX = 0;
    this.posY = 0;
    this.velX = 10;
    this.velY = 1;
    this.ancho = 10;
    this.alto = 10;
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
    setPosition: function(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    },
    getPosition:function () {
      posicion=[this.posX,this.posY];
      return posicion;
    }
};

var Marciano = function() {
    Elemento.call(this);
    this.posX=rnd();
    this.velY =0.5;
};
Marciano.prototype = new Elemento();
Marciano.prototype.moverAbajo = function() {
    this.posY += this.velY;
    if (this.posY > canvas.height) {
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
    this.velY=2;
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
Disparo.prototype.disparar = function(objNave) {
    this.moverArriba();
    if (this.enVuelo === false) {
        this.setPosition(objNave.posX + 7, objNave.posY-7);
        usarDisparo=false;
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
Disparo.prototype.colision=function (objMarciano) {
    if (objMarciano.getPosition()==this.getPosition()) {
        window.alert("¡¡Has salvado el mundo!!");
    }
};
/////////////////////---/////////////////////
var m = new Marciano();
var n = new Nave();
var d = new Disparo(n.posX, n.posY);

window.addEventListener("keypress", function(e) {
    controles(e);
});

function controles(e) {
    var x = e.which || e.keyCode;

    switch (x) {
        case 37:
            n.moverIzquierda();
            d.moverIzquierda();
            break;
        case 38:

            usarDisparo=true;
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
    m.dibujar();
    d.dibujar();
    n.dibujar();
    if (usarDisparo===true) {
      d.disparar(n);

    }
    d.colision(m);
    m.moverAbajo();


    requestAnimationFrame(jugar);
}
requestAnimationFrame(jugar);
