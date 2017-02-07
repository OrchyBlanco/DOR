
$(".butaca").click(function () {
  if ($(this).hasClass("reservado")) {
    $( this ).addClass( "libre" );
    $( this ).removeClass( "reservado" );
  }else if ($(this).hasClass("libre")) {
    $( this ).addClass( "reservado" );
    $( this ).removeClass( "libre" );
  }
});

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#F7931E";

ctx.fillRect(0,0,150,150);
ctx.fillStyle = "#FFF";
ctx.fillRect(40,50,70,50);
