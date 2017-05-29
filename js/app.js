$(document).ready(function () {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});

/*
var tituloTexto = document.getElementById("titulo-texto");
var contenidoTexto = document.getElementById("texto-contenido");

function publicar() {
    if (tituloTexto.value !== "") {
        var seccionPublicaciones = document.getElementById("publicaciones");

        // elementos que componen mi publicación
        var tarjetaPublicacion = document.createElement("div");
        var titulo = document.createElement("h3");
        var contenido = document.createElement("p");

        titulo.innerText = tituloTexto.value;
        contenido.innerText = contenidoTexto.value;

        tarjetaPublicacion.appendChild(titulo);
        tarjetaPublicacion.appendChild(contenido);

        seccionPublicaciones.insertBefore(tarjetaPublicacion, seccionPublicaciones.firstChild);
    }
}


*/
