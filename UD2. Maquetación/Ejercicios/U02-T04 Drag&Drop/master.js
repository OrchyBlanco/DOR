function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
      ev.target.style.border="solid green";
}
function dragend(ev) {
    ev.target.style.border="none";
}

function drop(ev) {
    ev.preventDefault();
    var datos = ev.dataTransfer.getData("Text");

    var clasediv = ev.target.id;

    if (clasediv == "NuevaRes" && datos > 7) {
        ev.target.appendChild(document.getElementById(datos));
        document.getElementsByClassName(ev.target.className).style.height = "auto";
          document.getElementsByClassName(ev.target.className).style.border = "solid gray";
        return false;
    }
    if (clasediv == "DesapareceRes" && datos <= 7) {
        ev.target.appendChild(document.getElementById(datos));
        document.getElementsByClassName(ev.target.className).style.height = "auto";
  document.getElementsByClassName(ev.target.className).style.border = "solid gray";
        return false;
    }

}

function dragover(ev) {
    ev.preventDefault();
    var datos = ev.dataTransfer.getData("Text");
    var clasediv = ev.target.id;
    if (clasediv == "NuevaRes") {
        if (datos > 7) {
            ev.target.style.border = "solid green";
        } else {
            ev.target.style.border = "solid red";
        }
        return false;
    }
    if (clasediv == "DesapareceRes") {
        if (datos <= 7) {
            ev.target.style.border = "solid green";
        } else {
            ev.target.style.border = "solid red";
        }
        return false;
    }

}

function dragleave(ev) {
    ev.preventDefault();
    ev.target.style.border="solid gray";
}
